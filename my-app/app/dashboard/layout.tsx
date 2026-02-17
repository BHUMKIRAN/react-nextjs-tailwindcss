import Link from "next/link";

export default function DashboardLayout({
  children,
  analytics,
  activity,
  modal
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  activity: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen relative">

      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <Link href="/dashboard">Users</Link>
      </aside>

      {/* Main Section */}
      <main className="flex-1 grid grid-cols-3 gap-4 p-6">

        {/* Main Content */}
        <div className="col-span-2 bg-white shadow p-4 rounded">
          {children}
        </div>

        {/* Analytics + Activity */}
        <div className="space-y-4">
          <div className="bg-white shadow p-4 rounded">
            {analytics}
          </div>

          <div className="bg-white shadow p-4 rounded">
            {activity}
          </div>
        </div>

      </main>

      {/* Modal Slot */}
      {modal}

    </div>
  );
}
