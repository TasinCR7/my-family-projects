import { motion } from 'framer-motion';
import PDFExportButton from '@/components/PDFExportButton';
import { useExpenses, useMembers } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';
import AddExpenseModal from '@/components/modals/AddExpenseModal';

export default function Expenses() {
  const { expenses, loading: expensesLoading, refetch } = useExpenses();
  const { members, loading: membersLoading } = useMembers();

  const loading = expensesLoading || membersLoading;
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const getMemberName = (id: string) => members.find(m => m.id === id)?.name || 'অজানা';

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">ব্যয় বিবরণী লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">💰 ব্যয় হিসাব</h1>
          <p className="text-muted-foreground text-sm mt-1">পরিবারের সকল খরচের বিবরণ</p>
        </div>
        <div className="flex items-center gap-2">
          <AddExpenseModal onSuccess={refetch} />
          <PDFExportButton targetId="expenses-report" fileName="Family_Expenses" title="ব্যয় হিসাব" />
        </div>
      </div>

      <div id="expenses-report" className="space-y-6 bg-background p-4 rounded-xl border border-transparent">
        {/* Summary */}
        <div className="bg-card rounded-xl border border-border p-5">
          <p className="text-sm text-muted-foreground">মোট ব্যয়</p>
          <p className="text-3xl font-bold mt-1">৳{total.toLocaleString('bn-BD')}</p>
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">বিবরণ</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">ক্যাটাগরি</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">প্রদানকারী</th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">তারিখ</th>
                  <th className="text-right p-4 text-sm font-medium text-muted-foreground">পরিমাণ</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-10 text-center text-muted-foreground">কোনো খরচের বিবরণ পাওয়া যায়নি।</td>
                  </tr>
                ) : (
                  expenses.map((exp, i) => (
                    <motion.tr
                      key={exp.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 text-sm font-medium">{exp.description}</td>
                      <td className="p-4 text-sm text-muted-foreground">{exp.category}</td>
                      <td className="p-4 text-sm text-muted-foreground">{getMemberName(exp.paidBy)}</td>
                      <td className="p-4 text-sm text-muted-foreground">{exp.date}</td>
                      <td className="p-4 text-sm font-semibold text-right">৳{exp.amount.toLocaleString()}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
