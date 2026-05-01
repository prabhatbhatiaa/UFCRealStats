import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip, Legend } from 'recharts';

export function CompareEngine() {
  const { data: fighters } = useSelector((state) => state.fighters);
  
  const [fighterAId, setFighterAId] = useState('');
  const [fighterBId, setFighterBId] = useState('');

  const fighterA = fighters.find(f => f.id === fighterAId);
  const fighterB = fighters.find(f => f.id === fighterBId);

  const radarData = useMemo(() => {
    if (!fighterA || !fighterB) return [];
    
    return [
      { stat: "Striking Vol.", A: Math.min(100, (fighterA.slpm || 0) * 12), B: Math.min(100, (fighterB.slpm || 0) * 12) },
      { stat: "Str. Acc %", A: fighterA.strAcc || 0, B: fighterB.strAcc || 0 },
      { stat: "Str. Def %", A: fighterA.strDef || 0, B: fighterB.strDef || 0 },
      { stat: "TD Offense", A: Math.min(100, (fighterA.tdAvg || 0) * 14), B: Math.min(100, (fighterB.tdAvg || 0) * 14) },
      { stat: "TD Defense", A: fighterA.tdDef || 0, B: fighterB.tdDef || 0 },
      { stat: "Finish Rate %", A: fighterA.finishRate || 0, B: fighterB.finishRate || 0 },
    ];
  }, [fighterA, fighterB]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Compare Engine</h1>
        <p className="text-muted-foreground">Select two fighters to visualize their head-to-head statistical advantages.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 p-6 border border-border rounded-xl bg-card">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">Red Corner (Fighter A)</label>
          <select 
            value={fighterAId} 
            onChange={(e) => setFighterAId(e.target.value)}
            className="w-full bg-secondary border-transparent rounded-md px-4 py-2 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="">Select a fighter...</option>
            {fighters.map(f => (
              <option key={`A-${f.id}`} value={f.id}>{f.name} ({f.weightClass})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-500 mb-2">Blue Corner (Fighter B)</label>
          <select 
            value={fighterBId} 
            onChange={(e) => setFighterBId(e.target.value)}
            className="w-full bg-secondary border-transparent rounded-md px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          >
            <option value="">Select a fighter...</option>
            {fighters.map(f => (
              <option key={`B-${f.id}`} value={f.id}>{f.name} ({f.weightClass})</option>
            ))}
          </select>
        </div>
      </div>

      {fighterA && fighterB ? (
        <div className="border border-border rounded-xl bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-center mb-6">
            <span className="text-primary">{fighterA.name}</span> vs <span className="text-blue-500">{fighterB.name}</span>
          </h2>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="stat" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Radar name={fighterA.name} dataKey="A" stroke="#22c55e" fill="#22c55e" fillOpacity={0.4} />
                <Radar name={fighterB.name} dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed rounded-xl border-border text-muted-foreground">
          Please select two fighters to generate the statistical comparison chart.
        </div>
      )}
    </div>
  );
}