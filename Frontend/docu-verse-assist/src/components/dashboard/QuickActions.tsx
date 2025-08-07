import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Upload, 
  MessageSquare, 
  FileSearch, 
  Scale, 
  Sparkles,
  Brain,
  ArrowRight 
} from "lucide-react";

const actions = [
  {
    id: 1,
    title: "Smart Upload",
    description: "Upload documents with custom questions",
    icon: Upload,
    color: "bg-gradient-to-r from-blue-500 to-blue-600",
    route: "/documents"
  },
  {
    id: 2,
    title: "AI Assistant",
    description: "Chat with intelligent AI powered",
    icon: MessageSquare,
    color: "bg-gradient-to-r from-purple-500 to-purple-600",
    route: "/chat"
  },
  {
    id: 3,
    title: "Document Analyzer",
    description: "Analyze documents with AI insights",
    icon: FileSearch,
    color: "bg-gradient-to-r from-green-500 to-green-600",
    route: "/analyzer"
  },
  {
    id: 4,
    title: "Contract Review",
    description: "Legal document analysis and risk assessment",
    icon: Scale,
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    route: "/contract-review"
  },
  {
    id: 5,
    title: "Content Generator",
    description: "Generate professional documents with AI",
    icon: Sparkles,
    color: "bg-gradient-to-r from-pink-500 to-pink-600",
    route: "/generator"
  },
  {
    id: 6,
    title: "AI Insights",
    description: "Get intelligent insights and recommendations",
    icon: Brain,
    color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    route: "/ai-insights"
  }
];

export function QuickActions() {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI-Powered Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-3 group hover:shadow-soft transition-all duration-200"
              asChild
            >
              <Link to={action.route}>
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center shadow-lg`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {action.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}