import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMembers, usePlans } from '@/hooks/useSupabaseData';
import { Loader2 } from 'lucide-react';

export function SuccessPieChart() {
  const { plans, loading } = usePlans();

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 h-[350px] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary opacity-20 mb-2" />
        <p className="text-xs text-muted-foreground">সাফল্য যাচাই হচ্ছে...</p>
      </div>
    );
  }

  const successful = plans.filter(p => p.status === 'completed').length;
  const pending = plans.filter(p => p.status !== 'completed').length;

  const pieData = [
    { name: 'সম্পন্ন', value: successful, color: 'hsl(145, 45%, 28%)' },
    { name: 'বাকি', value: pending, color: 'hsl(42, 70%, 55%)' },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-5 h-[350px]">
      <h3 className="font-semibold mb-4 text-sm">সাফল্য বনাম বাকি</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {pieData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 mt-4">
        {pieData.map((d, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-xs text-muted-foreground">{d.name}</span>
            </div>
            <span className="text-xs font-bold">{d.value} টি</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PerformanceBarChart() {
  const { members, loading } = useMembers();

  if (loading) {
    return (
      <div className="bg-card rounded-xl border border-border p-5 h-[350px] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-primary opacity-20 mb-2" />
        <p className="text-xs text-muted-foreground">পারফরম্যান্স লোড হচ্ছে...</p>
      </div>
    );
  }

  const barData = members.map(m => ({
    name: m.name.split(' ')[0],
    সাফল্য: m.successRate,
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-5 h-[350px]">
      <h3 className="font-semibold mb-4 text-sm">সদস্য পারফরম্যান্স (%)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 20%, 88%)" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
          <Tooltip cursor={{ fill: 'transparent' }} />
          <Bar dataKey="সাফল্য" fill="hsl(145, 45%, 28%)" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
