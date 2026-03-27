import { motion } from 'framer-motion';
import { expenses, familyMembers } from '@/data/mockData';

export default function Expenses() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const getMemberName = (id: string) => familyMembers.find(m => m.id === id)?.name || '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">💰 ব্যয় হিসাব</h1>
        <p className="text-muted-foreground text-sm mt-1">পরিবারের সকল খরচের বিবরণ</p>
      </div>

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
              {expenses.map((exp, i) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
