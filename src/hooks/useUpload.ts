import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async (file: File, bucket: string = 'land_records') => {
    setIsUploading(true);
    try {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return { success: true, url: publicUrl, name: file.name };
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast.error('ফাইল আপলোড করতে সমস্যা হয়েছে: ' + error.message);
      return { success: false, error: error.message };
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadFile, isUploading };
}
