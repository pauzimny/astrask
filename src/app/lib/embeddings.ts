import fs from "node:fs";

import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function uploadEmbeddings(filePath: string) {
  const text = fs.readFileSync(filePath, "utf-8");

  const chunks = text.match(/.{1,500}/g) || [];

  for (const chunk of chunks) {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: chunk,
    });

    const embedding = response.data[0].embedding;

    const { error } = await supabase.from("documents").insert({
      content: chunk,
      embedding: embedding,
    });

    if (error) {
      throw new Error(
        `Supabase insert failed: ${error.message} (code: ${error.code})`
      );
    }
  }

  console.log(`✅ Embeddings from ${filePath} uploaded to Supabase`);
}
