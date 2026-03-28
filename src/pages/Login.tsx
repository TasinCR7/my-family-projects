import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success('রেজিস্ট্রেশন সফল হয়েছে! দয়া করে আপনার ইমেইল চেক করুন।');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success('লগইন সফল হয়েছে!');
        navigate(from, { replace: true });
      }
    } catch (error: any) {
      toast.error(error.message || 'অথেনটিকেশন সমস্যা হয়েছে!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/50 to-primary/10 relative overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-[-100px] left-[-100px] w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-4 backdrop-blur-xl border border-primary/20 shadow-xl overflow-hidden"
          >
            <img src="/favicon.png" alt="Gafur Family Logo" className="w-full h-full object-cover" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            অমদের ফ্যামিলি হাব
          </h1>
          <p className="text-muted-foreground mt-2">পারিবারিক পোর্টালের স্বাগতম</p>
        </div>

        <Card className="backdrop-blur-xl bg-card/60 border-primary/20 shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none" />
          
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              {isSignUp ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
            </CardTitle>
            <CardDescription className="text-center">
              আপনার ইমেইল এবং পাসওয়ার্ড ব্যবহার করুন
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleAuth}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">ইমেইল ঠিকানা</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@family.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-background/50 border-primary/10 focus:border-primary/40 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  {!isSignUp && (
                    <button type="button" className="text-xs text-primary hover:underline">
                      পাসওয়ার্ড ভুলে গেছেন?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-background/50 border-primary/10 focus:border-primary/40 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full h-11 relative group overflow-hidden transition-all duration-300" 
                disabled={loading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-10 transition-opacity" />
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {isSignUp ? 'রেজিস্ট্রেশন করুন' : 'প্রবেশ করুন'}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              <div className="text-sm text-center text-muted-foreground">
                {isSignUp ? 'ইতিমধ্যে অ্যাকাউন্ট আছে?' : 'অ্যাকাউন্ট নেই?'}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-1 text-primary font-medium hover:underline inline-flex items-center gap-1 transition-colors"
                >
                  {isSignUp ? 'লগইন করুন' : 'রেজিস্ট্রেশন করুন'}
                  {isSignUp ? <LogIn size={14} /> : <UserPlus size={14} />}
                </button>
              </div>
            </CardFooter>
          </form>
        </Card>

        {/* Branding/Footer */}
        <p className="mt-8 text-center text-xs text-muted-foreground opacity-50 tracking-widest uppercase">
          Marhum Majliss Suite &bull; {new Date().getFullYear()}
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
