import { motion } from 'framer-motion';
import { Phone, Mail, TrendingUp, Loader2, Users } from 'lucide-react';
import { useMembers } from '@/hooks/useSupabaseData';
import AddMemberModal from '@/components/modals/AddMemberModal';

export default function Members() {
  const { members, loading, refetch } = useMembers();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">সদস্য তালিকা লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">👨‍👩‍👧‍👦 পরিবারের সদস্য</h1>
          <p className="text-muted-foreground text-sm mt-1">আমাদের পরিবারের সকল সদস্যের তালিকা</p>
        </div>
        <AddMemberModal onSuccess={refetch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {members.length === 0 ? (
          <div className="col-span-full bg-card rounded-xl border border-dashed p-20 text-center">
            <Users size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">এখনো কোনো সদস্য যোগ করা হয়নি।</p>
          </div>
        ) : (
          members.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Header */}
              <div className="gradient-hero p-4 relative">
                <div className="absolute inset-0 bg-gold/5" />
                <div className="relative flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center text-primary-foreground text-xl font-bold">
                    {member.name[0]}
                  </div>
                  <div className="text-primary-foreground">
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-xs text-primary-foreground/70">{member.relation} • {member.age} বছর</p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone size={14} /> <span>{member.phone || 'নেই'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail size={14} /> <span>{member.email || 'নেই'}</span>
                </div>

                {/* Progress */}
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp size={14} /> সাফল্যের হার
                    </span>
                    <span className="font-semibold text-card-foreground">{member.successRate}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${member.successRate}%` }}
                      transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full rounded-full gradient-emerald"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {member.tasksCompleted}/{member.tasksTotal} কার্য সম্পন্ন
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
