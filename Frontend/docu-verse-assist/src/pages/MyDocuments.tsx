import { useState, useMemo } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  FileText, 
  File, 
  MoreHorizontal,
  Eye,
  Download,
  Edit,
  Trash2,
  Calendar,
  SortAsc,
  Brain
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { documentsData, documentTypes, statusTypes, type Document } from "@/data/documentsData";
import { DocumentViewer } from "@/components/ui/document-viewer";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Processed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "Generated":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "Analyzing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "Completed":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "Draft":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const MyDocuments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("modified");

  const filteredDocuments = useMemo(() => {
    let filtered = documentsData.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesType = selectedFilter === "all" || doc.type === selectedFilter;
      const matchesStatus = selectedStatus === "all" || doc.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort documents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "modified":
          return a.timeAgo.localeCompare(b.timeAgo);
        case "size":
          return parseFloat(b.size) - parseFloat(a.size);
        case "confidence":
          return b.aiConfidence - a.aiConfidence;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedFilter, selectedStatus, sortBy]);

  const handleDownload = (doc: Document) => {
    // Simulate download
    const blob = new Blob([`Document: ${doc.title}\nType: ${doc.type}\nStatus: ${doc.status}`], 
      { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <File className="w-8 h-8 text-ai-accent" />
            My Documents
          </h1>
          <p className="text-muted-foreground">
            Manage and organize all your AI-processed documents
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search documents, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusTypes.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modified">Last Modified</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="size">Size</SelectItem>
                  <SelectItem value="confidence">AI Confidence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Document Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{documentsData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(documentsData.reduce((acc, doc) => acc + doc.aiConfidence, 0) / documentsData.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg AI Confidence</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {documentsData.filter(doc => doc.timeAgo.includes('hour') || doc.timeAgo.includes('day')).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Recent (24h)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border/50 shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center">
                  <SortAsc className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{filteredDocuments.length}</p>
                  <p className="text-sm text-muted-foreground">Filtered Results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-ai-accent" />
              Documents ({filteredDocuments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg ${document.color} flex items-center justify-center text-white text-xl`}>
                      {document.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{document.title}</h3>
                        <Badge className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                        <Badge variant="secondary">
                          {document.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>• {document.size}</span>
                        <span>• {document.timeAgo}</span>
                        <span>• AI: {document.aiConfidence}%</span>
                      </div>
                      
                      <div className="flex gap-1 mt-2">
                        {document.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DocumentViewer document={document}>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DocumentViewer>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No documents found matching your filters
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default MyDocuments;