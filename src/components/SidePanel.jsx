import { useWorkshop } from "../systems/workshop/WorkshopProvider";

export default function SidePanel() {
  const { workshop, closePanel, toggleTask } = useWorkshop();

  if (!workshop.activePanel) return null;

  const daneTasks = workshop.tasks.filter((task) => task.owner === "Dane");
  const kasTasks = workshop.tasks.filter((task) => task.owner === "Kas");

  return (
    <aside className="side-panel">
      <button className="close-button" onClick={closePanel}>
        ×
      </button>

      <h2>{workshop.activePanel}</h2>

      {workshop.activePanel === "Living Whiteboard" && (
        <p>The whiteboard is now the main application surface.</p>
      )}

      {workshop.activePanel === "Dane's Desk" && (
        <TaskList tasks={daneTasks} onToggle={toggleTask} />
      )}

      {workshop.activePanel === "Kas's Desk" && (
        <TaskList tasks={kasTasks} onToggle={toggleTask} />
      )}

      {workshop.activePanel === "Trophy Shelf" && (
        <div className="panel-list">
          {workshop.trophies.map((trophy) => (
            <div className="panel-card" key={trophy.id}>
              <strong>{trophy.unlocked ? "🏆" : "🔒"} {trophy.title}</strong>
            </div>
          ))}
        </div>
      )}

      {workshop.activePanel === "File Cabinet" && (
        <p>Future home for images, documents, pitch decks, logos, and project files.</p>
      )}

      {workshop.activePanel === "Coffee Station" && (
        <p>Future morning dashboard: weather, today’s focus, music, and creative warmup.</p>
      )}
    </aside>
  );
}

function TaskList({ tasks, onToggle }) {
  return (
    <div className="panel-list">
      {tasks.map((task) => (
        <label className="panel-card" key={task.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.text}</span>
          <small>{task.tag}</small>
        </label>
      ))}
    </div>
  );
}
