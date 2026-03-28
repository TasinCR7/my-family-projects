import { Outlet } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import { Bell, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function AppLayout() {
  const { user, signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('সফলভাবে লগআউট করা হয়েছে।');
    } catch (error) {
      toast.error('লগআউট করতে সমস্যা হয়েছে।');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="ml-[260px] transition-all duration-300">
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
              <Bell size={20} className="text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-sm">
                {user?.email?.[0].toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium leading-none">{user?.email?.split('@')[0] || 'User'}</p>
                <p className="text-[10px] text-muted-foreground mt-1">ফ্যামিলি মেম্বার</p>
              </div>
              <button 
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all group"
                title="লগআউট"
              >
                <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
