import { useState } from "react";

export default function StickyNote({ note, onUpdate, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);

  function startDrag(event) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);

    const startX = event.clientX;
    const startY = event.clientY;
    const originalX = note.x;
    const originalY = note.y;

    function move(moveEvent) {
      onUpdate(note.id, {
        x: originalX + moveEvent.clientX - startX,
        y: originalY + moveEvent.clientY - startY,
      });
    }

    function stop() {
      setIsDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", stop);
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", stop);
  }

  return (
    <div
      className={`sticky-note sticky-note--${note.color} ${
        isDragging ? "sticky-note--dragging" : ""
      }`}
      style={{ left: note.x, top: note.y }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="sticky-drag-handle" onPointerDown={startDrag}>
        <span>{note.owner}</span>

        <button
          className="sticky-delete"
          type="button"
          onClick={() => onDelete(note.id)}
        >
          ×
        </button>
      </div>

      <textarea
        value={note.text}
        onChange={(event) => onUpdate(note.id, { text: event.target.value })}
      />
    </div>
  );
}
