import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentDocuments } from "@/components/dashboard/RecentDocuments";
import { AIInsights } from "@/components/dashboard/AIInsights";


const Index = () => {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Professional Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Document Workflow
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your document processing with intelligent AI agents.
          </p>
        </div>

        {/* Enhanced Stats */}
        <DashboardStats />

        {/* Professional Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <RecentDocuments />
          </div>
          
          <div className="space-y-8">
            <AIInsights />
          </div>
        </div>

        {/* Professional Footer Info */}
        <div className="text-center py-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Powered by AI • Secure • Professional • Intelligent
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
