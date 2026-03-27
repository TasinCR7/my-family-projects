import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const lands = [
  { id: '1', location: 'ঢাকা, সাভার', mouza: 'মৌজা-১২', dag: '১২৩', area: '১০ শতক', value: '৫০,০০,০০০', status: 'resolved', progress: 100 },
  { id: '2', location: 'চট্টগ্রাম, সীতাকুণ্ড', mouza: 'মৌজা-৪৫', dag: '৪৫৬', area: '২০ শতক', value: '৮০,০০,০০০', status: 'partial', progress: 60 },
  { id: '3', location: 'রাজশাহী, পবা', mouza: 'মৌজা-৭৮', dag: '৭৮৯', area: '১৫ শতক', value: '৩৫,০০,০০০', status: 'pending', progress: 25 },
  { id: '4', location: 'সিলেট, বিয়ানীবাজার', mouza: 'মৌজা-৩৩', dag: '৩৩৩', area: '৫ শতক', value: '২০,০০,০০০', status: 'court', progress: 10 },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  resolved: { label: 'সমাধান হয়েছে', color: 'bg-success/20 text-success' },
  partial: { label: 'আংশিক', color: 'bg-warning/20 text-warning' },
  pending: { label: 'বিচারাধীন', color: 'bg-info/20 text-info' },
  court: { label: 'মামলা চলছে', color: 'bg-destructive/20 text-destructive' },
};

export default function LandManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🏞️ জমি ব্যবস্থাপনা</h1>
        <p className="text-muted-foreground text-sm mt-1">পারিবারিক জমি ও সম্পত্তির তথ্য</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lands.map((land, i) => (
          <motion.div
            key={land.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card rounded-xl border border-border p-5 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <h3 className="font-semibold">{land.location}</h3>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusConfig[land.status].color}`}>
                {statusConfig[land.status].label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <p>মৌজা: {land.mouza}</p>
              <p>দাগ: {land.dag}</p>
              <p>আয়তন: {land.area}</p>
              <p>মূল্য: ৳{land.value}</p>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">অগ্রগতি</span>
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
        ))}
      </div>
    </div>
  );
}
