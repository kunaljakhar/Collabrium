import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  FileSearch, 
  Upload, 
  Sparkles,
  FileText,
  AlertCircle,
  CheckCircle,
  Brain,
  Eye,
  Maximize2,
  Copy,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

const analysisTypes = [
  {
    id: "general",
    title: "General Analysis",
    description: "Comprehensive document overview and key insights",
    icon: FileText,
    color: "bg-primary"
  },
  {
    id: "legal",
    title: "Legal Review",
    description: "Legal terms, clauses, and compliance analysis",
    icon: AlertCircle,
    color: "bg-warning"
  },
  {
    id: "financial",
    title: "Financial Analysis",
    description: "Numbers, costs, and financial implications",
    icon: CheckCircle,
    color: "bg-success"
  },
  {
    id: "risk",
    title: "Risk Assessment",
    description: "Potential risks and mitigation strategies",
    icon: AlertCircle,
    color: "bg-destructive"
  }
];

const DocumentAnalyzer = () => {
  const [documentText, setDocumentText] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to format the AI response with proper syntax
  const formatAnalysisResult = (result: string) => {
    return result
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic text
      .replace(/### (.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-foreground">$1</h3>') // H3 headers
      .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h2>') // H2 headers
      .replace(/# (.*?)$/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-foreground">$1</h1>') // H1 headers
      .replace(/^\s*\* (.*?)$/gm, '<li class="ml-4 mb-1">• $1</li>') // Bullet points
      .replace(/^\s*- (.*?)$/gm, '<li class="ml-4 mb-1">• $1</li>') // Bullet points
      .replace(/\n\n/g, '</p><p class="mb-3">') // Paragraphs
      .replace(/^(?!<[h|l|p])/gm, '<p class="mb-3">') // Start paragraphs
      .replace(/(?<!>)$/gm, '</p>'); // End paragraphs
  };

  const copyToClipboard = () => {
    if (analysisResult) {
      navigator.clipboard.writeText(analysisResult);
      toast({
        title: "Copied!",
        description: "Analysis result copied to clipboard.",
      });
    }
  };

  const downloadAnalysis = () => {
    if (analysisResult) {
      const blob = new Blob([analysisResult], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document-analysis-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({
        title: "Downloaded!",
        description: "Analysis result downloaded successfully.",
      });
    }
  };

  const handleAnalyze = async () => {
    if (!documentText.trim() || !selectedAnalysis) {
      toast({
        title: "Missing Information",
        description: "Please provide document text and select an analysis type.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const result = await aiService.analyzeDocument(documentText, selectedAnalysis);
      setAnalysisResult(result);
      
      toast({
        title: "Analysis Complete!",
        description: "Your document has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze document. Please check your API configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const selectedType = analysisTypes.find(type => type.id === selectedAnalysis);

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <FileSearch className="w-8 h-8 text-ai-accent" />
            Document Analyzer
          </h1>
          <p className="text-muted-foreground">
            Upload or paste your document content and get AI-powered insights and analysis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Analysis Type Selection */}
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-ai-accent" />
                  Analysis Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {analysisTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedAnalysis === type.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50 hover:bg-accent/50"
                        }`}
                        onClick={() => setSelectedAnalysis(type.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${type.color} text-white`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{type.title}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Document Input */}
            <Card className="bg-gradient-card border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-ai-accent" />
                  Document Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={documentText}
                    onChange={(e) => setDocumentText(e.target.value)}
                    placeholder="Paste your document content here or upload a file..."
                    className="min-h-[300px] resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {documentText.length} characters
                    </Badge>
                    
                    <Button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !documentText.trim() || !selectedAnalysis}
                      className="bg-gradient-ai text-white"
                    >
                      {isAnalyzing ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <FileSearch className="w-4 h-4 mr-2" />
                          Analyze Document
                        </>
                      )}
                    </Button>
                  </div>
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
                  Analysis Results
                  {selectedType && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedType.title}
                    </Badge>
                  )}
                  {analysisResult && (
                    <div className="ml-auto flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadAnalysis}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                      <Sparkles className="w-8 h-8 text-ai-accent animate-spin mx-auto mb-4" />
                      <p className="text-muted-foreground">Analyzing your document...</p>
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
                      <FileSearch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Select an analysis type and provide document content to get started
                      </p>
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

export default DocumentAnalyzer; 