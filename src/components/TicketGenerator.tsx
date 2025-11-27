import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket, Printer, Clock } from "lucide-react";
import { toast } from "sonner";

const TicketGenerator = () => {
  const [studentName, setStudentName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [generatedTicket, setGeneratedTicket] = useState<{
    ticketNumber: string;
    name: string;
    service: string;
    estimatedWait: number;
    position: number;
  } | null>(null);

  const services = [
    "Tuition Payment",
    "Receipt Collection",
    "Fee Inquiry",
    "Exam Clearance",
    "Payment Verification",
    "Refund Request",
  ];

  const generateTicket = () => {
    if (!studentName || !serviceType) {
      toast.error("Please fill in all fields");
      return;
    }

    const ticketNumber = `A${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    const position = Math.floor(Math.random() * 5) + 1;
    const estimatedWait = position * 8 + Math.floor(Math.random() * 10);

    setGeneratedTicket({
      ticketNumber,
      name: studentName,
      service: serviceType,
      estimatedWait,
      position,
    });

    toast.success("Ticket generated successfully!");
  };

  const printTicket = () => {
    toast.success("Printing ticket...");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            Generate Queue Ticket
          </CardTitle>
          <CardDescription>
            Get your digital ticket and estimated wait time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name</Label>
              <Input
                id="studentName"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateTicket} 
              className="w-full"
              size="lg"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Generate Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedTicket && (
        <Card className="shadow-medium border-2 border-primary animate-in slide-in-from-bottom duration-500">
          <CardHeader className="bg-gradient-primary text-white">
            <CardTitle className="text-center text-3xl font-bold">
              Your Ticket
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-primary text-white mx-auto">
                <div>
                  <div className="text-sm font-medium">Ticket</div>
                  <div className="text-4xl font-bold">{generatedTicket.ticketNumber}</div>
                </div>
              </div>

              <div className="space-y-3 text-left max-w-sm mx-auto">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{generatedTicket.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-semibold">{generatedTicket.service}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Position:</span>
                  <span className="font-semibold">{generatedTicket.position} in queue</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Est. Wait:</span>
                  <span className="font-semibold flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {generatedTicket.estimatedWait} minutes
                  </span>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  onClick={printTicket} 
                  variant="outline" 
                  className="w-full"
                  size="lg"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Ticket
                </Button>
                <p className="text-sm text-muted-foreground">
                  Please keep this ticket and wait for your number to be called
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketGenerator;
