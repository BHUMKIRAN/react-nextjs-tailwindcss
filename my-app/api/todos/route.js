export async function GET() {
  const todos = [
    { id: 1, task: 'Learn Next.js' },
    { id: 2, task: 'Learn Tailwind CSS' },
    { id: 3, task: 'Push code to GitHub' },
  ];
  return new Response(JSON.stringify(todos), { status: 200 });
}
