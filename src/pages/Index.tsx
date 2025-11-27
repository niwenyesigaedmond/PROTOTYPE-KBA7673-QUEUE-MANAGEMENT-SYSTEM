import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Users, TrendingDown, BarChart3, Ticket, Settings, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QueueDashboard from "@/components/QueueDashboard";
import TicketGenerator from "@/components/TicketGenerator";
import Analytics from "@/components/Analytics";
import Simulator from "@/components/Simulator";
import ThemeToggle from "@/components/ThemeToggle";
import bbucLogo from "@/assets/bbuc-logo.png";
import queueIllustration from "@/assets/queue-illustration.png";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-glow relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-5"></div>
        {/* Decorative illustration */}
        <div 
          className="absolute right-0 top-0 h-full w-64 opacity-10 bg-contain bg-right bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url(${queueIllustration})` }}
        ></div>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={bbucLogo} 
                alt="BBUC Logo" 
                className="h-16 w-auto object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Queue Management System
                </h1>
                <p className="text-muted-foreground mt-1">
                  Bishop Barham University College - Accounts Office
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate("/")}
                className="border-primary/50 bg-primary/5 hover:bg-primary/10"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <ThemeToggle />
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/50 bg-primary/5">
                <Clock className="w-3 h-3 mr-1 text-primary" />
                Live
              </Badge>
              <Badge variant="secondary" className="text-sm px-3 py-1 hidden sm:flex">
                <Users className="w-3 h-3 mr-1" />
                Active Today: 47
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="ticket" className="gap-2">
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">Get Ticket</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingDown className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Simulator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <QueueDashboard />
          </TabsContent>

          <TabsContent value="ticket" className="space-y-6">
            <TicketGenerator />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>

          <TabsContent value="simulator" className="space-y-6">
            <Simulator />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12 py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Bishop Barham University College - Queue Management System</p>
          <p className="mt-1">Research Project by Niwenyesiga Edmond (S23/BBUC/BSIT/013)</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
