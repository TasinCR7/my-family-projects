import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInsertData } from '@/hooks/useSupabaseData';
import { useUpload } from '@/hooks/useUpload';
import { toast } from 'sonner';
import { FileUp, FileText } from 'lucide-react';

interface AddLandRecordModalProps {
  onSuccess: () => void;
}

export default function AddLandRecordModal({ onSuccess }: AddLandRecordModalProps) {
  const [open, setOpen] = useState(false);
  const { insertData, isInserting } = useInsertData('land_records');
  const { uploadFile, isUploading } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    location: '',
    mouza: '',
    dag_no: '',
    area: '',
    value: '',
    status: 'চলমান',
    document_url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.location) {
      toast.error('জমির অবস্থান পূরণ করুন!');
      return;
    }

    let currentFormData = { ...formData };

    if (selectedFile) {
      const uploadResult = await uploadFile(selectedFile);
      if (uploadResult.success) {
        currentFormData.document_url = uploadResult.url;
      } else {
        return; // Stop if upload fails
      }
    }

    const { success, error } = await insertData(currentFormData);

    if (success) {
      toast.success('জমির তথ্য ও দলিল সফলভাবে যোগ করা হয়েছে!');
      setOpen(false);
      onSuccess();
      setSelectedFile(null);
      setFormData({
        location: '',
        mouza: '',
        dag_no: '',
        area: '',
        value: '',
        status: 'চলমান',
        document_url: ''
      });
    } else {
      toast.error('জমির তথ্য যোগ করতে সমস্যা হয়েছে: ' + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-emerald text-white">
          <FileUp size={18} className="mr-2" /> জমির তথ্য ও দলিল যোগ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন জমির তথ্য ও দলিল</DialogTitle>
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
          
          <div className="grid gap-2">
            <Label>জমির দলিল (PDF/Image)</Label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*,.pdf"
              />
              {selectedFile ? (
                <div className="flex items-center justify-center text-success gap-2">
                  <FileText size={20} />
                  <span className="text-sm font-medium truncate max-w-[200px]">{selectedFile.name}</span>
                </div>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center">
                  <FileUp size={24} className="mb-1 opacity-50" />
                  <span className="text-xs">দলিল ফাইল নির্বাচন করুন (PDF/Image)</span>
                </div>
              )}
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
            <Button type="submit" disabled={isInserting || isUploading}>
              {isInserting || isUploading ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
