"use client";

import { useState, useRef } from "react";

type Task = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "Todo",
      tasks: [
        { id: "1", title: "Learn React" },
        { id: "2", title: "Understand Drag Logic" },
      ],
    },
    {
      id: "inProgress",
      title: "In Progress",
      tasks: [{ id: "3", title: "Build Kanban Board" }],
    },
    {
      id: "done",
      title: "Done",
      tasks: [{ id: "4", title: "Setup Project" }],
    },
  ]);

  // Store currently dragged item (NO dataTransfer usage)
  const draggedItem = useRef<{
    task: Task;
    fromColumnId: string;
    fromIndex: number;
  } | null>(null);

  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 🔹 When drag starts
  const handleDragStart = (
    task: Task,
    columnId: string,
    index: number
  ) => {
    draggedItem.current = {
      task,
      fromColumnId: columnId,
      fromIndex: index,
    };
  };

  // 🔹 When dropping on column
  const handleDrop = (toColumnId: string, toIndex?: number) => {
    const dragData = draggedItem.current;
    if (!dragData) return;

    const { task, fromColumnId, fromIndex } = dragData;

    setColumns((prev) =>
      prev.map((col) => {
        // Remove from source column
        if (col.id === fromColumnId) {
          const updatedTasks = [...col.tasks];
          updatedTasks.splice(fromIndex, 1);
          return { ...col, tasks: updatedTasks };
        }

        return col;
      }).map((col) => {
        // Add into target column
        if (col.id === toColumnId) {
          const updatedTasks = [...col.tasks];

          if (typeof toIndex === "number") {
            updatedTasks.splice(toIndex, 0, task);
          } else {
            updatedTasks.push(task);
          }

          return { ...col, tasks: updatedTasks };
        }

        return col;
      })
    );

    draggedItem.current = null;
    setHoveredColumn(null);
    setHoveredIndex(null);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {columns.map((column) => (
        <div
          key={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(column.id)}
          className={`bg-white p-4 rounded shadow min-h-[300px] ${
            hoveredColumn === column.id ? "bg-blue-50" : ""
          }`}
        >
          <h2 className="font-bold mb-4">{column.title}</h2>

          <div className="space-y-3">
            {column.tasks.map((task, index) => (
              <div
                key={task.id}
                draggable
                onDragStart={() =>
                  handleDragStart(task, column.id, index)
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  setHoveredColumn(column.id);
                  setHoveredIndex(index);
                }}
                onDrop={() =>
                  handleDrop(column.id, index)
                }
                onDragEnd={() => {
                  setHoveredColumn(null);
                  setHoveredIndex(null);
                }}
                className={`p-3 rounded cursor-grab ${
                  hoveredIndex === index &&
                  hoveredColumn === column.id
                    ? "border-2 border-blue-400"
                    : "bg-blue-100"
                }`}
              >
                {task.title}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}