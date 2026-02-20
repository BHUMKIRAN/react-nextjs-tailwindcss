a"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = {
  id: string;
  title: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

const initialData: ColumnType[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Learn Next.js" },
      { id: "2", title: "Build Kanban Board" },
    ],
  },
  {
    id: "inprogress",
    title: "In Progress",
    tasks: [{ id: "3", title: "Drag and Drop Feature" }],
  },
  {
    id: "done",
    title: "Done",
    tasks: [{ id: "4", title: "Project Setup" }],
  },
];

export default function Kanban() {
  const [columns, setColumns] = useState(initialData);

  const findColumn = (taskId: string) => {
    return columns.find((col) =>
      col.tasks.some((task) => task.id === taskId)
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceCol = findColumn(active.id as string);
    const targetCol = findColumn(over.id as string);

    if (!sourceCol || !targetCol) return;

    // Same column reorder
    if (sourceCol.id === targetCol.id) {
      const oldIndex = sourceCol.tasks.findIndex(
        (t) => t.id === active.id
      );
      const newIndex = targetCol.tasks.findIndex(
        (t) => t.id === over.id
      );

      const newTasks = arrayMove(sourceCol.tasks, oldIndex, newIndex);

      setColumns((prev) =>
        prev.map((col) =>
          col.id === sourceCol.id ? { ...col, tasks: newTasks } : col
        )
      );
    } else {
      // Move between columns
      const activeTask = sourceCol.tasks.find(
        (t) => t.id === active.id
      );

      if (!activeTask) return;

      setColumns((prev) =>
        prev.map((col) => {
          if (col.id === sourceCol.id) {
            return {
              ...col,
              tasks: col.tasks.filter((t) => t.id !== active.id),
            };
          }
          if (col.id === targetCol.id) {
            return {
              ...col,
              tasks: [...col.tasks, activeTask],
            };
          }
          return col;
        })
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {columns.map((column) => (
          <div
            key={column.id}
            style={{
              background: "#f4f4f4",
              padding: "20px",
              width: "300px",
              borderRadius: "8px",
            }}
          >
            <h3>{column.title}</h3>

            <SortableContext
              items={column.tasks.map((t) => t.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.tasks.map((task) => (
                <SortableItem key={task.id} id={task.id} title={task.title} />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
}

function SortableItem({ id, title }: { id: string; title: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "10px",
    background: "white",
    borderRadius: "6px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
}