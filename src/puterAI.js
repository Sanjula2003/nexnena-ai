export async function generateEducationalContent(prompt) {
  if (!window.puter || !window.puter.ai) {
    throw new Error("Puter.js is not loaded. Check your index.html script tag.");
  }

  const fullPrompt = `
You are NexNena AI, a Sri Lankan Advanced Level education assistant.

Generate high-quality educational content for tuition teachers.

Teacher Request:
${prompt}

Output Format:
# Clear Title

## Short Introduction

## Main Explanation

## Key Points

## Student-Friendly Example

## Exam Tips

## Quick Summary

Use a clear, professional, student-friendly style.
`;

  const response = await window.puter.ai.chat(fullPrompt, {
    model: "gpt-4o-mini",
  });

  if (typeof response === "string") {
    return response;
  }

  if (response?.message?.content) {
    return response.message.content;
  }

  if (response?.content) {
    return response.content;
  }

  return JSON.stringify(response, null, 2);
}