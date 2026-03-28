import { motion } from 'framer-motion';
import { MapPin, Loader2, Landmark, FileText, ExternalLink } from 'lucide-react';
import { useLandRecords } from '@/hooks/useSupabaseData';
import AddLandRecordModal from '@/components/modals/AddLandRecordModal';
import { Button } from '@/components/ui/button';

const statusConfig: Record<string, { label: string; color: string }> = {
  resolved: { label: 'সমাধান হয়েছে', color: 'bg-success/20 text-success' },
  partial: { label: 'আংশিক', color: 'bg-warning/20 text-warning' },
  pending: { label: 'বিচারাধীন', color: 'bg-info/20 text-info' },
  court: { label: 'মামলা চলছে', color: 'bg-destructive/20 text-destructive' },
};

export default function LandManagement() {
  const { lands, loading, refetch } = useLandRecords();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">জমির তথ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">🏞️ জমি ব্যবস্থাপনা</h1>
          <p className="text-muted-foreground text-sm mt-1">পারিবারিক জমি ও সম্পত্তির তথ্য</p>
        </div>
        <AddLandRecordModal onSuccess={refetch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lands.length === 0 ? (
          <div className="col-span-full bg-card rounded-xl border border-dashed p-20 text-center">
            <Landmark size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">এখনো কোনো জমির তথ্য যোগ করা হয়নি।</p>
          </div>
        ) : (
          lands.map((land, i) => (
            <motion.div
              key={land.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-5 space-y-3 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" />
                  <h3 className="font-semibold">{land.location}</h3>
                </div>
                <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase ${statusConfig[land.status]?.color || statusConfig.pending.color}`}>
                  {statusConfig[land.status]?.label || statusConfig.pending.label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                <p>মৌজা: {land.mouza}</p>
                <p>দাগ: {land.dag}</p>
                <p>আয়তন: {land.area}</p>
                <p>মূল্য: ৳{land.value}</p>
              </div>

              {land.document_url && (
                <div className="pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-9 bg-primary/5 border-primary/20 hover:bg-primary/10 text-primary"
                    asChild
                  >
                    <a href={land.document_url} target="_blank" rel="noopener noreferrer">
                      <FileText size={14} className="mr-2" /> দলিল দেখুন <ExternalLink size={12} className="ml-2 opacity-50" />
                    </a>
                  </Button>
                </div>
              )}

              <div className="mt-auto pt-4 border-t border-border/50">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">নিষ্পত্তি অগ্রগতি</span>
                  <span className="font-medium">{land.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${land.progress}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full rounded-full gradient-emerald"
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
