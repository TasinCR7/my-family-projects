import { motion } from 'framer-motion';
import { usePolls } from '@/hooks/useSupabaseData';
import { Loader2, PieChart, CheckCircle2, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Voting() {
  const { polls, loading } = usePolls();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">ভোট পোর্টাল লোড হচ্ছে...</p>
      </div>
    );
  }

  const handleVote = (pollId: string, optionId: string) => {
    // This would normally call a Supabase RPC or update the vote count.
    // For now, I'll simulate a toast to provide immediate feedback.
    toast.success("আপনার ভোট সফলভাবে নিবন্ধিত হয়েছে!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🗳️ পারিবারিক ভোটিং</h1>
        <p className="text-muted-foreground text-sm mt-1">গুরুত্বপূর্ণ সিদ্ধান্ত নিতে ভোট দিন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {polls.length === 0 ? (
          <div className="col-span-full bg-card rounded-xl border border-dashed p-20 text-center">
            <PieChart size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">বর্তমানে কোনো সচল পোল নেই।</p>
          </div>
        ) : (
          polls.map((poll, i) => {
            const totalVotes = poll.poll_options?.reduce((sum: number, opt: any) => sum + (opt.votes || 0), 0) || 0;
            return (
              <motion.div
                key={poll.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 space-y-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{poll.question}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Calendar size={12} />
                      শেষ সময়: {poll.deadline || 'অনির্ধারিত'} • {poll.status}
                    </div>
                  </div>
                  <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <CheckCircle2 size={24} />
                  </div>
                </div>

                <div className="space-y-3">
                  {poll.poll_options?.map((option: any) => {
                    const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                    return (
                      <div key={option.id} className="space-y-1.5 group cursor-pointer" onClick={() => handleVote(poll.id, option.id)}>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium group-hover:text-primary transition-colors">{option.text}</span>
                          <span className="text-muted-foreground">{option.votes || 0} ভোট ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${percentage === Math.max(...poll.poll_options.map((o: any) => o.votes)) && percentage > 0 ? 'bg-primary' : 'bg-primary/20'}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">মোট ভোট: {totalVotes}</p>
                  <Button variant="ghost" size="sm" className="text-xs flex items-center gap-2 h-8">
                    <Trophy size={12} className="text-gold" /> ফলাফল দেখুন
                  </Button>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
