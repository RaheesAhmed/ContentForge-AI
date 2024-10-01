import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const { research } = await request.json();
  const prompt = `Create an outline based on this research: ${research}`;
  
  try {
    const outlineData = await callOpenAI(prompt);
    return NextResponse.json({ outline: outlineData });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate outline" }, { status: 500 });
  }
}