import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Zodiac signs
const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// Calculate zodiac sign based on date (Western/Tropical)
function getWesternZodiacSign(month: number, day: number): string {
  const dates: Array<[number, number, string]> = [
    [1, 20, "Capricorn"], [2, 19, "Aquarius"], [3, 21, "Pisces"],
    [4, 20, "Aries"], [5, 21, "Taurus"], [6, 21, "Gemini"],
    [7, 23, "Cancer"], [8, 23, "Leo"], [9, 23, "Virgo"],
    [10, 23, "Libra"], [11, 22, "Scorpio"], [12, 22, "Sagittarius"]
  ];
  
  for (let i = 0; i < dates.length; i++) {
    const [endMonth, endDay, sign] = dates[i];
    if (month < endMonth || (month === endMonth && day <= endDay)) {
      return sign;
    }
  }
  return "Capricorn";
}

// Calculate which house a planet is in based on its position and the ascendant
function calculateHouse(planetDegree: number, ascendantDegree: number): number {
  // Normalize degrees to 0-360
  let houseDegree = planetDegree - ascendantDegree;
  if (houseDegree < 0) houseDegree += 360;
  
  // Each house spans 30 degrees, starting from the ascendant (1st house)
  const house = Math.floor(houseDegree / 30) + 1;
  return house > 12 ? house - 12 : house;
}

// Calculate planetary positions (simplified rule-based)
function calculatePlanets(date: Date, systemType: string, ascendantDegree: number) {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const year = date.getFullYear();
  
  // Simplified calculations for demonstration
  const sunSign = getWesternZodiacSign(date.getMonth() + 1, date.getDate());
  const sunDegreeRaw = (dayOfYear * 0.9856) % 360;
  const sunDegree = sunDegreeRaw.toFixed(2);
  
  const moonCycle = ((dayOfYear * 13.176) % 360);
  const moonSignIndex = Math.floor(moonCycle / 30);
  const moonSign = zodiacSigns[moonSignIndex];
  const moonDegree = (moonCycle % 30).toFixed(2);
  
  const mercuryPos = ((dayOfYear * 4.09) % 360);
  const mercurySignIndex = Math.floor(mercuryPos / 30);
  const mercurySign = zodiacSigns[mercurySignIndex];
  
  const venusPos = ((dayOfYear * 1.6) % 360);
  const venusSignIndex = Math.floor(venusPos / 30);
  const venusSign = zodiacSigns[venusSignIndex];
  
  const marsPos = ((dayOfYear * 0.524) % 360);
  const marsSignIndex = Math.floor(marsPos / 30);
  const marsSign = zodiacSigns[marsSignIndex];
  
  const jupiterPos = ((year * 30.4) % 360);
  const jupiterSignIndex = Math.floor(jupiterPos / 30);
  const jupiterSign = zodiacSigns[jupiterSignIndex];
  
  const saturnPos = ((year * 12.2) % 360);
  const saturnSignIndex = Math.floor(saturnPos / 30);
  const saturnSign = zodiacSigns[saturnSignIndex];
  
  const rahuPos = ((marsPos + 180) % 360);
  const rahuSignIndex = Math.floor(rahuPos / 30);
  
  const ketuPos = marsPos;
  const ketuSignIndex = Math.floor(ketuPos / 30);
  
  // Vedic adjustment (approximately 23 degrees)
  const vedicOffset = systemType === "vedic" ? -23 : 0;
  
  return {
    sun: { 
      sign: sunSign, 
      degree: sunDegree, 
      house: calculateHouse(sunDegreeRaw, ascendantDegree)
    },
    moon: { 
      sign: moonSign, 
      degree: moonDegree, 
      house: calculateHouse(moonCycle, ascendantDegree)
    },
    mercury: { 
      sign: mercurySign, 
      degree: (mercuryPos % 30).toFixed(2), 
      house: calculateHouse(mercuryPos, ascendantDegree)
    },
    venus: { 
      sign: venusSign, 
      degree: (venusPos % 30).toFixed(2), 
      house: calculateHouse(venusPos, ascendantDegree)
    },
    mars: { 
      sign: marsSign, 
      degree: (marsPos % 30).toFixed(2), 
      house: calculateHouse(marsPos, ascendantDegree)
    },
    jupiter: { 
      sign: jupiterSign, 
      degree: (jupiterPos % 30).toFixed(2), 
      house: calculateHouse(jupiterPos, ascendantDegree)
    },
    saturn: { 
      sign: saturnSign, 
      degree: (saturnPos % 30).toFixed(2), 
      house: calculateHouse(saturnPos, ascendantDegree)
    },
    rahu: { 
      sign: zodiacSigns[rahuSignIndex], 
      degree: (rahuPos % 30).toFixed(2), 
      house: calculateHouse(rahuPos, ascendantDegree)
    },
    ketu: { 
      sign: zodiacSigns[ketuSignIndex], 
      degree: (ketuPos % 30).toFixed(2), 
      house: calculateHouse(ketuPos, ascendantDegree)
    }
  };
}

// Comprehensive astrology interpretations
function generateInterpretations(planets: any, ascendant: string) {
  const sunSign = planets.sun.sign;
  const moonSign = planets.moon.sign;
  const venusSign = planets.venus.sign;
  
  // Personality interpretations based on Sun and Moon
  const personalityInsights: { [key: string]: string } = {
    "Aries": "You're a natural-born leader with tons of energy and drive. You love being first and starting new things. Just remember to slow down sometimes and hear what others have to say - it'll make you even stronger.",
    "Taurus": "You're super grounded and reliable. You love the good things in life and work hard for stability. Your determination is amazing, but try not to be too stubborn when change comes knocking.",
    "Gemini": "Your mind is always buzzing with ideas! You're a great communicator and love learning new things. Try to go deep with some interests instead of always jumping to the next thing - you'll be surprised what you discover.",
    "Cancer": "You feel things deeply and have incredible intuition. Home and family mean the world to you. Just make sure you're taking care of yourself too, not just everyone else.",
    "Leo": "You light up any room you walk into! Your confidence and creativity are magnetic. Share that spotlight sometimes - your generosity makes you shine even brighter.",
    "Virgo": "You notice everything and have an amazing eye for detail. You're practical and love helping others. Remember that nobody's perfect (not even you!) - be kind to yourself.",
    "Libra": "You're all about balance and harmony. You make everything around you beautiful and fair. Work on trusting your gut when making decisions - you don't always need everyone's approval.",
    "Scorpio": "You're intense in the best way - passionate, deep, and incredibly perceptive. You see what others miss. Use that power for good and try to let go of grudges.",
    "Sagittarius": "You're the eternal optimist and adventurer! You love exploring ideas and places. Turn some of those big dreams into real plans - you've got what it takes.",
    "Capricorn": "You're ambitious and get stuff done. Your discipline and responsibility are impressive. Don't forget to have fun along the way - life's not just about reaching the top.",
    "Aquarius": "You're a visionary who thinks differently. You care about making the world better. Balance all that big thinking with real emotional connections - they matter too.",
    "Pisces": "You're deeply compassionate and creative. Your intuition and empathy are gifts. Set some boundaries so you don't get overwhelmed by everyone else's feelings."
  };

  // Relationship interpretations based on Venus and 7th house
  const relationshipInsights: { [key: string]: string } = {
    "Aries": "You bring fire and excitement to love! You need someone who can keep up with your energy and gives you space to be you. Direct communication is your style. Just remember that compromise isn't weakness.",
    "Taurus": "You're in it for the long haul. Loyalty and physical affection mean everything to you. You love building a stable life with someone you trust. Stay open to change - relationships grow and evolve.",
    "Gemini": "You need mental connection first! Your ideal partner keeps things interesting and talks about everything with you. Mix in some emotional depth with all that great conversation.",
    "Cancer": "You're incredibly caring and need emotional security. Building a cozy home together is your dream. You're amazing at understanding what others need - just speak up about your own needs too.",
    "Leo": "You're a romantic who loves grand gestures! You're generous and loyal, and you need someone who celebrates you. Let yourself be vulnerable - it's where real intimacy happens.",
    "Virgo": "You show love through actions - the little things you do daily. You want someone who shares your values and goals. Love isn't perfect though, and that's okay. Let some things slide.",
    "Libra": "Partnership is everything to you. You're a natural romantic who creates beautiful harmony. Work on being okay alone sometimes and make decisions from your gut.",
    "Scorpio": "When you love, you love deep. Loyalty and trust are dealbreakers for you. Your intensity is powerful - just lighten up sometimes and build trust slowly.",
    "Sagittarius": "You need freedom and growth in love. Your partner should be your adventure buddy and best friend. Balance that independence with being emotionally present.",
    "Capricorn": "You take love seriously and want something that lasts. You're super reliable and stable. Let loose a little - be spontaneous and show your vulnerable side.",
    "Aquarius": "Friendship is the base of your relationships. You value independence and deep conversations. Get comfortable with emotions, not just ideas.",
    "Pisces": "You're a hopeless romantic who dreams of deep soul connections. Your empathy creates beautiful love. Keep one foot on the ground though - see people as they really are."
  };

  // Career interpretations based on 10th house, Mercury, Saturn, Jupiter
  const careerInsights: { [key: string]: string } = {
    "Aries": "You're meant for leadership roles! Quick decisions, starting new projects, entrepreneurship - that's your zone. Your competitive edge drives success. Focus that energy on long-term wins.",
    "Taurus": "Finance, real estate, art, luxury - these fields are perfect for you. You build wealth steadily and practically. People trust your reliability. Take some calculated risks to level up.",
    "Gemini": "Anything communication-based is your jam - writing, teaching, sales, media. You can do multiple things well. Pick a few to master though - it'll pay off.",
    "Cancer": "You shine in caring roles - healthcare, hospitality, counseling, education. You create safe spaces for others. Your emotional intelligence is a superpower at work. Set boundaries so you don't burn out.",
    "Leo": "You're born for the spotlight! Creative fields, leadership, entertainment, management - anywhere you can express yourself and inspire others. Share the wins with your team.",
    "Virgo": "Your attention to detail is unmatched. Healthcare, research, analysis, editing - you make everything better and more organized. Don't get stuck on making things perfect though.",
    "Libra": "Law, design, diplomacy, counseling, arts - you excel where beauty and fairness matter. You bring people together professionally. Be more decisive when you need to be.",
    "Scorpio": "You dig deep - psychology, research, finance, investigation. You see what others miss and transform things. Take breaks though - intensity is great but self-care matters.",
    "Sagittarius": "Teaching, travel, publishing, international work - you inspire with your vision and optimism. You see the big picture clearly. Remember the small details count too.",
    "Capricorn": "You're built for climbing the career ladder. Business, leadership, management - you get stuff done. You'll reach the top. Just don't forget to live outside of work.",
    "Aquarius": "Tech, social change, innovation, science - you're ahead of your time. Your ideas change things. Turn those brilliant concepts into real projects.",
    "Pisces": "Creative and healing work calls you - arts, music, counseling, spiritual work. Your imagination and compassion help others. Add some structure to your dreams."
  };

  // Health interpretations based on 1st, 6th house, Moon, Sun, Mars
  const healthInsights: { [key: string]: string } = {
    "Aries": "You've got strong energy, but watch out for headaches and rushing into injuries. Move that body regularly! Try yoga or meditation to balance your fire. Don't push yourself to exhaustion.",
    "Taurus": "Keep an eye on your throat, neck, and thyroid. You love comfort, which is great, but stay active and eat well. Stress sits in your body, so stretch and rest regularly.",
    "Gemini": "Your mind never stops, which can stress your nervous system. Watch your breathing and arms/hands. Get enough sleep - your brain needs it. Try mindfulness to calm that busy mind.",
    "Cancer": "Your stomach and emotions are connected. When you're stressed, your digestion shows it. Take care of yourself like you take care of others. Drink water and create a peaceful home.",
    "Leo": "Focus on your heart and spine. When you're doing what you love, you're healthiest. Get that cardio in and express yourself creatively. Don't let pride stop you from seeing a doctor.",
    "Virgo": "Your gut is sensitive, so watch what you eat. Anxiety can show up physically for you. You're health-conscious, which is good - just don't stress about it too much. Move daily and relax.",
    "Libra": "Take care of your kidneys and lower back. Balance is key - in life and health. Stay hydrated and move regularly. Go easy on the sweets. Stress hits you physically.",
    "Scorpio": "Pay attention to your reproductive health and digestion. Your intensity needs outlets - exercise, creativity, talk therapy. Get regular check-ups. Let go of emotional stuff before it affects your body.",
    "Sagittarius": "Watch your hips, thighs, and liver. Your optimism helps you heal fast! Get outside and stay active. Just don't overdo it with food or drinks. Adventure keeps you healthy.",
    "Capricorn": "Your bones, teeth, and joints need care. Stress can show up in your body. You're disciplined about goals - be that way with rest too. Work-life balance keeps you strong long-term.",
    "Aquarius": "Look after your circulation, ankles, and nerves. Alternative health stuff might work well for you. Group fitness is fun for you. Stress hits your mind first. Try different wellness approaches.",
    "Pisces": "Care for your feet and immune system. You're sensitive to everything around you. Swimming or water activities are healing. Set emotional boundaries. Trust what your body tells you."
  };

  return {
    personality: `${personalityInsights[sunSign]}\n\nYour Moon in ${moonSign} shows your emotional side. ${personalityInsights[moonSign]}\n\nPeople see you as ${ascendant} rising first - that's the vibe you give off when someone meets you.`,
    relationships: relationshipInsights[venusSign],
    career: careerInsights[sunSign],
    health: healthInsights[sunSign]
  };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { birthDate, birthTime, birthPlace, systemType, language } = await req.json();

    console.log("Processing astrology calculation:", {
      birthDate,
      birthTime,
      birthPlace,
      systemType,
      language
    });

    // Parse birth date
    const date = new Date(birthDate);
    
    // Calculate ascendant based on birth time
    const [hours, minutes] = birthTime.split(":").map(Number);
    const ascendantIndex = Math.floor((hours * 2 + minutes / 30) % 12);
    const ascendant = zodiacSigns[ascendantIndex];
    
    // Calculate ascendant degree (0-360)
    const ascendantDegree = (ascendantIndex * 30) + ((minutes / 60) * 30);

    // Calculate planetary positions with house calculations
    const planets = calculatePlanets(date, systemType, ascendantDegree);

    // Generate interpretations
    const interpretations = generateInterpretations(planets, ascendant);

    const response = {
      systemType,
      ascendant,
      planets,
      interpretations,
      language: language || "english",
      birthDetails: {
        date: birthDate,
        time: birthTime,
        place: birthPlace
      }
    };

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in astrology calculation:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
