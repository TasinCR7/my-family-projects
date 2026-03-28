import { motion } from 'framer-motion';
import { useVault } from '@/hooks/useSupabaseData';
import { Loader2, FileText, Download, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AddDocumentModal from '@/components/modals/AddDocumentModal';

export default function Vault() {
  const { documents, loading, refetch } = useVault();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 size={40} className="animate-spin text-primary opacity-20" />
        <p className="mt-4 text-sm text-muted-foreground">ডকুমেন্ট ভল্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">📁 ডকুমেন্ট ভল্ট</h1>
          <p className="text-muted-foreground text-sm mt-1">পরিবারের গোপনীয় ও গুরুত্বপূর্ণ নথিপত্র</p>
        </div>
        <div className="flex flex-col sm:flex-row items-end gap-3">
          <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-[10px] font-bold border border-success/20">
            <ShieldCheck size={14} /> এনক্রিপ্টেড সুরক্ষিত
          </div>
          <AddDocumentModal onSuccess={() => window.location.reload()} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.length === 0 ? (
          <div className="col-span-full bg-card rounded-xl border border-dashed p-20 text-center">
            <FileText size={48} className="mx-auto mb-4 opacity-10" />
            <p className="text-muted-foreground">ভল্টে এখন কোনো নথি নেই।</p>
          </div>
        ) : (
          documents.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{doc.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{doc.file_type} • {doc.file_size}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">আপলোড: {new Date(doc.uploaded_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted px-2 py-1 rounded">
                  {doc.access_level}
                </span>
                <Button variant="ghost" size="sm" className="h-8 text-primary hover:bg-primary/5" asChild>
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <Download size={14} className="mr-1.5" /> ডাউনলোড <ExternalLink size={10} className="ml-1 opacity-50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
