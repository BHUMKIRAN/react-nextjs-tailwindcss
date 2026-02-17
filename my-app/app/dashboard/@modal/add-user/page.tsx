"use client";
import { useRouter } from "next/navigation";

export default function AddUserModal() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">Add User</h2>

        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={() => router.back()}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
