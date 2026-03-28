import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsertData } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';

interface AddMemberModalProps {
  onSuccess: () => void;
}

export default function AddMemberModal({ onSuccess }: AddMemberModalProps) {
  const [open, setOpen] = useState(false);
  const { insertData, isInserting } = useInsertData('members');
  
  const [formData, setFormData] = useState({
    name: '',
    name_en: '',
    relation: '',
    birth_year: '',
    phone: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.relation) {
      toast.error('নাম এবং সম্পর্ক অবশ্যই পূরণ করতে হবে!');
      return;
    }

    const { success, error } = await insertData({
      ...formData,
      score: 0
    });

    if (success) {
      toast.success('সদস্য সফলভাবে যোগ করা হয়েছে!');
      setOpen(false);
      onSuccess(); // Refresh the list
    } else {
      toast.error('সদস্য যোগ করতে সমস্যা হয়েছে: ' + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ সদস্য যোগ করুন</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন সদস্য যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="name">বাংলা নাম</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="উদাঃ আব্দুর রহমান" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name_en">ইংরেজি নাম</Label>
            <Input id="name_en" name="name_en" value={formData.name_en} onChange={handleChange} placeholder="e.g. Abdur Rahman" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="relation">সম্পর্ক</Label>
            <select
              id="relation"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            >
              <option value="">নির্বাচন করুন</option>
              <option value="পিতা">পিতা</option>
              <option value="মাতা">মাতা</option>
              <option value="ভাই">ভাই</option>
              <option value="বোন">বোন</option>
              <option value="ছেলে">ছেলে</option>
              <option value="মেয়ে">মেয়ে</option>
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="birth_year">জন্ম সাল</Label>
              <Input id="birth_year" name="birth_year" type="number" value={formData.birth_year} onChange={handleChange} placeholder="1990" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">মোবাইল নম্বর</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="017..." />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">ইমেইল</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" />
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
