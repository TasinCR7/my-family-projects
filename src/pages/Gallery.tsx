import { motion } from 'framer-motion';
import { useGallery } from '@/hooks/useSupabaseData';
import { Loader2, Image as ImageIcon } from 'lucide-react';

export default function Gallery() {
  const { images, loading } = useGallery();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">গ্যালারি লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">🖼️ স্মৃতি ও গ্যালারি</h1>
        <p className="text-muted-foreground text-sm mt-1">আমাদের পরিবারের সোনালী মুহূর্তগুলো</p>
      </div>

      {images.length === 0 ? (
        <div className="bg-card rounded-xl border border-dashed p-20 text-center">
          <ImageIcon size={48} className="mx-auto mb-4 opacity-10" />
          <p className="text-muted-foreground">এখনো কোনো ছবি আপলোড করা হয়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden group hover:shadow-lg transition-all"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img 
                  src={img.image_url} 
                  alt={img.title} 
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{img.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{img.category} • {new Date(img.uploaded_at).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
