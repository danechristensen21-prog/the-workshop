import { useWorkshop } from "../../systems/workshop/WorkshopProvider";

export default function Desk({ object }) {
  const { workshop } = useWorkshop();
  const tasks = workshop.tasks.filter((task) => task.owner === object.owner).slice(0, 3);

  return (
    <div className={`desk-object desk-object--${object.owner.toLowerCase()}`}>
      <div className="desk-screen">
        <strong>{object.owner}</strong>
        <small>{object.owner === "Dane" ? "BUILD MODE" : "EVENT MODE"}</small>
      </div>

      <div className="desk-task-stack">
        {tasks.map((task) => (
          <div className="desk-task" key={task.id}>
            {task.done ? "✓ " : ""}
            {task.text}
          </div>
        ))}
      </div>

      <div className="desk-coffee">☕</div>
    </div>
  );
}
