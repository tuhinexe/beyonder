import { NextResponse } from "next/server";
import OpenAI from "openai";
import dedent from "dedent";

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: true, reply: "You Can add your API Key to chat" },
        { status: 200 }
      );
    }
    const openai = new OpenAI({
      apiKey: apiKey,
    });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    return NextResponse.json({
      success: true,
      reply: dedent(response.choices[0].message.content as string),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
