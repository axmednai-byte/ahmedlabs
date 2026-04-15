import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    // Priority: LOCAL_LLM_URL env var > CodeWords proxy > default local URL
    const localUrl = process.env.LOCAL_LLM_URL || 'http://192.168.0.104:1234';
    const codewordsUri = process.env.CODEWORDS_RUNTIME_URI;
    const codewordsKey = process.env.CODEWORDS_API_KEY;

    // Determine which LLM endpoint to use
    const useCodewords = codewordsUri && codewordsKey;
    const baseUrl = useCodewords
      ? `${codewordsUri}/run/openai/v1`
      : `${localUrl}/v1`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (useCodewords) {
      headers['Authorization'] = `Bearer ${codewordsKey}`;
    }

    const model = useCodewords
      ? 'gpt-4.1-mini'
      : (process.env.LOCAL_MODEL_NAME || 'llama-3');

    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('LLM API error:', errText);
      return NextResponse.json(
        { content: `AI service error (${response.status}). Check your LLM connection.` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'No response generated.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { content: 'Connection failed. Make sure your LLM server is running.' },
      { status: 500 }
    );
  }
}

