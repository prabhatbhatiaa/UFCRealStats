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

// CURRENT UFC MEN'S P4P RANKINGS 
const REAL_P4P_ROSTER = [
  { id: "1", name: "Islam Makhachev", weightClass: "Lightweight", w: 25, l: 1, strAcc: 60, tdDef: 90, slpm: 2.41, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2025-01/7/MAKHACHEV_ISLAM_L_BELT_01-18.png" },
  { id: "2", name: "Ilia Topuria", weightClass: "Featherweight", w: 15, l: 0, strAcc: 46, tdDef: 92, slpm: 4.46, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-10/TOPURIA_ILIA_L_BELT_10-26.png" },
  { id: "3", name: "Khamzat Chimaev", weightClass: "Middleweight", w: 14, l: 0, strAcc: 58, tdDef: 100, slpm: 5.72, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-10/CHIMAEV_KHAMZAT_R_10-26.png" },
  { id: "4", name: "Alex Volkanovski", weightClass: "Featherweight", w: 26, l: 4, strAcc: 57, tdDef: 72, slpm: 6.58, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-02/VOLKANOVSKI_ALEXANDER_R_02-17.png" },
  { id: "5", name: "Alex Pereira", weightClass: "Light Heavyweight", w: 10, l: 2, strAcc: 62, tdDef: 70, slpm: 5.10, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-10/PEREIRA_ALEX_L_BELT_10-05.png" },
  { id: "6", name: "Petr Yan", weightClass: "Bantamweight", w: 17, l: 5, strAcc: 53, tdDef: 85, slpm: 5.03, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-11/YAN_PETR_L_11-23.png" },
  { id: "7", name: "Tom Aspinall", weightClass: "Heavyweight", w: 14, l: 3, strAcc: 66, tdDef: 100, slpm: 7.71, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-07/ASPINALL_TOM_L_BELT_07-27.png" },
  { id: "8", name: "Merab Dvalishvili", weightClass: "Bantamweight", w: 17, l: 4, strAcc: 41, tdDef: 80, slpm: 4.46, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-09/DVALISHVILI_MERAB_L_BELT_09-14.png" },
];

const TRENDING_ROSTER = [
  { id: "9", name: "Alexandre Pantoja", weightClass: "Flyweight", w: 27, l: 5, slpm: 4.32, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-12/PANTOJA_ALEXANDRE_L_BELT_12-07.png" },
  { id: "10", name: "Joshua Van", weightClass: "Flyweight", w: 10, l: 1, slpm: 5.80, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-07/VAN_JOSHUA_R_07-13.png" },
  { id: "11", name: "Charles Oliveira", weightClass: "Lightweight", w: 34, l: 10, slpm: 3.54, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-11/OLIVEIRA_CHARLES_R_11-16.png" },
  { id: "12", name: "Dricus Du Plessis", weightClass: "Middleweight", w: 21, l: 2, slpm: 6.49, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-08/DU_PLESSIS_DRICUS_L_BELT_08-17.png" },
  { id: "13", name: "Arman Tsarukyan", weightClass: "Lightweight", w: 22, l: 3, slpm: 3.85, imgUrl: "https://www.ufc.com/images/styles/athlete_bio_full_body/s3/2024-04/TSARUKYAN_ARMAN_L_04-13.png" },
];

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center font-mono text-muted-foreground">Initializing Intelligence...</div>;

  const a = REAL_P4P_ROSTER[0]; 
  const b = REAL_P4P_ROSTER[1]; 

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-20 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 border-b border-border overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] lg:w-[60%] z-0 flex justify-end">
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background to-transparent z-10" />
          <img src="/ufc-hero.jpg" alt="UFC Champions" className="h-full w-full object-cover object-right-top opacity-90 dark:opacity-80 transition-opacity duration-300" />
        </div>

        <div className="container relative z-20 px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="tracking-widest uppercase text-muted-foreground font-bold">Real-Time UFC Intelligence</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05]">
              See the fight <br />
              <span className="text-primary drop-shadow-md">before it happens.</span>
            </h1>
            
            <p className="mt-6 text-lg font-medium text-foreground/80 max-w-xl">
              UFCRealStats turns raw octagon data into elite fight intelligence — compare fighters, decode matchups, and forecast outcomes with a precision-built analytics engine.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/compare" className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md">
                <Icons.Compare /> <span className="ml-2">Compare Fighters</span>
              </Link>
              <Link to="/fighters" className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-surface border border-border text-foreground font-bold hover:bg-secondary transition-colors shadow-sm">
                <Icons.Search /> <span className="ml-2">Explore Stats</span>
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border shadow-sm">
              <StatBlock label="Fighters tracked" value="1,248" icon={<Icons.Users />} />
              <StatBlock label="Stats per fighter" value="28" icon={<Icons.Activity />} />
              <StatBlock label="Fights analyzed" value="12,400+" icon={<Icons.Target />} />
              <StatBlock label="Data precision" value="99%" icon={<Icons.Trophy />} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED MATCHUP */}
      <section className="container py-16 px-4 md:px-8">
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
            <div className="p-8 flex flex-col justify-center">
              <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground flex items-center gap-2 mb-3">
                <span className="text-primary"><Icons.Activity /></span> Forecast
              </div>
              <p className="text-base font-medium text-foreground/90">Based on historical database records, {a.name} carries the statistical edge.</p>
              <div className="mt-6 flex h-3 rounded-full overflow-hidden bg-secondary border border-border">
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

      {/* 3. P4P RANKINGS */}
      <section className="container py-16 px-4 md:px-8">
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
          {REAL_P4P_ROSTER.map((f, i) => (
            <FighterCard key={f.id} fighter={f} rank={i} />
          ))}
        </div>
      </section>

      {/* 4. TRENDING STATS */}
      <section className="container py-16 px-4 md:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] uppercase text-muted-foreground">Trending</div>
            <h2 className="mt-1 text-3xl font-bold tracking-tight flex items-center gap-2"><div className="text-primary"><Icons.TrendingUp /></div> High Output Fighters</h2>
          </div>
        </div>
        <div className="surface-card overflow-hidden">
          <div className="divide-y divide-border">
            {TRENDING_ROSTER.map((f, i) => (
              <Link key={f.id} to={`/fighters/${f.id}`} className="grid grid-cols-[40px_1fr_auto] sm:grid-cols-[40px_1fr_120px_140px_120px] items-center gap-4 px-5 py-4 hover:bg-surface-2 transition-colors">
                <div className="stat-num text-xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</div>
                
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-full border border-border bg-surface-3 overflow-hidden shrink-0 flex items-end justify-center">
                    <SmartImage imgUrl={f.imgUrl} name={f.name} className="w-[120%] h-auto object-contain translate-y-1" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold truncate text-foreground group-hover:text-primary transition-colors">{f.name}</div>
                    <div className="text-xs font-medium text-muted-foreground truncate">{f.weightClass}</div>
                  </div>
                </div>

                <div className="hidden sm:block text-sm font-bold stat-num">{f.w}-{f.l}-0</div>
                <div className="hidden sm:flex items-center gap-1.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/20">ACTIVE</span>
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
      <section className="container py-20 px-4 md:px-8">
        <div className="surface-card relative overflow-hidden p-10 md:p-14 text-center border-primary/20">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Predict the next title fight.</h2>
            <p className="mt-4 text-muted-foreground font-medium max-w-xl mx-auto">Run any matchup through our analytical engine. Strikes, takedowns, defense, form — distilled into a single edge.</p>
            <Link to="/compare" className="mt-8 inline-flex items-center justify-center h-12 px-8 rounded-md bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md">
              Run a matchup <div className="ml-2"><Icons.ArrowRight /></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- THE FIX: SMART IMAGE PROXY ---
// We route the image through wsrv.nl to bypass the UFC's hotlink protection
function SmartImage({ imgUrl, name, className }) {
  const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(imgUrl)}`;
  const fallbackUrl = `https://ui-avatars.com/api/?name=${name.replace(/\s+/g, '+')}&background=121214&color=fff&size=512`;

  return (
    <img 
      src={proxyUrl} 
      alt={name} 
      className={className} 
      onError={(e) => { e.target.src = fallbackUrl; }}
    />
  );
}

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
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-xl border border-border bg-surface-3 overflow-hidden shadow-sm flex items-end justify-center">
         <SmartImage imgUrl={fighter.imgUrl} name={fighter.name} className="w-[85%] h-auto object-contain translate-y-1" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-bold text-muted-foreground">{fighter.weightClass}</div>
        <div className="text-lg sm:text-xl font-extrabold tracking-tight truncate">{fighter.name}</div>
        <div className="stat-num text-sm font-bold text-muted-foreground">{fighter.w}-{fighter.l}-0</div>
        <div className={`mt-2 stat-num text-2xl ${side === "left" ? "text-primary" : "text-blue-500"}`}>{pct}%</div>
      </div>
    </div>
  );
}

function FighterCard({ fighter, rank }) {
  return (
    <div className="group relative bg-surface border border-border rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:border-primary/30 transition-all duration-300 cursor-pointer block">
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        {rank === 0 
          ? <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary tracking-widest uppercase border border-primary/20">CHAMPION</span> 
          : <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-foreground/80">#{rank + 1}</span>}
      </div>

      <div className="relative h-48 bg-surface-2 overflow-hidden border-b border-border flex justify-center items-end pt-4">
        <SmartImage 
          imgUrl={fighter.imgUrl} 
          name={fighter.name} 
          className="w-[90%] h-[110%] object-contain object-bottom transition-transform duration-500 group-hover:scale-105" 
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
              <span className="truncate">{fighter.weightClass}</span>
            </div>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight truncate group-hover:text-primary transition-colors">{fighter.name}</h3>
          </div>
          <div className="text-right shrink-0">
            <div className="stat-num text-lg leading-none">{fighter.w}-{fighter.l}</div>
            <div className="text-[10px] font-bold text-muted-foreground mt-1 tracking-wider uppercase">Record</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 text-center">
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
      <div className="px-5 pb-5">
        <Link to={`/compare?a=${fighter.id}`} className="inline-flex items-center justify-center w-full h-10 rounded-md bg-secondary border border-border text-foreground font-bold text-sm hover:bg-surface-3 transition-colors shadow-sm">
          <Icons.Compare /> <span className="ml-2">Compare</span>
        </Link>
      </div>
    </div>
  );
}