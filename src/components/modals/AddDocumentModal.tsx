import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpload } from '@/hooks/useUpload';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { FileUp, FileText, Loader2 } from 'lucide-react';

interface AddDocumentModalProps {
  onSuccess: () => void;
}

export default function AddDocumentModal({ onSuccess }: AddDocumentModalProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { uploadFile, isUploading } = useUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docName, setDocName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docName) {
        setDocName(file.name.split('.')[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !docName) {
      toast.error('নথির নাম এবং ফাইল নির্বাচন করুন!');
      return;
    }

    setIsSaving(true);
    try {
      const uploadResult = await uploadFile(selectedFile, 'vault');
      if (!uploadResult.success) throw new Error(uploadResult.error);

      const { error } = await supabase.from('vault').insert([{
        document_name: docName,
        document_url: uploadResult.url,
        file_type: selectedFile.type.split('/')[1]?.toUpperCase() || 'FILE',
        file_size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB'
      }]);

      if (error) throw error;

      toast.success('নথি সফলভাবে ভল্টে জমা হয়েছে!');
      setOpen(false);
      onSuccess();
      setSelectedFile(null);
      setDocName('');
    } catch (error: any) {
      console.error('Error saving document:', error);
      toast.error('নথি সংরক্ষণ করতে সমস্যা হয়েছে: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-gold text-white font-bold">
          <FileUp size={18} className="mr-2" /> নতুন নথি যোগ
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ডকুমেন্ট ভল্টে নথি যোগ</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="docName">নথির নাম</Label>
            <Input 
              id="docName" 
              value={docName} 
              onChange={(e) => setDocName(e.target.value)} 
              placeholder="উদাঃ আব্বুর এনআইডি, জমির খতিয়ান" 
              required 
            />
          </div>
          
          <div className="grid gap-2">
            <Label>ফাইল নির্বাচন করুন</Label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />
              {selectedFile ? (
                <div className="flex flex-col items-center text-success gap-1">
                  <FileText size={32} />
                  <span className="text-sm font-medium truncate max-w-[250px]">{selectedFile.name}</span>
                  <span className="text-[10px] opacity-70">{(selectedFile.size / 1024).toFixed(0)} KB</span>
                </div>
              ) : (
                <div className="text-muted-foreground flex flex-col items-center">
                  <FileUp size={32} className="mb-2 opacity-50" />
                  <span className="text-sm">এখানে ক্লিক করে ফাইল সিলেক্ট করুন</span>
                  <span className="text-[10px] mt-1">PDF, JPG, PNG ইত্যাদি</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>বাতিল</Button>
            <Button type="submit" disabled={isUploading || isSaving}>
              {isUploading || isSaving ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" /> আপলোড হচ্ছে...
                </>
              ) : 'ভল্টে সংরক্ষণ করুন'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
