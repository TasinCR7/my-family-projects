import { motion } from 'framer-motion';
import { useEvents } from '@/hooks/useSupabaseData';
import { Loader2, Calendar, MapPin, Clock, Users, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Events() {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">ইভেন্ট ক্যালেন্ডার লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">📅 পারিবারিক ইভেন্ট</h1>
          <p className="text-muted-foreground text-sm mt-1">আমাদের আসন্ন সকল পারিবারিক অনুষ্ঠান</p>
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Bell size={16} /> রিমাইন্ডার সেট করুন
        </Button>
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="bg-card rounded-xl border border-dashed p-20 text-center">
            <Calendar size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">আসন্ন কোনো ইভেন্ট পাওয়া যায়নি।</p>
          </div>
        ) : (
          events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all flex flex-col md:flex-row gap-6 relative"
            >
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary/10 text-primary min-w-[100px] border border-primary/20">
                <span className="text-3xl font-black">{event.date?.split(' ')[0] || '??'}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{event.date?.split(' ')[1] || 'মাস'}</span>
                <span className="text-[10px] opacity-60 mt-1">{event.date?.split(' ')[2] || 'সাল'}</span>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {event.type || 'পারিবারিক'}
                  </span>
                  {event.reminder && <span className="text-success text-[10px] font-bold flex items-center gap-1"><Bell size={10} /> রিমাইন্ডার চালু</span>}
                </div>
                
                <h3 className="text-xl font-bold text-card-foreground">{event.title}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-primary" />
                    <span>সময়: {event.time || 'নির্ধারিত নয়'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gold" />
                    <span>স্থান: {event.location || 'নির্ধারিত নয়'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-info" />
                    <span>অংশগ্রহণকারী: {event.attendees || 0} জন</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-end justify-end">
                <Button size="sm" className="h-9 px-6 font-bold shadow-lg shadow-primary/20">
                  বিস্তারিত
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
