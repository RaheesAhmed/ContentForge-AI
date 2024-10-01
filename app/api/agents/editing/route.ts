import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const { content } = await request.json();
  const prompt = `Edit and refine the following content for clarity and style: ${content}`;
  
  try {
    const editedContent = await callOpenAI(prompt);
    return NextResponse.json({ editing: editedContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to edit content" }, { status: 500 });
  }
}