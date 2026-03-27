import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

export default function ComingSoon({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mb-4">
        <Construction size={36} className="text-primary-foreground" />
      </div>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground">এই বিভাগটি শীঘ্রই আসছে। অনুগ্রহ করে অপেক্ষা করুন।</p>
    </motion.div>
  );
}
