import { useWorkshop } from "../systems/workshop/WorkshopProvider";

export default function RoomObject({ object, children }) {
  const { openPanel } = useWorkshop();

  return (
    <button
      className={`room-object room-object--${object.type}`}
      style={{
        left: `${object.x}%`,
        top: `${object.y}%`,
        width: `${object.width}%`,
        height: `${object.height}%`,
      }}
      onClick={() => openPanel(object.name, object.id)}
      type="button"
    >
      {children}
      <span className="object-label">{object.name}</span>
    </button>
  );
}
