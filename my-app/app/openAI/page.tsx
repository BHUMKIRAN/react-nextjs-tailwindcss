import OpenAI from "openai";

// Initialize OpenAI client with API key from environment
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function Page() {
    
  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    instructions: "Talk like a pirate.",
    input: "Are semicolons optional in JavaScript?",
  });

  return (
    <div>
      <h1>AI Response</h1>
      <p>{response.output_text}</p>
    </div>
  );
}