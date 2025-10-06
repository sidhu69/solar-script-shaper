import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AstrologyChat } from "@/components/AstrologyChat";
import { BirthChartView } from "@/components/BirthChartView";
import { Watermark } from "@/components/Watermark";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, LineChart } from "lucide-react";

const AstrologyView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportData = location.state?.reportData;

  useEffect(() => {
    if (!reportData) {
      navigate("/");
    }
  }, [reportData, navigate]);

  if (!reportData) {
    return null;
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col">
      <Watermark />
      {/* Starfield background */}
      <div className="fixed inset-0 star-field opacity-40 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2 rounded-none h-16 bg-background/80 backdrop-blur-md border-b flex-shrink-0">
            <TabsTrigger value="chat" className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="chart" className="flex items-center gap-2 text-lg">
              <LineChart className="w-5 h-5" />
              Chart
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 m-0 overflow-hidden" style={{ height: 'calc(100vh - 4rem)' }}>
            <AstrologyChat birthChart={reportData} language={reportData.language || "english"} />
          </TabsContent>
          <TabsContent value="chart" className="flex-1 m-0 overflow-auto" style={{ height: 'calc(100vh - 4rem)' }}>
            <div className="container mx-auto px-4 py-8">
              <BirthChartView data={reportData} language={reportData.language} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AstrologyView;
