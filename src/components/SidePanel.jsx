import { useState } from "react";
import { useWorkshop } from "../systems/workshop/WorkshopProvider";

export default function SidePanel() {
  const {
    workshop,
    closePanel,
    toggleTask,
    addCalendarEvent,
    deleteCalendarEvent,
  } = useWorkshop();

  if (!workshop.activePanel) return null;

  const daneTasks = workshop.tasks.filter((task) => task.owner === "Dane");
  const kasTasks = workshop.tasks.filter((task) => task.owner === "Kas");

  return (
    <aside className="side-panel">
      <button className="close-button" onClick={closePanel}>
        ×
      </button>

      <h2>{workshop.activePanel}</h2>

      {workshop.activePanel === "Dane's Desk" && (
        <TaskList tasks={daneTasks} onToggle={toggleTask} />
      )}

      {workshop.activePanel === "Kas's Desk" && (
        <TaskList tasks={kasTasks} onToggle={toggleTask} />
      )}

      {workshop.activePanel === "Shared Calendar" && (
        <CalendarPanel
          events={workshop.calendar?.events || []}
          sources={workshop.calendar?.sources || []}
          onAdd={addCalendarEvent}
          onDelete={deleteCalendarEvent}
        />
      )}

      {workshop.activePanel === "Record Player" && (
        <div className="spotify-panel">
          <p>Workshop music station.</p>

          <iframe
            className="spotify-embed"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          />
        </div>
      )}

      {workshop.activePanel === "Trophy Shelf" && (
        <div className="panel-list">
          {workshop.trophies.map((trophy) => (
            <div className="panel-card" key={trophy.id}>
              <strong>
                {trophy.unlocked ? "🏆" : "🔒"} {trophy.title}
              </strong>
            </div>
          ))}
        </div>
      )}

      {workshop.activePanel === "File Cabinet" && (
        <p>
          Future home for Google Drive, images, documents, pitch decks, logos,
          and project files.
        </p>
      )}

      {workshop.activePanel === "Coffee Station" && (
        <p>
          Future morning dashboard: weather, today’s focus, music, and creative
          warmup.
        </p>
      )}
    </aside>
  );
}

function CalendarPanel({ events, sources, onAdd, onDelete }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [owner, setOwner] = useState("Shared");
  const [color, setColor] = useState("yellow");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");

  const sortedEvents = [...events].sort((a, b) =>
    `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
  );

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !date) return;

    onAdd({
      title: title.trim(),
      date,
      time,
      owner,
      color,
      location: location.trim(),
      details: details.trim(),
    });

    setTitle("");
    setDate("");
    setTime("");
    setOwner("Shared");
    setColor("yellow");
    setLocation("");
    setDetails("");
  }

  return (
    <div className="calendar-panel">
      <div className="calendar-sources">
        <h3>Calendar Sources</h3>

        {sources.map((source) => (
          <div className="calendar-source-pill" key={source.id}>
            <span>{source.connected ? "●" : "○"}</span>
            <strong>{source.name}</strong>
            <small>{source.connected ? "Connected" : "Ready later"}</small>
          </div>
        ))}
      </div>

      <form className="calendar-form" onSubmit={handleSubmit}>
        <h3>Add Calendar Item</h3>

        <input
          value={title}
          placeholder="Title..."
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
        />

        <select value={owner} onChange={(event) => setOwner(event.target.value)}>
          <option>Dane</option>
          <option>Kas</option>
          <option>Shared</option>
          <option>Hannah B</option>
        </select>

        <select value={color} onChange={(event) => setColor(event.target.value)}>
          <option value="yellow">Yellow — Event</option>
          <option value="green">Green — Work Schedule</option>
          <option value="blue">Blue — Meeting</option>
          <option value="pink">Pink — Content</option>
          <option value="purple">Purple — Personal</option>
        </select>

        <input
          value={location}
          placeholder="Location..."
          onChange={(event) => setLocation(event.target.value)}
        />

        <textarea
          value={details}
          placeholder="Details..."
          onChange={(event) => setDetails(event.target.value)}
        />

        <button type="submit">+ Add to Calendar</button>
      </form>

      <div className="calendar-panel-list">
        <h3>Upcoming</h3>

        {sortedEvents.map((event) => (
          <div
            className={`calendar-panel-card calendar-panel-card--${event.color}`}
            key={event.id}
          >
            <strong>{event.title}</strong>

            <small>
              {event.date}
              {event.time && ` · ${event.time}`} · {event.owner}
            </small>

            {event.location && <p>📍 {event.location}</p>}
            {event.details && <p>{event.details}</p>}

            <div className="calendar-card-meta">
              <span>{event.source}</span>
              <span>{event.syncStatus}</span>
            </div>

            <button type="button" onClick={() => onDelete(event.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
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
