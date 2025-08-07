import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Eye,
  Download,
  Copy,
  Maximize2,
  X
} from "lucide-react";
import { type Document } from "@/data/documentsData";
import { useToast } from "@/hooks/use-toast";

interface DocumentViewerProps {
  document: Document;
  children: React.ReactNode;
}

export function DocumentViewer({ document, children }: DocumentViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${document.title}</title>
          <meta charset="UTF-8">
          <style>
            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${document.htmlContent || `<h1>${document.title}</h1><p>No content available</p>`}
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.toLowerCase().replace(/\s+/g, '-')}.html`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Document downloaded successfully as HTML file.",
    });
  };

  const handleCopy = () => {
    const textContent = document.htmlContent?.replace(/<[^>]*>/g, '') || document.title;
    navigator.clipboard.writeText(textContent);
    toast({
      title: "Copied!",
      description: "Document content copied to clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex-1">
            <DialogTitle className="text-xl font-bold">{document.title}</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{document.type}</Badge>
              <Badge 
                className={
                  document.status === 'Completed' || document.status === 'Processed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : document.status === 'Analyzing' 
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }
              >
                {document.status}
              </Badge>
              <Badge variant="outline">AI: {document.aiConfidence}%</Badge>
              <Badge variant="outline">{document.size}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 rounded-lg border max-h-[70vh]">
          {document.htmlContent ? (
            <div 
              className="p-4"
              dangerouslySetInnerHTML={{ __html: document.htmlContent }}
            />
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <Eye className="w-16 h-16 mx-auto mb-4" />
              <p>No content available for this document.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 