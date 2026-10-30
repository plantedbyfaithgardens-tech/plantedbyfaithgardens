const CHARACTER_VOICES = {
  Tyson: "Y088xDcrJJM09VJADeKO",
  Shadow: "0z8S749Xe6jLCD34QXl1",
  Wiggles: "M5t0724ORuAGCh3p3DUR",
  Bruno: "fjgAVa6FpNYGo4UpjqML",
  Lorraine: "jUPSOpRcPt8GMPsWx5fy"
};

export default async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Use POST to generate character speech." }, { status: 405 });
  }

  const apiKey = Netlify.env.get("ELEVENLABS_API_KEY");
  if (!apiKey) {
    return Response.json({
      error: "The secure ELEVENLABS_API_KEY has not been added to this Netlify site yet."
    }, { status: 503 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Please send valid JSON with character and text." }, { status: 400 });
  }

  const character = typeof payload.character === "string" ? payload.character : "";
  const text = typeof payload.text === "string" ? payload.text.trim() : "";
  const voiceId = CHARACTER_VOICES[character];

  if (!voiceId) {
    return Response.json({ error: "That character does not have an assigned ElevenLabs voice." }, { status: 400 });
  }
  if (!text) {
    return Response.json({ error: "Please enter dialogue before generating speech." }, { status: 400 });
  }
  if (text.length > 1800) {
    return Response.json({ error: "Please generate one shorter dialogue line at a time (maximum 1,800 characters)." }, { status: 413 });
  }

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2"
        })
      }
    );

    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 500);
      return Response.json({
        error: upstream.status === 401 || upstream.status === 403
          ? "ElevenLabs rejected the API key or its permissions. Check the key in Netlify."
          : upstream.status === 429
            ? "ElevenLabs usage limit reached. Please check your plan or try again later."
            : `ElevenLabs could not generate this line (HTTP ${upstream.status}). ${detail}`
      }, { status: upstream.status === 429 ? 429 : 502 });
    }

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return Response.json({ error: "Could not reach ElevenLabs. Please try again when your connection is stable." }, { status: 502 });
  }
};
