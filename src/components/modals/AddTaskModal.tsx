import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsertData, useMembers } from '@/hooks/useSupabaseData';
import { toast } from 'sonner';

interface AddTaskModalProps {
  onSuccess: () => void;
}

export default function AddTaskModal({ onSuccess }: AddTaskModalProps) {
  const [open, setOpen] = useState(false);
  const { insertData, isInserting } = useInsertData('tasks');
  const { members } = useMembers(); 

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    member_id: '',
    priority: 'মাঝারি',
    status: 'চলমান',
    deadline: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error('টাস্কের শিরোনাম পূরণ করুন!');
      return;
    }

    const { success, error } = await insertData(formData);

    if (success) {
      toast.success('টাস্ক সফলভাবে যোগ করা হয়েছে!');
      setOpen(false);
      onSuccess();
    } else {
      toast.error('টাস্ক যোগ করতে সমস্যা হয়েছে: ' + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>+ নতুন টাস্ক যোগ করুন</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন কাজ (Task) যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">কাজের শিরোনাম</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} placeholder="উদাঃ জমি রেজিস্ট্রেশন" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="member_id">কাকে এসাইন করবেন?</Label>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="priority">প্রায়োরিটি</Label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="উচ্চ">উচ্চ (High)</option>
                <option value="মাঝারি">মাঝারি (Medium)</option>
                <option value="নিম্ন">নিম্ন (Low)</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">স্ট্যাটাস</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="অপেক্ষমান">অপেক্ষমান</option>
                <option value="চলমান">চলমান</option>
                <option value="সম্পন্ন">সম্পন্ন</option>
              </select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">ডেডলাইন (শেষ তারিখ)</Label>
            <Input id="deadline" name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
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
