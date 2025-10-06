import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BirthChartViewProps {
  data: any;
}

export const BirthChartView = ({ data }: BirthChartViewProps) => {
  // Convert planets object to array format
  const planetsArray = data.planets ? Object.entries(data.planets).map(([name, planetData]: [string, any]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    sign: planetData.sign,
    degree: planetData.degree,
    house: planetData.house,
    meaning: getPlanetMeaning(name)
  })) : [];

  function getPlanetMeaning(planet: string): string {
    const meanings: { [key: string]: string } = {
      sun: "Your core identity and ego",
      moon: "Your emotions and inner self",
      mercury: "Communication and thinking",
      venus: "Love, beauty, and values",
      mars: "Energy, action, and passion",
      jupiter: "Growth, luck, and expansion",
      saturn: "Discipline and life lessons",
      rahu: "Desires and worldly attachments",
      ketu: "Spirituality and detachment"
    };
    return meanings[planet] || "Planetary influence";
  }

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">Your Birth Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Date:</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.date}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Time:</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.time}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Place:</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.place}</span>
          </div>
          <div>
            <span className="text-muted-foreground">System:</span>
            <span className="ml-2 text-foreground font-medium capitalize">{data.systemType}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">Ascendant (Rising Sign)</h3>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2 border-primary/30 bg-primary/10">
            {data.ascendant}
          </Badge>
          <p className="text-sm text-muted-foreground">Your outer personality and first impressions</p>
        </div>
      </Card>

      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">Planetary Positions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planetsArray.map((planet: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-secondary/30"
            >
              <div>
                <h4 className="font-semibold text-foreground">{planet.name}</h4>
                <p className="text-sm text-muted-foreground">{planet.meaning}</p>
              </div>
              <Badge variant="outline" className="border-accent/30 bg-accent/10">
                {planet.sign}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
