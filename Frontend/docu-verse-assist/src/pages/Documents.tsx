import { useState, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  Brain, 
  Sparkles,
  File,
  AlertCircle,
  CheckCircle,
  X,
  MessageSquare
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

interface UploadedFile {
  id: string;
  file: File;
  content: string;
  status: "processing" | "ready" | "error";
}

const Documents = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = [];

    for (const file of acceptedFiles) {
      const fileId = Date.now().toString() + Math.random().toString(36).substr(2, 9);
      
      try {
        const content = await readFileContent(file);
        newFiles.push({
          id: fileId,
          file,
          content,
          status: "ready"
        });
      } catch (error) {
        newFiles.push({
          id: fileId,
          file,
          content: "",
          status: "error"
        });
      }
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast({
      title: "Files Uploaded",
      description: `${newFiles.length} file(s) processed successfully.`,
    });
  }, [toast]);

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/markdown': ['.md'],
    },
    multiple: true
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleAnalyzeWithQuestion = async () => {
    if (!customQuestion.trim() || uploadedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please upload documents and enter your question.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const combinedContent = uploadedFiles
        .filter(file => file.status === "ready")
        .map(file => `Document: ${file.file.name}\n\n${file.content}`)
        .join("\n\n---\n\n");

      const prompt = `Based on the following document(s), please answer this question: "${customQuestion}"

Documents:
${combinedContent}

Please provide a comprehensive and well-structured answer based on the document content.`;

      const result = await aiService.generateChatResponse([{
        role: 'user',
        parts: [{ text: prompt }]
      }]);
      
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete!",
        description: "Your question has been answered based on the uploaded documents.",
      });
    } catch (error) {
      console.error('Document analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatAnalysisResult = (result: string) => {
    return result
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h3>')
      .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h2>')
      .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h1>')
      .replace(/^\s*[\*\-] (.*?)$/gm, '<li class="ml-4 mb-1 list-disc">$1</li>')
      .replace(/\n\n/g, '</p><p class="mb-3">')
      .replace(/^(?!<[hlp])/gm, '<p class="mb-3">')
      .replace(/(?<!>)$/gm, '</p>');
  };

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Upload className="w-8 h-8 text-ai-accent" />
            Smart Document Upload
          </h1>
          <p className="text-muted-foreground">
            Upload documents and ask specific questions to get AI-powered insights
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* File Upload Area */}
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-ai-accent" />
                  Upload Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-primary">Drop the files here...</p>
                  ) : (
                    <>
                      <p className="text-foreground font-medium mb-2">
                        Drop your documents here, or click to browse
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Supports PDF, DOC, DOCX, TXT, MD files
                      </p>
                    </>
                  )}
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium text-foreground">Uploaded Files:</h4>
                    {uploadedFiles.map((uploadedFile) => (
                      <div
                        key={uploadedFile.id}
                        className="flex items-center justify-between p-3 bg-accent/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <File className="w-4 h-4 text-ai-accent" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {uploadedFile.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(uploadedFile.file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {uploadedFile.status === "ready" && (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          )}
                          {uploadedFile.status === "error" && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadedFile.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Question Input */}
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-ai-accent" />
                  Your Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={customQuestion}
                    onChange={(e) => setCustomQuestion(e.target.value)}
                    placeholder="What would you like to know about these documents? e.g., 'Summarize the key points', 'What are the main risks mentioned?', 'Extract all dates and deadlines'..."
                    className="min-h-[120px] resize-none"
                  />
                  
                  <Button
                    onClick={handleAnalyzeWithQuestion}
                    disabled={isProcessing || !customQuestion.trim() || uploadedFiles.length === 0}
                    className="w-full bg-gradient-ai text-white"
                  >
                    {isProcessing ? (
                      <>
                        <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze Documents
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div>
            <Card className="bg-gradient-card border-border/50 shadow-soft h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-ai-accent" />
                  AI Analysis Results
                  <Badge variant="secondary" className="ml-2">
                    Smart AI
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isProcessing ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-ai-accent animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Analyzing your documents...</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        This may take a few moments
                      </p>
                    </div>
                  </div>
                ) : analysisResult ? (
                  <div className="max-h-96 overflow-y-auto">
                    <div 
                      className="prose prose-sm max-w-none bg-white dark:bg-gray-900 p-6 rounded-lg border"
                      dangerouslySetInnerHTML={{ __html: formatAnalysisResult(analysisResult) }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Upload documents and ask your question to get AI-powered insights
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Upload multiple documents
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Ask specific questions
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Get intelligent analysis
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Documents;