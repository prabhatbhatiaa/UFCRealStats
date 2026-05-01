import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFighters } from './store/fighterSlice';

function App() {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.fighters);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFighters());
    }
  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-background text-foreground dark p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary tracking-tight">UFCRealStats API</h1>
        
        {status === 'loading' && (
          <div className="p-6 border border-border rounded-lg bg-secondary/50 animate-pulse">
            <p className="text-muted-foreground text-lg">Fetching live data using axios</p>
          </div>
        )}
        
        {status === 'failed' && (
          <div className="p-6 border border-destructive rounded-lg bg-destructive/10">
            <p className="text-destructive font-mono text-sm">Error: {error}</p>
            <p className="text-muted-foreground mt-2 text-sm">.</p>
          </div>
        )}
        
        {status === 'succeeded' && (
          <div className="p-6 border border-primary/50 rounded-lg bg-primary/10 shadow-lg shadow-primary/5">
            <h2 className="text-2xl font-semibold text-green-400 mb-2">Connection to custom api Successful!</h2>
            <p className="text-muted-foreground text-lg">
              Successfully loaded <span className="font-bold text-foreground text-2xl">{data.length}</span> fighters into the Redux store using standard REST API integration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;