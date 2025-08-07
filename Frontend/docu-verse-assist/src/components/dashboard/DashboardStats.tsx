import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Clock, 
  TrendingUp, 
  Brain,
  Sparkles,
  MessageSquare
} from "lucide-react";

const stats = [
  {
    title: "AI Analyses Completed",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Brain,
    description: "This month",
    color: "bg-gradient-to-r from-blue-500 to-blue-600"
  },
  {
    title: "Documents Processed",
    value: "3,142",
    change: "+18%",
    changeType: "positive" as const,
    icon: FileText,
    description: "Total processed",
    color: "bg-gradient-to-r from-green-500 to-green-600"
  },
  {
    title: "AI Conversations",
    value: "856",
    change: "+24%",
    changeType: "positive" as const,
    icon: MessageSquare,
    description: "Chat sessions",
    color: "bg-gradient-to-r from-purple-500 to-purple-600"
  },
  {
    title: "AI Accuracy Rate",
    value: "99.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: Sparkles,
    description: "AI processing",
    color: "bg-gradient-to-r from-orange-500 to-orange-600"
  }
];

export function DashboardStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-gradient-card border-border/50 shadow-soft hover:shadow-elegant transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  stat.changeType === 'positive' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {stat.change}
              </Badge>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}