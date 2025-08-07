import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Brain, 
  Sparkles,
  ArrowRight,
  User,
  Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      navigate("/");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string, userType: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);
    
    const success = await login(demoEmail, demoPassword);
    
    if (success) {
      toast({
        title: `Welcome ${userType}!`,
        description: "You have been logged in with demo credentials.",
      });
      navigate("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                RamCorp AI
              </h1>
              <p className="text-sm text-muted-foreground">Document Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Demo Credentials Cards */}
        <div className="space-y-3">
          <div className="text-center">
            <Badge variant="secondary" className="mb-3">
              Demo Credentials Available
            </Badge>
          </div>
          
          <div className="grid gap-2">
            <Button
              variant="outline"
              onClick={() => handleDemoLogin("demo@techcorp.com", "demo123", "Demo User")}
              disabled={isLoading}
              className="flex items-center justify-between p-4 h-auto hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium">Demo User</div>
                  <div className="text-xs text-muted-foreground">demo@techcorp.com</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-border/50 shadow-soft">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </CardContent>
          </form>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Features */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              AI-Powered
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Secure
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Professional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 