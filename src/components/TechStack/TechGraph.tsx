import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// UI/UX Pro Max recommended easing + reduced motion support
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Tech Graph Component (Canvas Hexagons — v2)
export const TechGraph = () => {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const tipRef     = useRef<HTMLDivElement>(null);
  const tipLblRef  = useRef<HTMLDivElement>(null);
  const tipBarRef  = useRef<HTMLDivElement>(null);
  const tipPctRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const tip    = tipRef.current!;
    const tipLbl = tipLblRef.current!;
    const tipBar = tipBarRef.current!;
    const tipPct = tipPctRef.current!;
    const DPR = window.devicePixelRatio || 1;

    // Synchronized with Gara Yaka theme (Crimson & Gold)
    const CAT: Record<string, { color: string; track: string }> = {
      frontend: { color: '#E8A820', track: 'rgba(232,168,32,0.15)' }, // Gold
      backend:  { color: '#C41E3A', track: 'rgba(196,30,58,0.15)'  }, // Crimson
      infra:    { color: '#8E1E3A', track: 'rgba(142,30,58,0.15)'  }, // Deep Crimson
      data:     { color: '#B8860B', track: 'rgba(184,134,11,0.15)' }, // Dark Gold
    };

    const NODES = [
      { id:0,  label:'TypeScript', cat:'frontend', pct:92 },
      { id:1,  label:'React',      cat:'frontend', pct:88 },
      { id:2,  label:'Next.js',    cat:'frontend', pct:80 },
      { id:3,  label:'Node.js',    cat:'backend',  pct:85 },
      { id:4,  label:'GraphQL',    cat:'backend',  pct:72 },
      { id:5,  label:'Python',     cat:'backend',  pct:78 },
      { id:6,  label:'AWS',        cat:'infra',    pct:82 },
      { id:7,  label:'Docker',     cat:'infra',    pct:80 },
      { id:8,  label:'Kubernetes', cat:'infra',    pct:70 },
      { id:9,  label:'PostgreSQL', cat:'data',     pct:75 },
      { id:10, label:'Redis',      cat:'data',     pct:68 },
      { id:11, label:'MongoDB',    cat:'data',     pct:65 },
    ];

    const EDGES = [
      [0,1],[0,2],[0,3],[1,2],[1,3],[1,4],
      [3,4],[3,5],[3,6],[3,9],[4,9],[4,10],
      [5,9],[5,10],[6,7],[6,8],[6,9],
      [7,8],[9,10],[9,11],[10,11],
    ];

    let W=0, H=0, S=0, hov: number|null=null, pos: {x:number,y:number}[]=[];

    function corner(cx:number, cy:number, sz:number, i:number) {
      const a = Math.PI/180*(60*i-30);
      return [cx+sz*Math.cos(a), cy+sz*Math.sin(a)];
    }

    function layout() {
      const rows=[2,3,4,3], gap=14, maxCols=4;
      S = Math.min(
        W / (maxCols*Math.sqrt(3) + (maxCols+1)*0.4 + 2),
        H / (rows.length*1.6+1)
      ) * 1.15; // Increased scale factor
      const hw=S*Math.sqrt(3), vstep=S*1.65, rowGap = 20; // Increased vertical step and gap
      const totalH=vstep*(rows.length-1)+S*2;
      const y0=(H-totalH)/2+S;
      pos=[];
      rows.forEach((cnt,r)=>{
        const rowW=cnt*hw+(cnt-1)*rowGap;
        const x0=(W-rowW)/2+hw/2;
        const y=y0+r*vstep;
        for(let c=0;c<cnt;c++) pos.push({x:x0+c*(hw+rowGap),y});
      });
    }

    function hexPath(cx:number, cy:number, sz:number) {
      ctx.beginPath();
      for(let i=0;i<6;i++){
        const [px,py]=corner(cx,cy,sz,i);
        if(i===0){ctx.moveTo(px,py);}else{ctx.lineTo(px,py);}
      }
      ctx.closePath();
    }

    function getConn(id:number){
      const nbrs=new Set<number>(), eids=new Set<number>();
      EDGES.forEach((e,i)=>{
        if(e[0]===id||e[1]===id){nbrs.add(e[0]);nbrs.add(e[1]);eids.add(i);}
      });
      return {nbrs,eids};
    }

    // ─── Smooth animation state ───────────────────────────────────────────────
    // edgeT[i]: lerp progress 0→1 for edge i being "active" (glowing)
    // nodeAlpha[i]: current alpha for each node (for dim effect)
    const edgeT     = new Float32Array(EDGES.length).fill(0);
    const nodeAlpha = new Float32Array(NODES.length).fill(1);
    let rafId = 0;
    const SPEED = 0.09; // lerp step per frame (~60fps → ~150ms transition)

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const anyHov = hov !== null;
      const {nbrs, eids} = anyHov ? getConn(hov!) : {nbrs: new Set<number>(), eids: new Set<number>()};

      // ── Update animated values & check if still animating ──
      let needsRaf = false;
      EDGES.forEach((_, i) => {
        const target = (!anyHov || eids.has(i)) ? (anyHov ? 1 : 0) : 0;
        const delta  = target - edgeT[i];
        if (Math.abs(delta) > 0.005) { edgeT[i] += delta * SPEED * 3.5; needsRaf = true; }
        else edgeT[i] = target;
      });
      NODES.forEach((n, i) => {
        const isHov = n.id === hov;
        const target = anyHov && !nbrs.has(n.id) && !isHov ? 0.15 : 1;
        const delta  = target - nodeAlpha[i];
        if (Math.abs(delta) > 0.005) { nodeAlpha[i] += delta * SPEED * 3; needsRaf = true; }
        else nodeAlpha[i] = target;
      });

      // ── Draw edges ──
      EDGES.forEach((e, i) => {
        const a = pos[e[0]], b = pos[e[1]];
        if (!a || !b) return;
        const t = edgeT[i]; // 0 = idle, 1 = active
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        if (!anyHov || t < 0.01) {
          ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - t)})`; ctx.lineWidth = 1;
        } else {
          // Gradient edge that fades in as t grows
          const ca = CAT[NODES[e[0]].cat].color, cb = CAT[NODES[e[1]].cat].color;
          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          const alpha = Math.round(t * 0xBB).toString(16).padStart(2, '0');
          g.addColorStop(0, ca + alpha); g.addColorStop(1, cb + alpha);
          ctx.strokeStyle = g; ctx.lineWidth = 1 + t * 0.5;
        }
        ctx.stroke();
      });

      // ── Draw nodes ──
      NODES.forEach((n, i) => {
        const p = pos[i]; if (!p) return;
        const cat    = CAT[n.cat];
        const isHov  = n.id === hov;
        const isNbr  = anyHov && nbrs.has(n.id) && !isHov;
        const alpha  = nodeAlpha[i];
        const inner  = S * 0.74;
        // arc progress for this node — also animated
        const arcT   = isHov ? 1 : isNbr ? 0.7 : 0;

        ctx.save(); ctx.globalAlpha = alpha;

        hexPath(p.x, p.y, inner);
        ctx.fillStyle = '#161924'; ctx.fill();
        ctx.strokeStyle = isHov ? cat.color : isNbr ? cat.color + '77' : '#2a2e40';
        ctx.lineWidth = isHov ? 1.5 : isNbr ? 1 : 0.8; ctx.stroke();

        if (arcT > 0.01) {
          const arcR = inner * 0.55, pct = n.pct / 100;
          // track ring
          ctx.beginPath();
          ctx.arc(p.x, p.y, arcR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2);
          ctx.strokeStyle = cat.color + '22'; ctx.lineWidth = 2.5; ctx.lineCap = 'butt'; ctx.stroke();
          // active fill
          ctx.beginPath();
          ctx.arc(p.x, p.y, arcR, -Math.PI / 2, -Math.PI / 2 + pct * Math.PI * 2 * arcT);
          ctx.strokeStyle = cat.color + (isHov ? 'FF' : '99');
          ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.stroke();
        }

        const fs = Math.max(10, Math.round(inner * 0.2));
        ctx.font = `${isHov ? '500' : '400'} ${fs}px Inter,system-ui,sans-serif`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillStyle = isHov ? cat.color : isNbr ? '#c9cdd8' : '#4b5263';
        ctx.fillText(n.label.length > 9 ? n.label.slice(0, 9) : n.label, p.x, p.y);
        ctx.restore();
      });

      if (needsRaf) rafId = requestAnimationFrame(draw);
    }

    function scheduleRaf() { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(draw); }

    function hit(mx: number, my: number) {
      for (let i = 0; i < pos.length; i++) {
        const p = pos[i]; if (!p) continue;
        const dx = mx - p.x, dy = my - p.y;
        if (Math.sqrt(dx * dx + dy * dy) < S * 0.74) return i;
      }
      return -1;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const idx = hit(mx, my);
      hov = idx >= 0 ? idx : null;
      canvas.style.cursor = idx >= 0 ? 'pointer' : 'default';
      if (idx >= 0) {
        const n = NODES[idx], cat = CAT[n.cat];
        tipLbl.textContent = n.label;
        tipBar.style.width = n.pct + '%';
        tipBar.style.background = cat.color;
        tipPct.textContent = n.pct + '% proficiency';
        const wr = wrap.getBoundingClientRect();
        let tx = e.clientX - wr.left + 16; const ty = e.clientY - wr.top - 70;
        if (tx + 160 > W) tx = e.clientX - wr.left - 170;
        tip.style.left = Math.max(0, tx) + 'px';
        tip.style.top = Math.max(ty, 8) + 'px';
        tip.style.opacity = '1';
      } else {
        tip.style.opacity = '0';
      }
      scheduleRaf();
    };

    const handleMouseLeave = () => { hov = null; tip.style.opacity = '0'; scheduleRaf(); };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    function resize() {
      W = wrap.clientWidth;
      H = Math.round(W * 0.56);
      canvas.width = W * DPR; canvas.height = H * DPR;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      layout(); scheduleRaf();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap); resize();

    if (!prefersReducedMotion()) {
      gsap.from(canvas, {
        opacity: 0, y: 20, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: wrap, start: 'top 80%', once: true }
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <canvas ref={canvasRef} className="block w-full" />

      {/* Tooltip */}
      <div
        ref={tipRef}
        className="absolute pointer-events-none opacity-0 bg-[#1a1d27] border border-[#2e3244] rounded-md px-3.5 py-2.5 min-w-[140px] z-10"
        style={{ transition: 'opacity 0.12s' }}
      >
        <div ref={tipLblRef} className="text-[13px] font-medium text-[#e8eaf0] mb-1.5" />
        <div className="h-[3px] bg-[#252836] rounded-sm overflow-hidden">
          <div ref={tipBarRef} className="h-full rounded-sm" style={{ width: 0, transition: 'width 0.2s' }} />
        </div>
        <div ref={tipPctRef} className="text-[11px] text-[#6b7280] mt-1.5" />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-5 mt-5 flex-wrap">
        {[
          { color:'#E8A820', label:'Frontend'       },
          { color:'#C41E3A', label:'Backend'         },
          { color:'#8E1E3A', label:'Infrastructure'  },
          { color:'#B8860B', label:'Data'            },
        ].map(l=>(
          <div key={l.label} className="flex items-center gap-1.5 text-[11px] text-[#6b7280] font-sans tracking-[0.02em]">
            <div className="w-1.5 h-1.5 rounded-full" style={{background:l.color}} />
            <span>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
