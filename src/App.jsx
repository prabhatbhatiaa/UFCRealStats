import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { fetchFighters } from './store/fighterSlice';
import { AppLayout } from './components/layout/AppLayout';
import { FighterExplorer } from './pages/FighterExplorer';
import { CompareEngine } from './pages/CompareEngine';
import { Dashboard } from './pages/Dashboard';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFighters());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<AppLayout theme="dark" />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/fighters" element={<FighterExplorer />} />
        <Route path="/compare" element={<CompareEngine />} />
      </Route>
    </Routes>
  );
}

export default App;