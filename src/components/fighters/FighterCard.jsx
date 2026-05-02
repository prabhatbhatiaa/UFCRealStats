import { Activity } from 'lucide-react';

export function FighterCard({ fighter }) {
  const placeholderImage = `https://api.dicebear.com/7.x/notionists/svg?seed=${fighter.id}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/50 group">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
      <img 
        src={`https://wsrv.nl/?url=${encodeURIComponent(`https://dmxg5wxfqgb4u.cloudfront.net/styles/f_authors_headshot/s3/image-root/${fighter.slug}__headshot.png`)}`}
        alt={fighter.name} 
        onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${fighter.name.replace(/\s+/g, '+')}&background=121214&color=fff&size=512`; }}
      />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1 truncate">
              {fighter.weightClass}
            </p>
            <h3 className="font-bold text-lg leading-tight tracking-tight truncate">{fighter.name}</h3>
          </div>
          <span className="text-sm font-bold text-muted-foreground bg-secondary px-2 py-1 rounded">US</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <span className="font-mono font-bold text-foreground text-sm">
              {fighter.wins}-{fighter.losses}-{fighter.draws}
            </span>
          </div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
            {fighter.stance}
          </div>
        </div>
      </div>
    </div>
  );
}