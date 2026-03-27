import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  suffix?: string;
  gradient?: 'gold' | 'emerald' | 'info' | 'accent';
  delay?: number;
}

const gradientMap = {
  gold: 'gradient-gold',
  emerald: 'gradient-emerald',
  info: 'bg-info',
  accent: 'bg-accent',
};

export default function StatCard({ icon: Icon, label, value, suffix, gradient = 'emerald', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-2xl font-bold text-card-foreground">
            {value}
            {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
          </p>
        </div>
        <div className={`w-11 h-11 rounded-xl ${gradientMap[gradient]} flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon size={20} className="text-primary-foreground" />
        </div>
      </div>
    </motion.div>
  );
}
