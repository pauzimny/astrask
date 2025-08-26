export const askAstro = async (question: string) => {
  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, mode: "ask" }),
  });
  const data = await res.json();
  return data.answer;
};
