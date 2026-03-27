import { motion } from 'framer-motion';
import { familyMembers } from '@/data/mockData';
import { Trophy, Medal } from 'lucide-react';

export default function SuccessTracker() {
  const sorted = [...familyMembers].sort((a, b) => b.successRate - a.successRate);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🏆 সাফল্য ট্র্যাকার</h1>
        <p className="text-muted-foreground text-sm mt-1">সদস্যদের পারফরম্যান্স ও লিডারবোর্ড</p>
      </div>

      {/* Leaderboard */}
      <div className="space-y-3">
        {sorted.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
              i === 0 ? 'gradient-gold text-primary-foreground' : i === 1 ? 'bg-muted text-muted-foreground' : i === 2 ? 'bg-accent text-accent-foreground' : 'bg-muted/50 text-muted-foreground'
            }`}>
              {i < 3 ? (i === 0 ? <Trophy size={20} /> : <Medal size={20} />) : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm">{member.name}</h3>
                <span className="text-sm font-bold">{member.successRate}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${member.successRate}%` }}
                  transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                  className={`h-full rounded-full ${i === 0 ? 'gradient-gold' : 'gradient-emerald'}`}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{member.tasksCompleted}/{member.tasksTotal} কার্য সম্পন্ন</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
