import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { fetchFighters } from './store/fighterSlice';
import { AppLayout } from './components/layout/AppLayout';
import { FighterCard } from './components/fighters/FighterCard';


const FighterExplorer = () => {
  const { data: fighters, status } = useSelector((state) => state.fighters);
  const [searchQuery, setSearchQuery] = useState('');
  const [weightClassFilter, setWeightClassFilter] = useState('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const uniqueWeightClasses = useMemo(() => {
    const classes = new Set(fighters.map(f => f.weight_class).filter(Boolean));
    return ['All', ...Array.from(classes).sort()];
  }, [fighters]);

  const filteredFighters = useMemo(() => {
    return fighters.filter((fighter) => {
      const matchesSearch = fighter.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (fighter.nickname && fighter.nickname.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesWeight = weightClassFilter === 'All' || fighter.weight_class === weightClassFilter;
      return matchesSearch && matchesWeight;
    });
  }, [fighters, searchQuery, weightClassFilter]);

  const paginatedFighters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredFighters.slice(0, startIndex + itemsPerPage);
  }, [filteredFighters, currentPage]);

  const hasMore = paginatedFighters.length < filteredFighters.length;

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Fighter Roster</h1>
          <p className="text-muted-foreground">Search, filter, and analyze the entire active roster.</p>
        </div>
        <div className="text-sm text-muted-foreground font-mono bg-secondary px-3 py-1.5 rounded-md">
          {filteredFighters.length} / {fighters.length} Results
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 rounded-xl border border-border bg-card shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or nickname..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); 
            }}
            className="w-full pl-9 pr-4 py-2 bg-secondary border-transparent rounded-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <select
            value={weightClassFilter}
            onChange={(e) => {
              setWeightClassFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-secondary border-transparent rounded-md px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer"
          >
            {uniqueWeightClasses.map(wc => (
              <option key={wc} value={wc}>{wc}</option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-secondary rounded-xl"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedFighters.map((fighter) => (
              <FighterCard key={fighter.id} fighter={fighter} />
            ))}
          </div>
          
          {filteredFighters.length === 0 && (
             <div className="text-center py-20 border border-dashed rounded-xl border-border">
                <Search className="h-10 w-10 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium">No fighters found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters.</p>
             </div>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="px-6 py-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium text-sm transition-colors border border-border"
              >
                Load More Fighters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Dashboard = () => <div className="container py-10"><h1 className="text-3xl font-bold">Dashboard (Coming Next)</h1></div>;
const CompareEngine = () => <div className="container py-10"><h1 className="text-3xl font-bold">Compare Engine (Coming Soon)</h1></div>;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFighters());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fighters" element={<FighterExplorer />} />
        <Route path="/compare" element={<CompareEngine />} />
      </Route>
    </Routes>
  );
}

export default App;