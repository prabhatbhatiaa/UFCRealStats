import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { FighterCard } from '../components/fighters/FighterCard';

export function FighterExplorer() {
  const { data: fighters, status } = useSelector((state) => state.fighters);
  const [searchQuery, setSearchQuery] = useState('');
  const [weightFilter, setWeightFilter] = useState('All');
  const [displayLimit, setDisplayLimit] = useState(24);

  const filteredFighters = useMemo(() => {
    return fighters.filter(f => {
      const nameMatch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      const weightMatch = weightFilter === 'All' || f.weightClass === weightFilter;
      return nameMatch && weightMatch;
    });
  }, [fighters, searchQuery, weightFilter]);

  const visibleFighters = filteredFighters.slice(0, displayLimit);
  const hasMore = displayLimit < filteredFighters.length;

  return (
    <div className="container py-10 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">UFC Roster</h1>
          <p className="text-muted-foreground italic">
            {status === 'succeeded' ? `Full access to all ${fighters.length} fighters.` : 'Waking up the database...'}
          </p>
        </div>
        <div className="text-xs font-mono bg-secondary/50 px-3 py-1.5 rounded-md border border-border">
          {filteredFighters.length} Matches Found
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search all 4,000+ fighters instantly..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayLimit(24);
            }}
            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border/50 rounded-md outline-none focus:border-primary transition-all"
          />
        </div>
        
        <select
          value={weightFilter}
          onChange={(e) => {
            setWeightFilter(e.target.value);
            setDisplayLimit(24);
          }}
          className="bg-secondary text-foreground border border-border/50 rounded-md px-4 py-2 text-sm outline-none cursor-pointer focus:border-primary"
        >
          <option value="All">All Weights</option>
          <option value="125 lbs.">Flyweight</option>
          <option value="135 lbs.">Bantamweight</option>
          <option value="145 lbs.">Featherweight</option>
          <option value="155 lbs.">Lightweight</option>
          <option value="170 lbs.">Welterweight</option>
          <option value="185 lbs.">Middleweight</option>
          <option value="205 lbs.">L. Heavyweight</option>
          <option value="265 lbs.">Heavyweight</option>
        </select>
      </div>

        {status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm font-mono text-muted-foreground animate-pulse">
            Syncing Global Roster... ({fighters.length} loaded)
            </p>
        </div>
        )}

      {status === 'failed' ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-bold">Failed to load fighters. Please try again later.</p>
        </div>
       )
      : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleFighters.map(f => <FighterCard key={f.id} fighter={f} />)}
          </div>
          
          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setDisplayLimit(prev => prev + 24)}
                className="px-8 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-full text-sm font-bold transition-all"
              >
                Show More Legends
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}