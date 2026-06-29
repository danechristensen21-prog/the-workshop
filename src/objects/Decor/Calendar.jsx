import { useWorkshop } from "../../systems/workshop/WorkshopProvider";

export default function Calendar() {
  const { workshop } = useWorkshop();

  const events = workshop.calendar?.events || [];
  const upcomingEvents = [...events]
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
    .slice(0, 3);

  return (
    <div className="calendar-object">
      <div className="calendar-header">
        <strong>Calendar</strong>
        <span>{events.length} items</span>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: 21 }).map((_, index) => (
          <div className="calendar-day" key={index}>
            {index + 1}
          </div>
        ))}
      </div>

      <div className="calendar-events">
        {upcomingEvents.map((event) => (
          <div
            className={`calendar-event calendar-event--${event.color}`}
            key={event.id}
          >
            <strong>{event.title}</strong>
            <small>{event.date}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
