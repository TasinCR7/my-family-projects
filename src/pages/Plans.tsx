import { motion } from 'framer-motion';
import { useState } from 'react';
import PDFExportButton from '@/components/PDFExportButton';
import { usePlans, useMembers } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

const tabs = ['সব', 'বিচারাধীন', 'চলমান', 'সম্পন্ন'];
const tabMap: Record<string, string | null> = { 'সব': null, 'বিচারাধীন': 'pending', 'চলমান': 'in-progress', 'সম্পন্ন': 'completed' };

const statusColors: Record<string, string> = {
  'pending': 'bg-warning/20 text-warning',
  'in-progress': 'bg-info/20 text-info',
  'completed': 'bg-success/20 text-success',
  'failed': 'bg-destructive/20 text-destructive',
};
const statusLabels: Record<string, string> = {
  'pending': 'বিচারাধীন', 'in-progress': 'চলমান', 'completed': 'সম্পন্ন', 'failed': 'ব্যর্থ',
};

export default function Plans() {
  const [activeTab, setActiveTab] = useState('সব');
  const { plans, loading: plansLoading } = usePlans();
  const { members, loading: membersLoading } = useMembers();

  const loading = plansLoading || membersLoading;

  const filtered = tabMap[activeTab]
    ? plans.filter(p => p.status === tabMap[activeTab])
    : plans;

  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || 'অজানা';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">পরিকল্পনা লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">📋 পরিকল্পনা ও কার্য</h1>
          <p className="text-muted-foreground text-sm mt-1">পরিবারের সকল পরিকল্পনা এখানে</p>
        </div>
        <PDFExportButton targetId="plans-report" fileName="Family_Plans" title="পরিকল্পনা ও কার্য" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Plans List */}
      <div id="plans-report" className="space-y-3 bg-background p-2">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground bg-card rounded-xl border border-dashed">
            এই ক্যাটাগরিতে কোনো পরিকল্পনা পাওয়া যায়নি।
          </div>
        ) : (
          filtered.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    দায়িত্বে: <span className="font-medium text-card-foreground">{getMemberName(plan.assignedTo)}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    শুরু: {plan.startDate} → শেষ: {plan.deadline} • {plan.category}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[plan.status]}`}>
                  {statusLabels[plan.status]}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
