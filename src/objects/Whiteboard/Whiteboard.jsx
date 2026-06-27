import "./Whiteboard.css";
import StickyNote from "./StickyNote";
import { useWorkshop } from "../../systems/workshop/WorkshopProvider";

export default function Whiteboard() {
  const { workshop, addSticky, updateSticky, deleteSticky } = useWorkshop();
  const notes = workshop.whiteboard.notes;

  return (
    <section className="whiteboard-object" onClick={(event) => event.stopPropagation()}>
      <div className="whiteboard-toolbar">
        <button type="button" onClick={() => addSticky("yellow")}>+ Yellow</button>
        <button type="button" onClick={() => addSticky("pink")}>+ Pink</button>
        <button type="button" onClick={() => addSticky("blue")}>+ Blue</button>
      </div>

      <div className="whiteboard-canvas">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={updateSticky}
            onDelete={deleteSticky}
          />
        ))}
      </div>
    </section>
  );
}
