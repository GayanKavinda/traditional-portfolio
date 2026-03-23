//src/pages/AllProjects.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const allProjects = [
  { name: 'Distributed Task Engine', desc: 'High-throughput task orchestration', tags: ['Go', 'Kafka', 'Redis'], cat: 'Web' },
  { name: 'Real-time Analytics', desc: 'WebSocket-driven dashboard', tags: ['React', 'D3.js', 'Node.js'], cat: 'Web' },
  { name: 'AuthShield SDK', desc: 'Zero-trust authentication SDK', tags: ['TypeScript', 'OAuth'], cat: 'Open Source' },
  { name: 'DataPipe', desc: 'Real-time ETL pipeline', tags: ['Python', 'Kafka'], cat: 'Web' },
  { name: 'CloudDash', desc: 'Infrastructure monitoring', tags: ['React', 'AWS'], cat: 'Web' },
  { name: 'APIForge', desc: 'API gateway framework', tags: ['Go', 'gRPC'], cat: 'Open Source' },
  { name: 'MobileTrack', desc: 'GPS tracking app', tags: ['React Native', 'Firebase'], cat: 'Mobile' },
  { name: 'ChatScale', desc: 'Scalable chat infrastructure', tags: ['Node.js', 'WebSocket'], cat: 'Web' },
  { name: 'DevMetrics', desc: 'Developer productivity tool', tags: ['TypeScript', 'PostgreSQL'], cat: 'Open Source' },
];

const tabs = ['All', 'Web', 'Mobile', 'Open Source'];

const AllProjects = () => {
  const [active, setActive] = useState('All');
  const navigate = useNavigate();
  const filtered = active === 'All' ? allProjects : allProjects.filter(p => p.cat === active);

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      <Navbar />
      <div className="pt-28 pb-20 max-w-[1200px] mx-auto px-10">
        <button onClick={() => navigate('/')} className="font-mono text-[12px] text-bone/40 hover:text-gold transition-colors mb-8">← Back to Home</button>
        <h1 className="font-playfair text-[48px] text-bone">All Projects</h1>

        <div className="flex gap-6 mt-8 border-b border-white/[0.06] pb-3">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`font-mono text-[12px] uppercase tracking-wider pb-2 transition-colors ${active === t ? 'text-crimson border-b-2 border-crimson' : 'text-bone/40 hover:text-bone/70'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-5 mt-10">
          {filtered.map(p => (
            <div key={p.name} className="rounded-xl border border-white/[0.07] overflow-hidden hover:border-crimson/40 hover:-translate-y-[3px] transition-all duration-300" style={{ background: '#111' }}>
              <div className="h-[160px] flex items-center justify-center" style={{ background: '#0D0D0D' }}>
                <span className="font-mono text-[12px] text-bone/20">[ Screenshot ]</span>
              </div>
              <div className="p-5">
                <h3 className="font-playfair text-[20px] text-bone">{p.name}</h3>
                <p className="font-sans text-[14px] text-bone/50 mt-1">{p.desc}</p>
                <div className="flex gap-[6px] mt-3 flex-wrap">
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-[11px] text-crimson border border-crimson/25 bg-crimson/[0.12] px-[10px] py-[3px] rounded-[3px]">{t}</span>
                  ))}
                </div>
                <div className="flex gap-4 mt-4">
                  <button className="font-mono text-[12px] text-crimson hover:underline">↗ Live</button>
                  <button className="font-mono text-[12px] text-bone/50 hover:text-gold">{'{ }'} Code</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProjects;
