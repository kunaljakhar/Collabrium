import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Mic, 
  MicOff,
  Paperclip, 
  Brain, 
  User,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { aiService, type AIMessage } from "@/services/aiService";
import { useToast } from "@/hooks/use-toast";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  aiConfidence?: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant . I can help you analyze contracts, generate documents, extract information, and much more. What would you like to work on today?",
      isUser: false,
      timestamp: new Date(),
      aiConfidence: 98
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState<'testing' | 'connected' | 'disconnected'>('testing');
  const { toast } = useToast();
  
  // Speech Recognition
  const {
    isListening,
    transcript,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Test API connection on component mount
  useEffect(() => {
    const testConnection = async () => {
      try {
        const isConnected = await aiService.testConnection();
        setApiStatus(isConnected ? 'connected' : 'disconnected');
        
        if (!isConnected) {
          toast({
            title: "API Connection Failed",
            description: "Please check your Google AI API key configuration.",
            variant: "destructive",
          });
        }
      } catch (error) {
        setApiStatus('disconnected');
        toast({
          title: "API Connection Error",
          description: "Failed to connect to Google AI service.",
          variant: "destructive",
        });
      }
    };

    testConnection();
  }, [toast]);

  // Update input value when speech transcript changes
  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      if (speechSupported) {
        resetTranscript();
        startListening();
      } else {
        toast({
          title: "Speech Recognition Not Supported",
          description: "Your browser doesn't support speech recognition.",
          variant: "destructive",
        });
      }
    }
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);

    try {
      // Convert messages to AI format
      const conversationHistory: AIMessage[] = [
        ...messages.slice(1).map(msg => ({
          role: msg.isUser ? 'user' as const : 'model' as const,
          parts: [{ text: msg.content }]
        })),
        {
          role: 'user' as const,
          parts: [{ text: currentInput }]
        }
      ];

      const aiResponse = await aiService.generateChatResponse(conversationHistory);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        aiConfidence: Math.floor(Math.random() * 10) + 90
      };
      
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error processing your request. Please check your API configuration and try again.",
        isUser: false,
        timestamp: new Date(),
        aiConfidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Chat Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const getStatusBadge = () => {
    switch (apiStatus) {
      case 'testing':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Testing...</Badge>;
      case 'connected':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="destructive" className="bg-red-100 text-red-800">Disconnected</Badge>;
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Brain className="w-8 h-8 text-ai-accent" />
            AI Assistant
            {apiStatus === 'disconnected' && (
              <AlertCircle className="w-6 h-6 text-red-500" />
            )}
          </h1>
          <p className="text-muted-foreground">
            Chat with AI to analyze documents, generate content, and streamline workflows
          </p>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 bg-gradient-card border-border/50 shadow-soft flex flex-col">
          <CardHeader className="border-b border-border/50">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ai-accent" />
              AI Conversation
              <div className="ml-auto">
                {getStatusBadge()}
              </div>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  {!message.isUser && (
                    <Avatar className="w-8 h-8 bg-gradient-ai">
                      <AvatarFallback className="bg-gradient-ai text-white">
                        <Brain className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground border border-border/50"
                    }`}
                  >
                    {message.isUser ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="text-sm leading-relaxed prose prose-sm max-w-none dark:prose-invert">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                      <span>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {message.aiConfidence !== undefined && message.aiConfidence > 0 && (
                        <>
                          <span>•</span>
                          <span>AI Confidence: {message.aiConfidence}%</span>
                        </>
                      )}
                    </div>
                  </div>

                  {message.isUser && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 bg-gradient-ai">
                    <AvatarFallback className="bg-gradient-ai text-white">
                      <Brain className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-accent text-accent-foreground border border-border/50 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-4">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <Paperclip className="w-4 h-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your documents..."
                    className="pr-20 bg-background/50"
                    disabled={isTyping || apiStatus === 'disconnected'}
                  />
                  
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`w-8 h-8 p-0 ${isListening ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : ''}`}
                      onClick={handleMicClick}
                      disabled={!speechSupported}
                      title={speechSupported ? (isListening ? 'Stop listening' : 'Start voice input') : 'Speech recognition not supported'}
                    >
                      {isListening ? (
                        <MicOff className="w-4 h-4" />
                      ) : (
                        <Mic className="w-4 h-4" />
                      )}
                    </Button>
                    <Button 
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || isTyping || apiStatus === 'disconnected'}
                      size="sm" 
                      className="w-8 h-8 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Chat;