export async function generateEducationalContent(prompt) {
  if (!window.puter) {
    throw new Error("Puter.js is not loaded. Check index.html script tag.");
  }

  const fullPrompt = `
You are NexNena AI, a Sri Lankan Advanced Level education assistant.

Generate high-quality educational content for teachers.

Request:
${prompt}

Format:
- Clear title
- Structured explanation
- Bullet points
- Exam-focused style
- Student-friendly examples
`;

  const response = await window.puter.ai.chat(fullPrompt, {
    model: "gpt-5.4-nano",
  });

  return typeof response === "string" ? response : response.message?.content || String(response);
}