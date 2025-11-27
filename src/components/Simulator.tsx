import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Settings, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const Simulator = () => {
  const [staffCount, setStaffCount] = useState([2]);
  const [arrivalRate, setArrivalRate] = useState([10]);
  const [serviceTime, setServiceTime] = useState([5]);
  const [simulationResult, setSimulationResult] = useState<{
    avgWaitTime: number;
    maxWaitTime: number;
    queueLength: number;
    utilization: number;
    studentsServed: number;
  } | null>(null);

  const runSimulation = () => {
    // Simple queueing theory calculations (M/M/s model approximation)
    const lambda = arrivalRate[0]; // arrivals per hour
    const mu = 60 / serviceTime[0]; // service rate per hour
    const s = staffCount[0]; // number of servers
    const rho = lambda / (s * mu); // utilization

    if (rho >= 1) {
      toast.error("System is overloaded! Increase staff or reduce arrival rate.");
      return;
    }

    // Simplified calculations
    const avgWaitTime = (rho / (1 - rho)) * serviceTime[0];
    const maxWaitTime = avgWaitTime * 2.5;
    const queueLength = lambda * avgWaitTime / 60;
    const utilization = rho * 100;
    const studentsServed = lambda * 8; // 8-hour day

    setSimulationResult({
      avgWaitTime: Math.round(avgWaitTime),
      maxWaitTime: Math.round(maxWaitTime),
      queueLength: Math.round(queueLength * 10) / 10,
      utilization: Math.round(utilization),
      studentsServed: Math.round(studentsServed),
    });

    toast.success("Simulation completed!");
  };

  const resetSimulation = () => {
    setStaffCount([2]);
    setArrivalRate([10]);
    setServiceTime([5]);
    setSimulationResult(null);
    toast.info("Simulation reset");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Queue Simulation Model
          </CardTitle>
          <CardDescription>
            Adjust parameters to simulate different scenarios and optimize queue performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Staff Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="staff">Number of Staff (Servers)</Label>
                <span className="text-sm font-medium">{staffCount[0]}</span>
              </div>
              <Slider
                id="staff"
                min={1}
                max={5}
                step={1}
                value={staffCount}
                onValueChange={setStaffCount}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Current: {staffCount[0]} staff member{staffCount[0] > 1 ? 's' : ''}
              </p>
            </div>

            {/* Arrival Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="arrival">Student Arrival Rate (per hour)</Label>
                <span className="text-sm font-medium">{arrivalRate[0]}</span>
              </div>
              <Slider
                id="arrival"
                min={5}
                max={30}
                step={1}
                value={arrivalRate}
                onValueChange={setArrivalRate}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                {arrivalRate[0]} students arrive per hour on average
              </p>
            </div>

            {/* Service Time */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="service">Average Service Time (minutes)</Label>
                <span className="text-sm font-medium">{serviceTime[0]}</span>
              </div>
              <Slider
                id="service"
                min={2}
                max={15}
                step={1}
                value={serviceTime}
                onValueChange={setServiceTime}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Each transaction takes {serviceTime[0]} minutes on average
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={runSimulation} className="flex-1" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Run Simulation
              </Button>
              <Button onClick={resetSimulation} variant="outline" size="lg">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {simulationResult && (
        <Card className="shadow-medium border-2 border-primary animate-in slide-in-from-bottom duration-500">
          <CardHeader className="bg-gradient-primary text-white">
            <CardTitle>Simulation Results</CardTitle>
            <CardDescription className="text-white/80">
              Predicted queue performance based on your parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground mb-1">Average Wait Time</div>
                <div className="text-3xl font-bold text-primary">
                  {simulationResult.avgWaitTime} min
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground mb-1">Maximum Wait Time</div>
                <div className="text-3xl font-bold text-secondary">
                  {simulationResult.maxWaitTime} min
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground mb-1">Average Queue Length</div>
                <div className="text-3xl font-bold text-accent">
                  {simulationResult.queueLength} students
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="text-sm text-muted-foreground mb-1">Staff Utilization</div>
                <div className="text-3xl font-bold text-warning">
                  {simulationResult.utilization}%
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted md:col-span-2">
                <div className="text-sm text-muted-foreground mb-1">
                  Estimated Students Served (8-hour day)
                </div>
                <div className="text-3xl font-bold">
                  {simulationResult.studentsServed} students
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Recommendations
              </h4>
              <ul className="space-y-2 text-sm">
                {simulationResult.avgWaitTime > 20 && (
                  <li className="flex items-start gap-2">
                    <span className="text-warning">⚠️</span>
                    <span>
                      Wait times are high. Consider adding more staff during peak hours.
                    </span>
                  </li>
                )}
                {simulationResult.utilization > 85 && (
                  <li className="flex items-start gap-2">
                    <span className="text-warning">⚠️</span>
                    <span>
                      Staff utilization is very high. Additional capacity may be needed.
                    </span>
                  </li>
                )}
                {simulationResult.avgWaitTime <= 15 && (
                  <li className="flex items-start gap-2">
                    <span className="text-success">✓</span>
                    <span>
                      Excellent performance! Wait times are within acceptable range.
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Card */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="text-base">About the Simulator</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            This simulator uses queueing theory (M/M/s model) to predict queue performance
            based on your input parameters.
          </p>
          <p>
            <strong>Use this tool to:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Test different staffing levels</li>
            <li>Predict wait times during peak hours</li>
            <li>Optimize resource allocation</li>
            <li>Plan capacity for special events</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulator;
