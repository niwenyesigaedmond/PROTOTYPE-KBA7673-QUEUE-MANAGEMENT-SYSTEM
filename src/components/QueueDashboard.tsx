import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, TrendingDown, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const QueueDashboard = () => {
  const currentQueue = [
    { id: "A001", name: "Student 1", service: "Payment", waitTime: 3, status: "serving" },
    { id: "A002", name: "Student 2", service: "Inquiry", waitTime: 5, status: "waiting" },
    { id: "A003", name: "Student 3", service: "Clearance", waitTime: 7, status: "waiting" },
    { id: "A004", name: "Student 4", service: "Payment", waitTime: 8, status: "waiting" },
    { id: "A005", name: "Student 5", service: "Receipt", waitTime: 10, status: "waiting" },
  ];

  const metrics = [
    {
      title: "Current Queue",
      value: "5",
      change: "-2 from last hour",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Avg. Wait Time",
      value: "6 min",
      change: "-60% from yesterday",
      icon: Clock,
      color: "text-accent",
    },
    {
      title: "Serving Now",
      value: "1",
      change: "Counter 1 active",
      icon: TrendingDown,
      color: "text-secondary",
    },
    {
      title: "Peak Hour",
      value: "2-4 PM",
      change: "Predicted today",
      icon: AlertCircle,
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Current Queue */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Current Queue Status
          </CardTitle>
          <CardDescription>
            Real-time view of students waiting at the Accounts Office
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentQueue.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white font-bold">
                    <span className="text-xs">Ticket</span>
                    <span className="text-lg">{student.id}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{student.name}</h4>
                      {student.status === "serving" && (
                        <Badge variant="default" className="bg-success">
                          Being Served
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Service: {student.service}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Wait time</span>
                        <span>{student.waitTime} min</span>
                      </div>
                      <Progress 
                        value={(student.waitTime / 30) * 100} 
                        className="h-1.5"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <Clock className="w-5 h-5 text-muted-foreground mb-1" />
                  <p className="text-sm font-medium">{student.waitTime} min</p>
                </div>
              </div>
            ))}
          </div>

          {currentQueue.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No students in queue</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDashboard;
