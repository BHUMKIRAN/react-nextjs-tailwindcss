"use client";
import { useState } from "react";

function EditableList() {
  const [users, setUsers] = useState([
    { id: 1, name: "Kiran", editing: false },
    { id: 2, name: "ohn", editing: false },
    { id: 3, name: "Alice", editing: false },
  ]);

  const toggleEdit = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, editing: !u.editing } : u))
    );
  };

  const updateName = (id, name) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, name } : u)));
  };

  return (
    <div>
      {users.map((u) => (
        <div key={u.id}>
          {u.editing ? (
            <input
              value={u.name}
              onChange={(e) => updateName(u.id, e.target.value)}
            />
          ) : (
            <span>{u.name}</span>
          )}
          <button onClick={() => toggleEdit(u.id)}>
            {u.editing ? "Save" : "Edit"}
          </button>
        </div>
      ))}
    </div>
  );
}
export default EditableList;
