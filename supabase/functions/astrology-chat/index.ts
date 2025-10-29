import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const getAstrologySystemPrompt = (language: string) => {
  const basePrompt = `You are a friendly astrologer who gives short, conversational advice.

CRITICAL RULES:
- Keep responses 2-4 sentences maximum
- Use simple, everyday language
- Be warm and relatable
- Don't use formal or technical jargon
- Answer directly without long explanations
${language === "hinglish" ? "\n- Respond in Hinglish (Hindi words written in English script)\n- Use words like: aapka, hai, hoga, karein, achha, bahut, etc." : ""}

Astrological Knowledge:
- Planets: Sun (soul/ego), Moon (mind/emotions), Mars (energy/action), Mercury (communication), Jupiter (wisdom/luck), Venus (love/beauty), Saturn (discipline/karma), Rahu (desires), Ketu (spirituality)
- Signs: Aries (bold), Taurus (stable), Gemini (curious), Cancer (emotional), Leo (confident), Virgo (practical), Libra (balanced), Scorpio (intense), Sagittarius (adventurous), Capricorn (ambitious), Aquarius (unique), Pisces (dreamy)
- Houses: 1st (self), 2nd (money), 3rd (siblings), 4th (home), 5th (creativity), 6th (health), 7th (relationships), 8th (transformation), 9th (luck), 10th (career), 11th (gains), 12th (spirituality)

Always reference their chart but keep it brief and relatable.`;

  return basePrompt;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, birthChart, language } = await req.json();
    
    console.log("Astrology chat request:", { 
      messageCount: messages.length,
      hasBirthChart: !!birthChart 
    });

    const GOOGLE_GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GOOGLE_GEMINI_API_KEY) {
      throw new Error("GOOGLE_GEMINI_API_KEY is not configured");
    }

    // Build context about user's birth chart
    const chartContext = birthChart ? `

USER'S BIRTH CHART DATA:
Birth Date: ${birthChart.birthDetails.date}
Birth Time: ${birthChart.birthDetails.time}
Birth Place: ${birthChart.birthDetails.place}
System: ${birthChart.systemType}
Ascendant (Rising Sign): ${birthChart.ascendant}

PLANETARY POSITIONS:
Sun: ${birthChart.planets.sun.sign} at ${birthChart.planets.sun.degree}° in ${birthChart.planets.sun.house} house
Moon: ${birthChart.planets.moon.sign} at ${birthChart.planets.moon.degree}° in ${birthChart.planets.moon.house} house
Mercury: ${birthChart.planets.mercury.sign} at ${birthChart.planets.mercury.degree}° in ${birthChart.planets.mercury.house} house
Venus: ${birthChart.planets.venus.sign} at ${birthChart.planets.venus.degree}° in ${birthChart.planets.venus.house} house
Mars: ${birthChart.planets.mars.sign} at ${birthChart.planets.mars.degree}° in ${birthChart.planets.mars.house} house
Jupiter: ${birthChart.planets.jupiter.sign} at ${birthChart.planets.jupiter.degree}° in ${birthChart.planets.jupiter.house} house
Saturn: ${birthChart.planets.saturn.sign} at ${birthChart.planets.saturn.degree}° in ${birthChart.planets.saturn.house} house
Rahu (North Node): ${birthChart.planets.rahu.sign} at ${birthChart.planets.rahu.degree}° in ${birthChart.planets.rahu.house} house
Ketu (South Node): ${birthChart.planets.ketu.sign} at ${birthChart.planets.ketu.degree}° in ${birthChart.planets.ketu.house} house

Use this birth chart data to provide specific, personalized astrological insights to the user's questions.
` : "";

    // Convert messages to Google Gemini format
    const systemPrompt = getAstrologySystemPrompt(language) + chartContext;
    const contents = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as first user message
    contents.unshift({
      role: 'user',
      parts: [{ text: systemPrompt }]
    });

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:streamGenerateContent?key=${GOOGLE_GEMINI_API_KEY}&alt=sse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI service unavailable");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Error in astrology-chat:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
