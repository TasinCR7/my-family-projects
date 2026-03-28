import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "sonner";

interface PDFExportButtonProps {
  targetId: string;
  fileName: string;
  title: string;
}

export default function PDFExportButton({ targetId, fileName, title }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    const element = document.getElementById(targetId);
    if (!element) {
      toast.error("রপ্তানি করার জন্য প্রয়োজনীয় তথ্য পাওয়া যায়নি।");
      return;
    }

    setIsExporting(true);
    toast.info("PDF তৈরি হচ্ছে, দয়া করে অপেক্ষা করুন...");

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
      
      toast.success(`${title} সফলভাবে ডাউনলোড হয়েছে।`);
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("PDF তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={exportPDF} 
      disabled={isExporting}
      className="flex items-center gap-2"
    >
      {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
      {isExporting ? "প্রক্রিয়াধীন..." : "PDF ডাউনলোড"}
    </Button>
  );
}
