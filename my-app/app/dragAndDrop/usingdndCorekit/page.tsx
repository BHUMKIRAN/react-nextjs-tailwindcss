import Kanban from "./kanban";

export default function Page() {
  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "20px" }}>Next.js Kanban Board</h1>
      <Kanban />
    </main>
  );
}