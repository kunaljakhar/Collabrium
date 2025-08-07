import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Scale, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { aiService } from "@/services/aiService";

const ContractReview = () => {
  const [contractText, setContractText] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleReview = async () => {
    if (!contractText.trim()) {
      toast({
        title: "Missing Contract",
        description: "Please provide contract text to review.",
        variant: "destructive",
      });
      return;
    }

    setIsReviewing(true);
    
    try {
      const result = await aiService.reviewContract(contractText);
      setReviewResult(result);
      
      toast({
        title: "Review Complete!",
        description: "Your contract has been analyzed successfully.",
      });
    } catch (error) {
      console.error('Contract review error:', error);
      toast({
        title: "Review Failed",
        description: "Failed to review contract. Please check your API configuration and try again.",
        variant: "destructive",
      });
    } finally {
      setIsReviewing(false);
    }
  };

  const keyAreas = [
    {
      icon: DollarSign,
      title: "Payment Terms",
      description: "Payment schedules, amounts, and conditions"
    },
    {
      icon: Clock,
      title: "Duration & Deadlines",
      description: "Contract timeline and key dates"
    },
    {
      icon: Shield,
      title: "Liability & Risk",
      description: "Risk allocation and liability clauses"
    },
    {
      icon: AlertTriangle,
      title: "Potential Issues",
      description: "Red flags and areas of concern"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Scale className="w-8 h-8 text-ai-accent" />
            Contract Reviewer
          </h1>
          <p className="text-muted-foreground">
            AI-powered legal contract analysis and risk assessment
          </p>
        </div>

        {/* Key Areas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {keyAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Card key={index} className="bg-gradient-card border-border/50 shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-ai-accent/10 text-ai-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">{area.title}</h3>
                      <p className="text-xs text-muted-foreground">{area.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Contract Input */}
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-ai-accent" />
                Contract Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Paste your contract content here for AI-powered legal analysis..."
                  className="min-h-[400px] resize-none"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {contractText.length} characters
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {Math.ceil(contractText.length / 500)} pages (est.)
                    </Badge>
                  </div>
                  
                  <Button
                    onClick={handleReview}
                    disabled={isReviewing || !contractText.trim()}
                    className="bg-gradient-ai text-white"
                  >
                    {isReviewing ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Reviewing...
                      </>
                    ) : (
                      <>
                        <Scale className="w-4 h-4 mr-2" />
                        Review Contract
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Results */}
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai-accent" />
                Legal Analysis
                <Badge variant="secondary" className="ml-2">
                  AI-Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isReviewing ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Brain className="w-8 h-8 text-ai-accent animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Analyzing contract...</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      This may take a few moments for comprehensive analysis
                    </p>
                  </div>
                </div>
              ) : reviewResult ? (
                <div className="prose prose-sm max-w-none">
                  <div className="bg-accent/30 p-4 rounded-lg max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {reviewResult}
                    </pre>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Legal Disclaimer</h4>
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          This AI analysis is for informational purposes only and should not replace professional legal advice. 
                          Please consult with a qualified attorney for legal decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Scale className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Paste your contract content to get started with AI legal analysis
                    </p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Key terms identification
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Risk assessment
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Clause analysis
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContractReview; 