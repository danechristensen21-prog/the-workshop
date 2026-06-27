import { useState } from "react";

export default function StickyNote({ note, onUpdate, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);

  function startDrag(event) {
    if (event.target.tagName === "TEXTAREA" || event.target.tagName === "BUTTON") {
      return;
    }

    event.preventDefault();
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
      onPointerDown={startDrag}
    >
      <button
        className="sticky-delete"
        type="button"
        onClick={() => onDelete(note.id)}
      >
        ×
      </button>

      <textarea
        value={note.text}
        onChange={(event) => onUpdate(note.id, { text: event.target.value })}
      />
    </div>
  );
}
