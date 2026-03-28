import { motion } from 'framer-motion';
import { useNotices } from '@/hooks/useSupabaseData';
import { Loader2, Megaphone, Pin, Calendar } from 'lucide-react';

export default function Notices() {
  const { notices, loading } = useNotices();

  const typeColors: Record<string, string> = {
    'সাধারণ': 'border-primary/20 bg-primary/5 text-primary',
    'সফলতা': 'border-success/20 bg-success/5 text-success',
    'সতর্কতা': 'border-warning/20 bg-warning/5 text-warning',
    'জরুরী': 'border-destructive/20 bg-destructive/5 text-destructive',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">নোটিশ বোর্ড লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">📢 নোটিশ বোর্ড</h1>
        <p className="text-muted-foreground text-sm mt-1">পরিবারের সকল খবর ও ঘোষণা</p>
      </div>

      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed p-20 text-center">
            <Megaphone size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">এখনো কোনো নোটিশ নেই।</p>
          </div>
        ) : (
          notices.map((notice, i) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`bg-card rounded-xl border p-6 relative group hover:shadow-md transition-shadow ${typeColors[notice.type] || typeColors['সাধারণ']}`}
            >
              {notice.pinned && (
                <div className="absolute top-4 right-4 text-primary">
                  <Pin size={16} fill="currentColor" />
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-current">
                    {notice.type}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] opacity-60">
                    <Calendar size={10} />
                    {new Date(notice.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-card-foreground">{notice.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {notice.message}
                </p>
                
                <div className="pt-2 flex items-center justify-between">
                  <p className="text-[10px] font-medium opacity-60">প্রকাশক: {notice.author || 'অ্যাডমিন'}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
