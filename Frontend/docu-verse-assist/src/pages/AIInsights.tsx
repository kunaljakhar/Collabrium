import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Target,
  Zap,
  Users,
  Calendar,
  Activity,
  Download,
  RefreshCw
} from "lucide-react";
import { documentsData } from "@/data/documentsData";

interface InsightMetric {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  icon: any;
}

interface ProcessingActivity {
  id: string;
  action: string;
  document: string;
  time: string;
  status: 'completed' | 'in-progress' | 'failed';
  aiScore?: number;
}

const AIInsights = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  // Calculate metrics from documents data
  const totalDocs = documentsData.length;
  const avgConfidence = Math.round(documentsData.reduce((acc, doc) => acc + doc.aiConfidence, 0) / documentsData.length);
  const recentDocs = documentsData.filter(doc => doc.timeAgo.includes('hour') || doc.timeAgo.includes('day')).length;
  const processingDocs = documentsData.filter(doc => doc.status === 'Analyzing').length;

  const metrics: InsightMetric[] = [
    {
      label: "AI Processing Accuracy",
      value: `${avgConfidence}%`,
      change: +2.3,
      trend: 'up',
      color: 'text-green-600',
      icon: Brain
    },
    {
      label: "Documents Processed",
      value: totalDocs,
      change: +15.2,
      trend: 'up',
      color: 'text-blue-600',
      icon: FileText
    },
    {
      label: "Processing Speed",
      value: "1.2s",
      change: -0.8,
      trend: 'up',
      color: 'text-purple-600',
      icon: Zap
    },
    {
      label: "Success Rate",
      value: "98.7%",
      change: +0.5,
      trend: 'up',
      color: 'text-emerald-600',
      icon: Target
    }
  ];

  const recentActivity: ProcessingActivity[] = [
    {
      id: "1",
      action: "Contract Analysis Completed",
      document: "Sales Contract - Q4 2024",
      time: "2 minutes ago",
      status: "completed",
      aiScore: 98
    },
    {
      id: "2",
      action: "Template Generation",
      document: "Invoice Template v2",
      time: "15 minutes ago",
      status: "completed",
      aiScore: 95
    },
    {
      id: "3",
      action: "Document Scanning",
      document: "Legal Document Scan",
      time: "1 hour ago",
      status: "in-progress"
    },
    {
      id: "4",
      action: "Content Extraction",
      document: "Partnership Agreement",
      time: "2 hours ago",
      status: "completed",
      aiScore: 99
    },
    {
      id: "5",
      action: "Text Recognition",
      document: "Vendor Agreement Scan",
      time: "4 hours ago",
      status: "completed",
      aiScore: 89
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      type: "optimization",
      title: "Optimize Document Upload Process",
      description: "Based on usage patterns, consider implementing batch upload for similar document types to improve efficiency.",
      impact: "High",
      effort: "Medium",
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    },
    {
      id: 2,
      type: "accuracy",
      title: "Improve Contract Analysis Accuracy",
      description: "Fine-tune AI models for contract terms recognition to achieve 99%+ accuracy on legal documents.",
      impact: "High",
      effort: "High",
      color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
    },
    {
      id: 3,
      type: "workflow",
      title: "Automate Document Classification",
      description: "Implement auto-tagging for incoming documents based on content analysis patterns.",
      impact: "Medium",
      effort: "Low",
      color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    }
  ];

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
              <Brain className="w-8 h-8 text-ai-accent" />
              AI Insights & Analytics
            </h1>
            <p className="text-muted-foreground">
              Comprehensive AI performance metrics and intelligent recommendations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                    <div className={`flex items-center mt-2 text-sm ${metric.color}`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r from-primary/20 to-primary/30 flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Processing Activity */}
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-ai-accent" />
                Recent AI Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(activity.status)}
                      <div>
                        <p className="font-medium text-foreground">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.document}</p>
                        {activity.aiScore && (
                          <Badge variant="secondary" className="mt-1">
                            AI Score: {activity.aiScore}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Type Distribution */}
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-ai-accent" />
                Document Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Contract', 'Template', 'Scan', 'Report', 'Legal'].map((type) => {
                  const count = documentsData.filter(doc => doc.type === type).length;
                  const percentage = Math.round((count / totalDocs) * 100);
                  
                  return (
                    <div key={type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{type}</span>
                        <span className="text-muted-foreground">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-background rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-primary/80 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-ai-accent" />
              AI-Powered Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {aiRecommendations.map((rec) => (
                <div key={rec.id} className={`p-4 rounded-lg border-2 ${rec.color}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground">{rec.title}</h3>
                    <div className="flex gap-1">
                      <Badge variant={rec.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                        {rec.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {rec.effort} Effort
                    </Badge>
                    <Button size="sm" variant="ghost">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Response Time</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processing Queue</span>
                  <Badge className="bg-blue-100 text-blue-800">{processingDocs} Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Model Status</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Storage Usage</span>
                  <Badge variant="secondary">67% Used</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-ai-accent" />
                Usage Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{recentDocs}</p>
                  <p className="text-sm text-muted-foreground">Documents Today</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">2.4k</p>
                  <p className="text-sm text-muted-foreground">API Calls This Week</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">99.2%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-ai-accent" />
                Export Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Report
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Custom Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIInsights; 