import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsertData } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';

interface AddLandRecordModalProps {
  onSuccess: () => void;
}

export default function AddLandRecordModal({ onSuccess }: AddLandRecordModalProps) {
  const [open, setOpen] = useState(false);
  const { insertData, isInserting } = useInsertData('land_records');

  const [formData, setFormData] = useState({
    location: '',
    mouza: '',
    dag_no: '',
    area: '',
    value: '',
    status: 'চলমান'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      toast.error('জমির অবস্থান পূরণ করুন!');
      return;
    }

    const { success, error } = await insertData(formData);

    if (success) {
      toast.success('জমির তথ্য সফলভাবে যোগ করা হয়েছে!');
      setOpen(false);
      onSuccess();
    } else {
      toast.error('জমির তথ্য যোগ করতে সমস্যা হয়েছে: ' + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ জমির তথ্য যোগ করুন</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন জমির তথ্য যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="location">জমির অবস্থান/ঠিকানা</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="উদাঃ চন্দনাইশ, চট্টগ্রাম" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
               <Label htmlFor="mouza">মৌজা</Label>
               <Input id="mouza" name="mouza" value={formData.mouza} onChange={handleChange} placeholder="মৌজার নাম" />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="dag_no">দাগ নং / খতিয়ান</Label>
               <Input id="dag_no" name="dag_no" value={formData.dag_no} onChange={handleChange} placeholder="দাগ নম্বর" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
               <Label htmlFor="area">জমির পরিমাণ</Label>
               <Input id="area" name="area" value={formData.area} onChange={handleChange} placeholder="উদাঃ ৫ শতক" />
            </div>
            <div className="grid gap-2">
               <Label htmlFor="value">আনুমানিক মূল্য (৳)</Label>
               <Input id="value" name="value" type="number" value={formData.value} onChange={handleChange} placeholder="500000" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">বর্তমান স্ট্যাটাস</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="নিষ্পত্তি">নিষ্পত্তি (সমাধান হয়েছে)</option>
              <option value="চলমান">চলমান (প্রসেসিং)</option>
              <option value="আংশিক">আংশিক (কিছু বাকি)</option>
              <option value="মামলা">মামলা চলছে</option>
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
