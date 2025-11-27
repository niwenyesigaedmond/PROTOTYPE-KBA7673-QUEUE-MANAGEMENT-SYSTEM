import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Clock, Users } from "lucide-react";
import analyticsIllustration from "@/assets/analytics-illustration.png";

const Analytics = () => {
  const dailyStats = [
    { day: "Monday", served: 45, avgWait: 18 },
    { day: "Tuesday", served: 52, avgWait: 22 },
    { day: "Wednesday", served: 48, avgWait: 15 },
    { day: "Thursday", served: 61, avgWait: 25 },
    { day: "Friday", served: 58, avgWait: 20 },
  ];

  const peakHours = [
    { time: "9-10 AM", count: 12 },
    { time: "10-11 AM", count: 18 },
    { time: "11-12 PM", count: 15 },
    { time: "2-3 PM", count: 25 },
    { time: "3-4 PM", count: 22 },
    { time: "4-5 PM", count: 14 },
  ];

  const serviceDistribution = [
    { service: "Tuition Payment", count: 85, percentage: 35 },
    { service: "Fee Inquiry", count: 62, percentage: 26 },
    { service: "Exam Clearance", count: 48, percentage: 20 },
    { service: "Receipt Collection", count: 32, percentage: 13 },
    { service: "Other", count: 15, percentage: 6 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 relative">
      {/* Decorative illustration */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 opacity-5 bg-contain bg-right bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${analyticsIllustration})` }}
      ></div>
      
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Served (Week)</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">264</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Wait Time</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">-15%</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Target: 85%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Daily Statistics */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Daily Statistics (This Week)
          </CardTitle>
          <CardDescription>Students served and average wait times</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dailyStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stat.day}</span>
                  <div className="flex gap-4 text-muted-foreground">
                    <span>{stat.served} served</span>
                    <span>{stat.avgWait} min avg</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div 
                    className="h-8 bg-gradient-primary rounded transition-all"
                    style={{ width: `${(stat.served / 70) * 100}%` }}
                  />
                  <div 
                    className="h-8 bg-gradient-warm rounded transition-all opacity-50"
                    style={{ width: `${(stat.avgWait / 30) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Peak Hours */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Peak Hours Analysis
          </CardTitle>
          <CardDescription>Busiest times of the day</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {peakHours.map((hour, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{hour.time}</span>
                  <span className="text-muted-foreground">{hour.count} students</span>
                </div>
                <div 
                  className="h-6 bg-accent/20 rounded-full overflow-hidden"
                >
                  <div 
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${(hour.count / 25) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Distribution */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-secondary" />
            Service Type Distribution
          </CardTitle>
          <CardDescription>Most requested services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceDistribution.map((service, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{service.service}</span>
                  <span className="text-muted-foreground">
                    {service.count} ({service.percentage}%)
                  </span>
                </div>
                <div className="h-6 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-full transition-all"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
