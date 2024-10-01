import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

export async function POST(request: Request) {
  const { content } = await request.json();
  const prompt = `Optimize the following content for search engines: ${content}`;
  
  try {
    const seoOptimizedContent = await callOpenAI(prompt);
    return NextResponse.json({ seo: seoOptimizedContent });
  } catch (error) {
    return NextResponse.json({ error: "Failed to optimize content for SEO" }, { status: 500 });
  }
}