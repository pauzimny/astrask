import { NextResponse } from "next/server.js";
import OpenAI from "openai";

const askQuizQuestionPrompt = `Wygeneruj 5 pytań quizowych o kosmosie w języku polskim. 
Każde pytanie ma mieć 3 możliwe odpowiedzi (A, B, C) i oznaczoną poprawną odpowiedź. 
Zwróć dane w czystym JSON o strukturze:
{ quiz: [
  {
    "question": "Pytanie...",
    "options": ["A", "B", "C"],
    "correct": 0
  }
]},
gdzie "correct" to indeks poprawnej odpowiedzi w tablicy options.`;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: askQuizQuestionPrompt,
        },
      ],
      temperature: 0.7,
    });

    const raw = completion.choices[0].message?.content;

    console.log("raw", raw);

    if (!raw) {
      return NextResponse.json(
        { error: "No content from OpenAI" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(raw);

    return NextResponse.json(parsed?.quiz);
  } catch (error: any) {
    console.error("Quiz route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
