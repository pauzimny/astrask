import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources.js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { question, mode } = await req.json();

  const embeddingResp = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: question,
  });

  const queryEmbedding = embeddingResp.data[0].embedding;

  const { data: matches, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: 3,
  });

  if (error) {
    console.error("Supabase RPC error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const context =
    (matches as { content: string }[] | null)
      ?.map((m) => m.content)
      .join("\n") || "";

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content:
        mode === "quiz"
          ? "Ask the child short questions about space. Answer in simple language, using emojis and fun facts."
          : "You are a teacher of astronomy. Answer in simple language for a child aged 8-10 years, use emojis and fun facts.",
    },
    {
      role: "user",
      content: `Context:\n${context}\n\nQuestion: ${question}`,
    },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  const answer = completion.choices[0].message?.content ?? "";

  return NextResponse.json({
    answer,
    sources: matches,
  });
}
