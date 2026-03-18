import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useQuery } from '@tanstack/react-query';
import aftermathImg from '@/assets/aftermath.png';

const GITHUB_USERNAME = 'GayanKavinda';

// Types for GitHub API
interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
  contributionLevel: string;
}

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: { message: string }[];
    action?: string;
  };
}

interface GithubStats {
  totalContributions: number;
  public_repos: number;
  languages: { name: string; pct: number }[];
  heatmap: ContributionDay[][];
  longestStreak: number;
  currentStreak: number;
  events: { id: string; type: string; repo: string; time: string; message: string; url: string }[];
}

const fetchGithubData = async (): Promise<GithubStats> => {
  const [userRes, reposRes, contributionsRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=15`)
  ]);

  const userData = await userRes.json();
  const reposData = await reposRes.json();
  const contributionsData = await contributionsRes.json();
  const eventsData = await eventsRes.json();

  // Process languages
  const langMap: Record<string, number> = {};
  reposData.forEach((repo: { language: string | null }) => {
    if (repo.language) {
      langMap[repo.language] = (langMap[repo.language] || 0) + 1;
    }
  });
  const totalReposWithLang = Object.values(langMap).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langMap)
    .map(([name, count]) => ({
      name,
      pct: Math.round((count / totalReposWithLang) * 100)
    }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);

  // Process heatmap and streaks
  const heatmap: ContributionDay[][] = contributionsData.contributions;

  const allDays = contributionsData.contributions.flat();
  let longestStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;

  allDays.forEach((day: ContributionDay) => {
    if (day.contributionCount > 0) {
      tempStreak++;
    } else {
      if (tempStreak > longestStreak) longestStreak = tempStreak;
      tempStreak = 0;
    }
  });
  if (tempStreak > longestStreak) longestStreak = tempStreak;

  const today = new Date().toISOString().split('T')[0];
  const pastDays = allDays.filter((d: ContributionDay) => d.date <= today).reverse();
  for (const day of pastDays) {
    if (day.contributionCount > 0) {
      currentStreak++;
    } else if (day.date !== today) {
      break;
    }
  }

  // Process events
  const events = (eventsData as any[])
    .filter((e) => ['PushEvent', 'CreateEvent', 'WatchEvent', 'ForkEvent', 'IssuesEvent'].includes(e.type))
    .map((e) => {
      let message = '';
      let url = `https://github.com/${e.repo.name}`;
      
      if (e.type === 'PushEvent') {
        const commitMsg = e.payload.commits?.[0]?.message || 'Pushed commits';
        message = commitMsg.length > 45 ? commitMsg.substring(0, 42) + '...' : commitMsg;
        if (e.payload.commits?.[0]?.sha) url = `${url}/commit/${e.payload.commits[0].sha}`;
      } else if (e.type === 'CreateEvent') {
        message = `Created ${e.payload.ref_type || 'repository'}`;
      } else if (e.type === 'WatchEvent') {
        message = `Starred repository`;
      } else if (e.type === 'ForkEvent') {
        message = `Forked repository`;
      } else if (e.type === 'IssuesEvent') {
        message = `${e.payload.action ? e.payload.action.charAt(0).toUpperCase() + e.payload.action.slice(1) : 'Updated'} issue`;
      }

      return {
        id: e.id,
        type: e.type,
        repo: e.repo.name.replace(`${GITHUB_USERNAME}/`, ''),
        time: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        message,
        url
      };
    })
    .slice(0, 6);

  return {
    totalContributions: contributionsData.totalContributions,
    public_repos: userData.public_repos,
    languages,
    heatmap,
    longestStreak,
    currentStreak,
    events
  };
};

const getColor = (n: number) => {
  if (n === 0) return 'rgba(255,255,255,0.06)';
  if (n <= 3) return 'rgba(192,39,45,0.4)';
  if (n <= 8) return 'rgba(212,175,55,0.7)';
  if (n <= 15) return 'rgba(192,39,45,0.85)';
  return 'rgba(212,175,55,1)';
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Mon', '', 'Wed', '', 'Fri', '', ''];

const CodeCadence = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const heatmapRef = useRef<SVGSVGElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; title: string; subtitle: string } | null>(null);

  const { data: githubStats, isLoading, error } = useQuery({
    queryKey: ['githubStats'],
    queryFn: fetchGithubData,
    staleTime: 1000 * 60 * 15, // 15 mins
  });

  useEffect(() => {
    if (isLoading || !githubStats) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current!, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.from(sectionRef.current!, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current!,
          start: 'top 80%'
        }
      });

      gsap.from('.heatmap-col-group', {
        opacity: 0,
        stagger: 0.012,
        duration: 0.5,
        scrollTrigger: {
          trigger: heatmapRef.current!,
          start: 'top 82%',
          once: true
        }
      });

      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statsRef.current!,
          start: 'top 85%',
          once: true
        }
      });

      gsap.from('.lang-bar-fill', {
        width: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.lang-bars',
          start: 'top 85%',
          once: true
        }
      });

      gsap.from('.activity-item', {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.activity-feed',
          start: 'top 85%',
          once: true
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoading, githubStats]);

  const cellSize = 11;
  const gap = 3;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const monthLabels = useMemo(() => {
    if (!githubStats?.heatmap) return [];
    const labels: { col: number; label: string }[] = [];
    let prevMonth = -1;

    githubStats.heatmap.forEach((week, i) => {
      const firstDay = new Date(week[0].date);
      const month = firstDay.getMonth();
      if (month !== prevMonth) {
        labels.push({ col: i, label: months[month] });
        prevMonth = month;
      }
    });
    return labels;
  }, [githubStats?.heatmap]);

  if (error) return null;

  return (
    <section
      ref={sectionRef}
      className="py-[100px] relative overflow-hidden"
    >
      <img
        ref={bgRef}
        src={aftermathImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none z-0"
      />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(10,10,10,0.93)' }} />

      <div className="relative z-[2] max-w-[1100px] mx-auto px-10">
        <div className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">// Real-time Activity</p>
          <h2 className="font-playfair text-[48px] text-bone mt-2">Code Cadence</h2>
          <div className="w-[60px] h-[2px] bg-crimson mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-[1fr_240px] gap-[60px] mt-14 max-lg:grid-cols-1">
          <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
            <div className="flex justify-between items-center mb-3">
              <span className="font-mono text-[11px]" style={{ color: 'rgba(245,240,232,0.35)' }}>
                Past 12 months
              </span>
              <span className="font-mono text-[11px] text-gold">
                {githubStats?.totalContributions.toLocaleString()} contributions
              </span>
            </div>

            <div className="relative">
              <svg
                ref={heatmapRef}
                width="100%"
                viewBox={`0 0 ${(githubStats?.heatmap.length || 53) * (cellSize + gap) + 40} ${7 * (cellSize + gap) + 30}`}
              >
                {monthLabels.map((m, i) => (
                  <text
                    key={`${m.label}-${i}`}
                    x={40 + m.col * (cellSize + gap)}
                    y={10}
                    fill="rgba(245,240,232,0.35)"
                    fontSize="9"
                    fontFamily='"DM Mono", monospace'
                  >
                    {m.label}
                  </text>
                ))}
                {['Mon', 'Wed', 'Fri'].map((d, i) => (
                  <text
                    key={d}
                    x={0}
                    y={20 + (i * 2 + 1) * (cellSize + gap) + cellSize / 2 + 3}
                    fill="rgba(245,240,232,0.35)"
                    fontSize="9"
                    fontFamily='"DM Mono", monospace'
                  >
                    {d}
                  </text>
                ))}
                {githubStats?.heatmap.map((week, col) => (
                  <g key={col} className="heatmap-col-group">
                    {week.map((day, row) => (
                      <rect
                        key={`${col}-${row}`}
                        x={40 + col * (cellSize + gap)}
                        y={20 + row * (cellSize + gap)}
                        width={cellSize}
                        height={cellSize}
                        rx={1.5}
                        fill={getColor(day.contributionCount)}
                        className="cursor-pointer transition-all duration-200 hover:stroke-gold/50 hover:stroke-2"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({ 
                            x: rect.left + cellSize/2, 
                            y: rect.top - 10, 
                            title: `${day.contributionCount} contributions`,
                            subtitle: formatDate(day.date)
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    ))}
                  </g>
                ))}
              </svg>
              {tooltip && (
                <div
                  className="fixed translate-x-[-50%] translate-y-[-100%] mb-4 rounded-[6px] border border-white/[0.1] px-3 py-2 font-mono text-[11px] z-50 pointer-events-none flex flex-col items-center gap-0.5"
                  style={{ left: tooltip.x, top: tooltip.y, background: '#1A1A1A', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }}
                >
                  <span className="text-bone whitespace-nowrap">{tooltip.title}</span>
                  <span className="text-bone/40 text-[9px] uppercase tracking-tighter">{tooltip.subtitle}</span>
                  <div className="absolute bottom-[-5px] left-1/2 translate-x-[-50%] w-2 h-2 rotate-45 border-r border-b border-white/[0.1]" style={{ background: '#1A1A1A' }} />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-[40px] mt-10 max-md:grid-cols-1">
              <div ref={statsRef} className="grid grid-cols-3 gap-3">
                {[
                  { num: githubStats?.totalContributions.toLocaleString() || '0', label: 'COMMITS' },
                  { num: githubStats?.public_repos.toString() || '0', label: 'REPOS' },
                  { num: `${githubStats?.longestStreak || 0}d`, label: 'STREAK' }
                ].map((s) => (
                  <div
                    key={s.label}
                    className="stat-card rounded-[8px] border border-white/[0.07] p-3 text-center"
                    style={{ background: '#111' }}
                  >
                    <p className="font-playfair text-[24px] text-gold">{s.num}</p>
                    <p className="font-mono text-[9px] uppercase tracking-wider mt-1" style={{ color: 'rgba(245,240,232,0.4)' }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="activity-feed">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/30 mb-4 ml-1">
                  // Recent Activity
                </p>
                <div className="space-y-4">
                  {githubStats?.events.map((e) => (
                    <a 
                      key={e.id} 
                      href={e.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="activity-item flex items-start gap-4 group cursor-pointer"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-crimson mt-1.5 shrink-0 shadow-[0_0_8px_rgba(192,39,45,0.6)] group-hover:scale-125 transition-transform" />
                      <div>
                        <p className="font-sans text-[13px] text-bone/80 group-hover:text-bone transition-colors leading-tight">
                          {e.message} <span className="text-crimson/80 group-hover:text-crimson">in</span> <span className="text-bone font-mono text-[12px] group-hover:text-gold">{e.repo}</span>
                        </p>
                        <p className="font-mono text-[10px] text-bone/30 mt-1">{e.time}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 max-lg:w-full max-lg:mt-8 border-l border-white/[0.06] pl-10 max-lg:border-l-0 max-lg:pl-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold mb-8">
              // Languages
            </p>

            <div className="lang-bars">
              {githubStats?.languages.map((l) => (
                <div key={l.name} className="mb-6">
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[13px] text-bone">{l.name}</span>
                    <span className="font-mono text-[11px] text-gold opacity-60">{l.pct}%</span>
                  </div>
                  <div
                    className="mt-2.5 h-[3px] rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    <div
                      className="lang-bar-fill h-full rounded-full bg-crimson shadow-[0_0_10px_rgba(192,39,45,0.3)]"
                      style={{ width: `${l.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.06] mt-10 pt-8">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 font-mono text-[12px] text-crimson hover:text-gold transition-colors duration-300"
              >
                <span>View Full Profile</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeCadence;