"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  DragOverEvent,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
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
  { id: "todo", title: "To Do", tasks: [{ id: "1", title: "Learn Next.js" }] },
  { id: "inprogress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

export default function Kanban() {
  const [columns, setColumns] = useState<ColumnType[]>(initialData);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // --- NEW: ADD TASK FUNCTION ---
  const addTask = (columnId: string) => {
    const title = window.prompt("Enter task title:");
    if (!title) return;

    const newTask: Task = {
      id: crypto.randomUUID(), // Generates a unique ID
      title,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  // --- NEW: DELETE TASK FUNCTION ---
  const deleteTask = (taskId: string) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId),
      }))
    );
  };

  // Helper to find column by ID or Task ID
  const findColumn = (id: string) => {
    const colByTask = columns.find((col) => col.tasks.some((t) => t.id === id));
    if (colByTask) return colByTask;
    return columns.find((col) => col.id === id);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = columns.flatMap((c) => c.tasks).find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeCol = findColumn(activeId);
    const overCol = findColumn(overId);

    if (!activeCol || !overCol || activeCol.id === overCol.id) return;

    setColumns((prev) => {
      const activeTasks = [...activeCol.tasks];
      const overTasks = [...overCol.tasks];
      const activeIndex = activeTasks.findIndex((t) => t.id === activeId);
      if (activeIndex < 0) return prev;
      const taskToMove = activeTasks[activeIndex];
      if (!taskToMove) return prev;

      return prev.map((col) => {
        if (col.id === activeCol.id) return { ...col, tasks: activeTasks.filter((t) => t.id !== activeId) };
        if (col.id === overCol.id) return { ...col, tasks: [...overTasks, taskToMove] };
        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;
    const activeCol = findColumn(activeId);
    const overCol = findColumn(overId);

    if (activeCol && overCol && activeCol.id === overCol.id) {
      const oldIndex = activeCol.tasks.findIndex((t) => t.id === activeId);
      const newIndex = overCol.tasks.findIndex((t) => t.id === overId);
      if (oldIndex >= 0 && newIndex >= 0 && oldIndex !== newIndex) {
        setColumns((prev) =>
          prev.map((col) => (col.id === activeCol.id ? { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) } : col))
        );
      }
    }
    setActiveTask(null);
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>Project Board</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={boardStyle}>
          {columns.map((column) => (
            <Column key={column.id} column={column} onAddTask={addTask} onDeleteTask={deleteTask} />
          ))}
        </div>

        <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.5" } } }) }}>
          {activeTask ? <Item title={activeTask.title} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// --- COLUMN COMPONENT ---
function Column({ column, onAddTask, onDeleteTask }: { column: ColumnType; onAddTask: (id: string) => void; onDeleteTask: (id: string) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div ref={setNodeRef} style={{ ...columnStyle, ...(isOver ? columnOverStyle : {}) }}>
      <div style={columnHeaderStyle}>
        <h3 style={columnTitleStyle}>{column.title}</h3>
        {/* Add Button */}
        <button onClick={() => onAddTask(column.id)} style={addBtnStyle}>+</button>
      </div>
      
      <SortableContext items={column.tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ minHeight: "100px" }}>
          {column.tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} title={task.title} onDelete={onDeleteTask} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

// --- SORTABLE ITEM WRAPPER ---
function SortableItem({ id, title, onDelete }: { id: string; title: string; onDelete: (id: string) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Item title={title} onDelete={() => onDelete(id)} />
    </div>
  );
}

// --- UI CARD ITEM ---
function Item({ title, isOverlay, onDelete }: { title: string; isOverlay?: boolean; onDelete?: () => void }) {
  return (
    <div style={{ ...itemStyle, ...(isOverlay ? overlayStyle : {}) }}>
      <span>{title}</span>
      {/* Delete Button (Hidden during drag overlay) */}
      {!isOverlay && onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevents drag from triggering when clicking delete
            onDelete();
          }} 
          style={deleteBtnStyle}
        >
          x
        </button>
      )}
    </div>
  );
}

/* --- STYLES --- */

const containerStyle: React.CSSProperties = { padding: "40px", backgroundColor: "#0f172a", minHeight: "100vh", color: "white", fontFamily: "sans-serif" };
const boardStyle: React.CSSProperties = { display: "flex", gap: "20px", alignItems: "flex-start" };
const columnStyle: React.CSSProperties = { background: "#1e293b", padding: "16px", width: "300px", borderRadius: "12px" };
const columnOverStyle: React.CSSProperties = { outline: "2px solid #38bdf8", outlineOffset: "2px" };
const columnHeaderStyle: React.CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" };
const columnTitleStyle: React.CSSProperties = { fontSize: "14px", textTransform: "uppercase", color: "#94a3b8" };

const itemStyle: React.CSSProperties = { 
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "12px", marginBottom: "8px", background: "#334155", borderRadius: "8px", 
  cursor: "grab", border: "1px solid #475569", color: "#f8fafc" 
};

const addBtnStyle: React.CSSProperties = {
  background: "#38bdf8", border: "none", borderRadius: "4px", color: "#0f172a", 
  width: "24px", height: "24px", cursor: "pointer", fontWeight: "bold"
};

const deleteBtnStyle: React.CSSProperties = {
  background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px"
};

const overlayStyle: React.CSSProperties = { cursor: "grabbing", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)", border: "1px solid #38bdf8" };

