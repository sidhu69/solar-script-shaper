import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BirthChartViewProps {
  data: any;
  language?: string;
}

export const BirthChartView = ({ data, language }: BirthChartViewProps) => {
  const isHinglish = language === "hinglish";

  function getPlanetName(planet: string): string {
    if (isHinglish) {
      const hinglishNames: { [key: string]: string } = {
        sun: "Surya",
        moon: "Chandra",
        mercury: "Budh",
        venus: "Shukra",
        mars: "Mangal",
        jupiter: "Guru",
        saturn: "Shani",
        rahu: "Rahu",
        ketu: "Ketu"
      };
      return hinglishNames[planet] || planet.charAt(0).toUpperCase() + planet.slice(1);
    }
    return planet.charAt(0).toUpperCase() + planet.slice(1);
  }

  function getPlanetMeaning(planet: string): string {
    if (isHinglish) {
      const hinglishMeanings: { [key: string]: string } = {
        sun: "Aapki asli pehchaan aur aatma",
        moon: "Aapke emotions aur mann",
        mercury: "Communication aur soch",
        venus: "Pyaar, khubsurti aur values",
        mars: "Energy, action aur passion",
        jupiter: "Growth, luck aur expansion",
        saturn: "Discipline aur life lessons",
        rahu: "Worldly desires aur attachments",
        ketu: "Spirituality aur detachment"
      };
      return hinglishMeanings[planet] || "Graho ka prabhav";
    }
    
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

  // Convert planets object to array format
  const planetsArray = data.planets ? Object.entries(data.planets).map(([name, planetData]: [string, any]) => ({
    name: getPlanetName(name),
    sign: planetData.sign,
    degree: planetData.degree,
    house: planetData.house,
    meaning: getPlanetMeaning(name)
  })) : [];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">
          {isHinglish ? "Aapki Janam Details" : "Your Birth Details"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">{isHinglish ? "Taareekh:" : "Date:"}</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.date}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{isHinglish ? "Samay:" : "Time:"}</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.time}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{isHinglish ? "Jagah:" : "Place:"}</span>
            <span className="ml-2 text-foreground font-medium">{data.birthDetails?.place}</span>
          </div>
          <div>
            <span className="text-muted-foreground">{isHinglish ? "System:" : "System:"}</span>
            <span className="ml-2 text-foreground font-medium capitalize">{data.systemType}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">
          {isHinglish ? "Lagna (Rising Sign)" : "Ascendant (Rising Sign)"}
        </h3>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-lg px-4 py-2 border-primary/30 bg-primary/10">
            {data.ascendant}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {isHinglish 
              ? "Aapki bahari personality aur pehli impression" 
              : "Your outer personality and first impressions"}
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-background/40 backdrop-blur-md border-primary/20">
        <h3 className="text-xl font-semibold text-gradient mb-4">
          {isHinglish ? "Graho ki Sthiti" : "Planetary Positions"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {planetsArray.map((planet: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/20 border border-secondary/30"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{planet.name}</h4>
                <p className="text-sm text-muted-foreground">{planet.meaning}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {isHinglish ? `${planet.house} Ghar mein` : `In House ${planet.house}`}
                </p>
              </div>
              <div className="flex flex-col gap-2 items-end">
                <Badge variant="outline" className="border-accent/30 bg-accent/10">
                  {planet.sign}
                </Badge>
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-xs">
                  {isHinglish ? `${planet.house} Ghar` : `House ${planet.house}`}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
