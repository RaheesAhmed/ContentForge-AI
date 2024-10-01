import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const { topic } = await request.json();
  const prompt = `Provide a brief research summary on the topic: ${topic}`;
  
  try {
    const researchData = await callOpenAI(prompt);
    return NextResponse.json({ research: researchData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate research data" }, { status: 500 });
  }
}