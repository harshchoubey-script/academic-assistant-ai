import dotenv from "dotenv";

dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,

  baseURL:
    "https://openrouter.ai/api/v1",
});

export const generateSummary = async (
  text: string
) => {
  const completion =
    await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content:
            "You are a helpful study assistant.",
        },

        {
          role: "user",
          content: `
Summarize the following study material
into clean student-friendly notes:

${text}
`,
        },
      ],
    });

  return (
    completion.choices[0].message
      .content || "No summary generated"
  );
};

export const generateFlashcards =
  async (text: string) => {
    const completion =
      await openai.chat.completions.create({
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content:
              "You are a study assistant that creates flashcards.",
          },

          {
            role: "user",
            content: `
Generate 5 flashcards from the following study material.

Return ONLY valid JSON array format.

Example:
[
  {
    "question": "What is DBMS?",
    "answer": "Database Management System"
  }
]

Study Material:
${text}
`,
          },
        ],
      });

    return (
      completion.choices[0].message
        .content || "[]"
    );
  };

  export const generateQuiz = async (
  text: string
) => {
  const completion =
    await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content:
            "You are a study assistant that creates MCQs.",
        },

        {
          role: "user",
          content: `
Generate 5 multiple choice questions from the following study material.

Return ONLY valid JSON array.

Example:
[
  {
    "question": "What is DBMS?",
    "optionA": "Database Management System",
    "optionB": "Operating System",
    "optionC": "Compiler",
    "optionD": "CPU",
    "correctAnswer": "Database Management System"
  }
]

Study Material:
${text}
`,
        },
      ],
    });

  return (
    completion.choices[0].message
      .content || "[]"
  );
};