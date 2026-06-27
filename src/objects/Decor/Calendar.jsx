import { useWorkshop } from "../../systems/workshop/WorkshopProvider";

export default function Calendar() {
  const { workshop } = useWorkshop();

  const events = workshop.calendar?.events || [];

  return (
    <div className="calendar-object">
      <div className="calendar-header">
        <strong>Calendar</strong>
        <span>Jun</span>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: 21 }).map((_, index) => (
          <div className="calendar-day" key={index}>
            {index + 1}
          </div>
        ))}
      </div>

      <div className="calendar-events">
        {events.slice(0, 2).map((event) => (
          <div className="calendar-event" key={event.id}>
            {event.title}
          </div>
        ))}
      </div>
    </div>
  );
}
