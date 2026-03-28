import { motion } from 'framer-motion';
import { CheckCircle, Wallet, MapPin, Trophy, Loader2 } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import { SuccessPieChart, PerformanceBarChart } from '@/components/dashboard/DashboardCharts';
import { usePlans, useExpenses, useMembers } from '@/hooks/useSupabaseData';

export default function Dashboard() {
  const { plans, loading: plansLoading } = usePlans();
  const { expenses, loading: expensesLoading } = useExpenses();
  const { members, loading: membersLoading } = useMembers();

  const loading = plansLoading || expensesLoading || membersLoading;

  const recentPlans = plans.slice(0, 4);
  const successfulPlans = plans.filter(p => p.status === 'completed').length;
  const totalPlans = plans.length;
  const yearlyExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  
  // Find top performer (member with highest score)
  const topPerformer = members.length > 0 
    ? members.reduce((prev, current) => (prev.successRate > current.successRate) ? prev : current).name 
    : 'লোড হচ্ছে...';

  const statusColors: Record<string, string> = {
    'pending': 'bg-warning/20 text-warning',
    'in-progress': 'bg-info/20 text-info',
    'completed': 'bg-success/20 text-success',
    'failed': 'bg-destructive/20 text-destructive',
  };
  const statusLabels: Record<string, string> = {
    'pending': 'বিচারাধীন',
    'in-progress': 'চলমান',
    'completed': 'সম্পন্ন',
    'failed': 'ব্যর্থ',
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">ড্যাশবোর্ড লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-hero rounded-2xl p-8 text-primary-foreground relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <p className="text-sm text-primary-foreground/70 mb-1">🕌 বিসমিল্লাহির রাহমানির রাহিম</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">মরহুম আব্দুল গফুর পরিবার পোর্টাল</h1>
          <p className="text-primary-foreground/80 text-sm md:text-base">
            আসসালামু আলাইকুম! পরিবারের সকল সদস্যকে স্বাগতম। আসুন একসাথে আমাদের পারিবারিক ঐতিহ্য রক্ষা করি।
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CheckCircle} label="সফল পরিকল্পনা" value={successfulPlans} suffix={`/ ${totalPlans}`} gradient="emerald" delay={0.1} />
        <StatCard icon={Wallet} label="মোট ব্যয়" value={`৳${(yearlyExpenses / 1000).toFixed(1)}k`} gradient="gold" delay={0.2} />
        <StatCard icon={MapPin} label="সদস্য সংখ্যা" value={members.length} gradient="info" delay={0.3} />
        <StatCard icon={Trophy} label="সেরা পারফর্মার" value={topPerformer} gradient="gold" delay={0.4} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <SuccessPieChart />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <PerformanceBarChart />
        </motion.div>
      </div>

      {/* Recent Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card rounded-xl border border-border p-5"
      >
        <h3 className="font-semibold mb-4">সাম্প্রতিক পরিকল্পনা</h3>
        <div className="space-y-3">
          {recentPlans.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">কোনো পরিকল্পনা পাওয়া যায়নি।</p>
          ) : (
            recentPlans.map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div>
                  <p className="font-medium text-sm">{plan.title}</p>
                  <p className="text-xs text-muted-foreground">{plan.category} • শেষ তারিখ: {plan.deadline}</p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[plan.status]}`}>
                  {statusLabels[plan.status]}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
