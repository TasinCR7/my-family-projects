import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, ClipboardList, TrendingUp, Wallet,
  MapPin, TreePine, Image, Calendar, FolderLock, Megaphone,
  Vote, Bell, ChevronLeft, ChevronRight, Moon, Sun
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', path: '/' },
  { icon: Users, label: 'পরিবারের সদস্য', path: '/members' },
  { icon: ClipboardList, label: 'পরিকল্পনা', path: '/plans' },
  { icon: TrendingUp, label: 'সাফল্য ট্র্যাকার', path: '/success' },
  { icon: Wallet, label: 'ব্যয় হিসাব', path: '/expenses' },
  { icon: MapPin, label: 'জমি ব্যবস্থাপনা', path: '/land' },
  { icon: TreePine, label: 'পারিবারিক বৃক্ষ', path: '/family-tree' },
  { icon: Image, label: 'স্মৃতি ও গ্যালারি', path: '/gallery' },
  { icon: Calendar, label: 'ইভেন্ট', path: '/events' },
  { icon: FolderLock, label: 'ডকুমেন্ট ভল্ট', path: '/documents' },
  { icon: Megaphone, label: 'নোটিশ বোর্ড', path: '/notices' },
  { icon: Vote, label: 'ভোটিং', path: '/voting' },
];

export default function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar text-sidebar-foreground z-50 flex flex-col border-r border-sidebar-border shadow-xl"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-sidebar-border min-h-[72px]">
        <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-sidebar-primary-foreground font-bold text-lg shrink-0">
          গ
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <h1 className="text-sm font-bold leading-tight">গফুর পরিবার</h1>
              <p className="text-xs text-sidebar-foreground/60">পোর্টাল</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-sidebar-primary"
                />
              )}
              <item.icon size={20} className="shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <button
          onClick={toggleDark}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 w-full transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          {!collapsed && <span className="text-sm">{darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 w-full transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span className="text-sm">সংকুচিত</span>}
        </button>
      </div>
    </motion.aside>
  );
}
