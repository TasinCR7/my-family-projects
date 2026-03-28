import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsertData, useMembers } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';

interface AddExpenseModalProps {
  onSuccess: () => void;
}

export default function AddExpenseModal({ onSuccess }: AddExpenseModalProps) {
  const [open, setOpen] = useState(false);
  const { insertData, isInserting } = useInsertData('expenses');
  const { members } = useMembers(); // To select who paid

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'বাজার',
    date: new Date().toISOString().split('T')[0],
    member_id: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      toast.error('বিবরণ এবং পরিমাণ পূরণ করুন!');
      return;
    }

    const { success, error } = await insertData(formData);

    if (success) {
      toast.success('খরচ সফলভাবে যোগ করা হয়েছে!');
      setOpen(false);
      onSuccess();
    } else {
      toast.error('খরচ যোগ করতে সমস্যা হয়েছে: ' + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ খরচ যোগ করুন</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন খরচ যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="description">বিবরণ</Label>
            <Input id="description" name="description" value={formData.description} onChange={handleChange} placeholder="যেমন: মাসিক বাজার" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">টাকার পরিমাণ (৳)</Label>
            <Input id="amount" name="amount" type="number" value={formData.amount} onChange={handleChange} placeholder="1000" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">ক্যাটাগরি</Label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="বাজার">বাজার</option>
              <option value="চিকিৎসা">চিকিৎসা</option>
              <option value="বসবাস">বসবাস</option>
              <option value="শিক্ষা">শিক্ষা</option>
              <option value="জমিজমা">জমিজমা</option>
              <option value="বিবিধ">বিবিধ</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">তারিখ</Label>
            <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="member_id">কে প্রদান করেছেন?</Label>
            <select
              id="member_id"
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">নির্বাচন করুন (ঐচ্ছিক)</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>{member.name}</option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>বাতিল</Button>
            <Button type="submit" disabled={isInserting}>
              {isInserting ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
