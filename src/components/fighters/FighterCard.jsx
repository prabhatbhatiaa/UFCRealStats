import { Activity } from 'lucide-react';

export function FighterCard({ fighter }) {
  // Use the ID or Name to generate a consistent placeholder avatar
  const placeholderImage = `https://api.dicebear.com/7.x/notionists/svg?seed=${fighter.id || fighter.name}`;

  // Safely extract the record object, defaulting to zeros if missing
  const w = fighter.record?.w || 0;
  const l = fighter.record?.l || 0;
  const d = fighter.record?.d || 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 group">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
        <img
          src={placeholderImage}
          alt={fighter.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {fighter.rank !== null && fighter.rank !== undefined && (
            <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-semibold text-primary-foreground shadow">
              {fighter.rank === 0 ? 'Champion' : `#${fighter.rank}`}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {fighter.weightClass || 'Unknown'}
            </p>
            <h3 className="font-bold text-xl leading-none tracking-tight">{fighter.name}</h3>
            {fighter.nickname && fighter.nickname !== '—' && (
              <p className="text-sm italic text-muted-foreground mt-1">"{fighter.nickname}"</p>
            )}
          </div>
          <span className="text-2xl" title={fighter.country}>{fighter.countryFlag}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Activity className="mr-1.5 h-4 w-4 text-primary" />
            <span className="font-mono font-medium text-foreground">{w}-{l}-{d}</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground font-mono">
            <span>W{fighter.winStreak || 0}</span>
            <span>{fighter.stance || 'Unknown'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}