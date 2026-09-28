import { CalendarDays } from "lucide-react";
import Widget from "../ui/Widget";

function Event({ event }) {
  return (
    <div className="event">
      <time className="event__time">{event.time}</time>

      <div className="event__dot" />

      <div>
        <strong>{event.title}</strong>
        <span>{event.subtitle}</span>
      </div>
    </div>
  );
}

export default function AgendaWidget({ events }) {
  const today = events.filter((event) => event.date === "today");
  const tomorrow = events.filter(
    (event) => event.date === "tomorrow",
  );

  return (
    <Widget
      title="Aujourd’hui"
      icon={<CalendarDays size={20} />}
      action="Voir tout ›"
      className="agenda-widget"
    >
      <div className="events">
        {today.map((event) => (
          <Event key={event.id} event={event} />
        ))}

        <div className="events__separator" />

        <h3>Demain</h3>

        {tomorrow.map((event) => (
          <Event key={event.id} event={event} />
        ))}
      </div>
    </Widget>
  );
}