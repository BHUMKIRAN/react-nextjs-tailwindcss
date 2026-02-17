import Link from "next/link";

export default function UsersPage() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Users</h1>
        <Link
          href="/dashboard/add-user"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add User
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kiran</td>
            <td>kiran@mail.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
// this renders inside children slot of layout 