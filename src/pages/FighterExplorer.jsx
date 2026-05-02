import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { FighterCard } from '../components/fighters/FighterCard';

export function FighterExplorer() {
  const { data: fighters, status } = useSelector((state) => state.fighters);
  const [query, setQuery] = useState('');
  const [weight, setWeight] = useState('All');
  const [limit, setLimit] = useState(24);

  const filtered = useMemo(() => {
    return fighters.filter(f => {
      const nameMatch = f.name.toLowerCase().includes(query.toLowerCase());
      const weightMatch = weight === 'All' || f.weightClass === weight;
      return nameMatch && weightMatch;
    });
  }, [fighters, query, weight]);

  const displayFighters = filtered.slice(0, limit);

  return (
    <div className="container py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">UFC Roster</h1>
          <p className="text-muted-foreground italic">
            {status === 'loading' ? 'Downloading global records...' : `Accessing ${fighters.length} verified fighters.`}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10 p-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search Ilia Topuria, Carlos Ulberg..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setLimit(24); }}
            className="w-full pl-10 pr-4 py-2 bg-secondary/30 border border-border/50 rounded-md outline-none focus:border-primary transition-all"
          />
        </div>
        
        <select
          value={weight}
          onChange={(e) => { setWeight(e.target.value); setLimit(24); }}
          className="bg-secondary text-foreground border border-border/50 rounded-md px-4 py-2 text-sm outline-none cursor-pointer"
        >
          <option value="All">All Weights</option>
          <option value="155 lbs.">Lightweight</option>
          <option value="170 lbs.">Welterweight</option>
          <option value="185 lbs.">Middleweight</option>
          <option value="205 lbs.">L. Heavyweight</option>
          <option value="265 lbs.">Heavyweight</option>
        </select>
      </div>

      {status === 'loading' && fighters.length === 0 ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-muted-foreground">Syncing Octagon database...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayFighters.map(f => <FighterCard key={f.id} fighter={f} />)}
          </div>
          
          {limit < filtered.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setLimit(prev => prev + 24)}
                className="px-8 py-2.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 rounded-full text-sm font-bold transition-all"
              >
                Load More Results
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}