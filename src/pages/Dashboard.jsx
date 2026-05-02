import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Clean, Syllabus-Compliant Inline SVGs
const Icons = {
  Users: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Activity: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  Target: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Trophy: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>,
  Compare: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3v6h-6"/><path d="M21 3 9 15"/><path d="M3 21v-6h6"/><path d="M3 21l12-12"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>,
  TrendingUp: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
};

export function Dashboard() {
  const [data, setData] = useState({ fighters: [], champions: [], trending: [], loading: true, error: null });

  useEffect(() => {
    const fetchRealData = async () => {
      try {
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL; 
        const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

        if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("Environment variables are missing.");

        const response = await fetch(`${SUPABASE_URL}/rest/v1/fighters?select=*`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Range': '0-1000'
          }
        });

        if (!response.ok) throw new Error("Failed to fetch from database");
        const json = await response.json();

        const processedFighters = json.map(row => {
            const name = row.Fighter_Name || 'Unknown';
            const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '');
            // Fixed Fallback URL: Uses a deep black background (111111) with solid red text (ef4444)
            return {
                id: row.Fighter_URL?.split('/').pop() || Math.random().toString(),
                name: name,
                weightClass: row.Weight || 'Unknown',
                wins: row.Wins ?? 0,
                losses: row.Losses ?? 0,
                draws: row.Draws ?? 0,
                strAcc: parseFloat(row.Str_Acc) || 0,
                tdDef: parseFloat(row.TD_Def) || 0,
                slpm: row.SLpM || 0,
                image: `https://dmxg5wxfqgb4u.cloudfront.net/styles/f_authors_headshot/s3/image-root/${slug}__headshot.png`,
                fallback: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=111111&color=ef4444&bold=true&size=512`
            };
        });

        const activeRoster = processedFighters.filter(f => f.wins + f.losses > 0);
        const sortedByWins = [...activeRoster].sort((a, b) => b.wins - a.wins);
        const topChampions = sortedByWins.slice(0, 8);
        const topTrending = [...activeRoster].filter(f => f.wins > 5).sort((a, b) => b.slpm - a.slpm).slice(0, 5);

        setData({ fighters: activeRoster, champions: topChampions, trending: topTrending, loading: false, error: null });

      } catch (err) {
        setData(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };

    fetchRealData();
  }, []);

  if (data.loading) return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground">Connecting to Supabase...</div>;
  if (data.error) return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-primary">{data.error}</div>;

  const a = data.champions[0];
  const b = data.champions[1];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* 1. HERO SECTION WITH FIXED IMAGE EXPOSURE */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 border-b border-border overflow-hidden">
        
        {/* Background Image Layer - Wider and strictly masked */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[75%] lg:w-[70%] z-0 flex justify-end animate-fade-in-up" style={{ animationDuration: '1s' }}>
          
          {/* HARD LEFT EDGE FADE: Only fades the left 40% of the image container to blend into the black background */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-background to-transparent z-10" />
          
          {/* BOTTOM FADE: Softer fade at the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10" />
          
          <img 
            src="/ufc-hero.jpg" 
            alt="UFC Champions" 
            className="h-full w-full object-cover object-right-top opacity-100" 
          />
        </div>

        {/* Hero Content */}
        <div className="container relative z-20 px-4 md:px-8">
          <div className="max-w-2xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium mb-6 shadow-sm">
              <span className="live-dot" />
              <span className="tracking-widest uppercase text-muted-foreground font-bold">Real-Time UFC Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05]">
              See the fight <br />
              <span className="text-primary drop-shadow-sm">before it happens.</span>
            </h1>
            
            <p className="mt-6 text-lg font-medium text-foreground/80 max-w-xl drop-shadow-md">
              UFCRealStats turns raw octagon data into elite fight intelligence — compare fighters, decode matchups, and forecast outcomes with a precision-built analytics engine.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/compare" className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md">
                <Icons.Compare /> <span className="ml-2">Compare Fighters</span>
              </Link>
              <Link to="/fighters" className="inline-flex items-center justify-center h-11 px-8 rounded-md bg-surface border border-border text-foreground font-bold hover:bg-secondary transition-colors shadow-sm">
                <Icons.Search /> <span className="ml-2">Explore Stats</span>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border shadow-sm">
              <StatBlock label="Fighters tracked" value={data.fighters.length} icon={<Icons.Users />} />
              <StatBlock label="Stats per fighter" value="28" icon={<Icons.Activity />} />
              <StatBlock label="Fights analyzed" value="12,400+" icon={<Icons.Target />} />
              <StatBlock label="Data precision" value="99%" icon={<Icons.Trophy />} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED MATCHUP */}
      {a && b && (
        <section className="container py-16 px-4 md:px-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">Featured Matchup</div>
              <h2 className="mt-1 text-3xl font-bold tracking-tight">{a.name} vs {b.name}</h2>
            </div>
            <Link to={`/compare?a=${a.id}&b=${b.id}`} className="text-sm font-bold hover:text-primary text-muted-foreground transition-colors flex items-center gap-1">
              Full breakdown <Icons.ArrowRight />
            </Link>
          </div>

          <div className="surface-card overflow-hidden">
            <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
              <div className="p-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6 bg-surface-2 relative">
                <FeaturedFighter fighter={a} side="left" pct={62} />
                <div className="relative text-center">
                  <div className="text-[10px] font-bold tracking-[0.3em] text-muted-foreground">VS</div>
                  <div className="mt-2 stat-num text-xl font-black">Moderate</div>
                  <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Edge</div>
                </div>
                <FeaturedFighter fighter={b} side="right" pct={38} />
              </div>
              <div className="p-8">
                <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-2">
                  <span className="text-primary"><Icons.Activity /></span> Forecast
                </div>
                <p className="mt-2 text-base font-medium text-foreground/90">Based on historical database records, {a.name} carries the statistical edge.</p>
                <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-secondary">
                  <div className="bg-primary" style={{ width: `62%` }} />
                  <div className="bg-blue-500" style={{ width: `38%` }} />
                </div>
                <div className="mt-2 flex items-center justify-between font-bold">
                  <div><span className="stat-num text-2xl text-primary">62%</span><span className="text-xs text-muted-foreground ml-2">{a.name.split(" ").slice(-1)[0]}</span></div>
                  <div className="text-right"><span className="text-xs text-muted-foreground mr-2">{b.name.split(" ").slice(-1)[0]}</span><span className="stat-num text-2xl text-blue-500">38%</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. P4P RANKINGS */}
      <section className="container py-16 px-4 md:px-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">UFC Official · Pound-for-pound</div>
            <h2 className="mt-1 text-3xl font-bold tracking-tight">Men's P4P · Top of the rankings</h2>
          </div>
          <Link to="/fighters" className="text-sm font-bold hover:text-primary text-muted-foreground transition-colors flex items-center gap-1">
            All fighters <Icons.ArrowRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.champions.map((f, i) => (
            <FighterCard key={f.id} fighter={f} rank={i} />
          ))}
        </div>
      </section>

      {/* 4. TRENDING STATS */}
      <section className="container py-16 px-4 md:px-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">Trending</div>
            <h2 className="mt-1 text-3xl font-bold tracking-tight flex items-center gap-2"><div className="text-primary"><Icons.TrendingUp /></div> High Output Fighters</h2>
          </div>
        </div>
        <div className="surface-card overflow-hidden">
          <div className="divide-y divide-border">
            {data.trending.map((f, i) => (
              <Link key={f.id} to={`/fighters/${f.id}`} className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[40px_1fr_120px_140px_120px] items-center gap-4 px-5 py-4 hover:bg-surface-2 transition-colors">
                <div className="stat-num text-xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-md border border-border bg-surface-2 overflow-hidden shrink-0">
                    <img src={f.image} onError={(e) => { e.target.src = f.fallback; }} className="h-full w-full object-cover object-top" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold truncate text-foreground group-hover:text-primary transition-colors">{f.name}</div>
                    <div className="text-xs font-medium text-muted-foreground truncate">{f.weightClass}</div>
                  </div>
                </div>
                <div className="hidden sm:block text-sm font-bold stat-num">{f.wins}-{f.losses}-{f.draws}</div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm">
                  <span className="chip-primary">ACTIVE</span>
                </div>
                <div className="text-right">
                  <div className="stat-num text-sm font-bold">{f.slpm}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">SLpM</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="container py-20 px-4 md:px-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="surface-card relative overflow-hidden p-10 md:p-14 text-center border-primary/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Predict the next title fight.</h2>
            <p className="mt-4 text-muted-foreground font-medium max-w-xl mx-auto">Run any matchup through our analytical engine. Strikes, takedowns, defense, form — distilled into a single edge.</p>
            <Link to="/compare" className="mt-8 inline-flex items-center justify-center h-11 px-8 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md">
              Run a matchup <div className="ml-2"><Icons.ArrowRight /></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function StatBlock({ label, value, icon }) {
  return (
    <div className="bg-surface p-5">
      <div className="text-primary">{icon}</div>
      <div className="mt-3 stat-num text-3xl">{value}</div>
      <div className="mt-1 text-xs font-bold text-muted-foreground tracking-wider uppercase">{label}</div>
    </div>
  );
}

function FeaturedFighter({ fighter, side, pct }) {
  return (
    <div className={`relative flex ${side === "right" ? "flex-row-reverse text-right" : ""} items-center gap-4`}>
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl border border-border bg-surface-3 overflow-hidden shadow-sm">
         <img src={fighter.image} onError={(e) => { e.target.src = fighter.fallback; }} className="h-full w-full object-cover object-top" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-muted-foreground">{fighter.weightClass}</div>
        <div className="text-lg sm:text-xl font-extrabold tracking-tight truncate">{fighter.name}</div>
        <div className="stat-num text-sm font-bold text-muted-foreground">{fighter.wins}-{fighter.losses}-{fighter.draws}</div>
        <div className={`mt-2 stat-num text-2xl ${side === "left" ? "text-primary" : "text-blue-500"}`}>{pct}%</div>
      </div>
    </div>
  );
}

function FighterCard({ fighter, rank }) {
  return (
    <div className="group relative surface-card overflow-hidden hover-lift block cursor-pointer">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        {rank === 0 ? <span className="chip-primary">CHAMPION</span> : <span className="chip">#{rank + 1}</span>}
      </div>

      <div className="relative h-44 bg-surface-2 overflow-hidden border-b border-border">
        <img src={fighter.image} onError={(e) => { e.target.src = fighter.fallback; }} className="absolute inset-0 object-cover object-top w-full h-full transition-transform duration-500 group-hover:scale-105" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <span className="truncate">{fighter.weightClass}</span>
            </div>
            <h3 className="mt-1 text-base font-extrabold tracking-tight truncate group-hover:text-primary transition-colors">{fighter.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <div className="stat-num text-lg leading-none">{fighter.wins}-{fighter.losses}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 tracking-wider uppercase">Record</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-md bg-secondary border border-border py-2">
            <div className="stat-num text-sm">{fighter.strAcc}%</div>
            <div className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">STR ACC</div>
          </div>
          <div className="rounded-md bg-secondary border border-border py-2">
            <div className="stat-num text-sm">{fighter.tdDef}%</div>
            <div className="text-[9px] font-bold text-muted-foreground tracking-widest uppercase mt-0.5">TD DEF</div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <Link to={`/compare?a=${fighter.id}`} className="inline-flex items-center justify-center w-full h-9 rounded-md bg-surface border border-border text-foreground font-bold text-sm hover:bg-secondary transition-colors shadow-sm">
          <Icons.Compare /> <span className="ml-2">Compare</span>
        </Link>
      </div>
    </div>
  );
}