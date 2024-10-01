import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const { outline } = await request.json();
  const prompt = `Write a full article based on this outline: ${outline}`;
  
  try {
    const writtenContent = await callOpenAI(prompt);
    return NextResponse.json({ writing: writtenContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate written content" }, { status: 500 });
  }
}