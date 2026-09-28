import { Home, Settings, Wifi } from "lucide-react";
import { useClock } from "../../hooks/useClock";

export default function Header() {
  const { date, time, greeting } = useClock();

  return (
    <header className="dashboard-header">
      <div>
        <div className="brand">
          <Home size={20} />
          <span>Doma</span>
        </div>

        <h1 className="dashboard-date">{date}</h1>

        <p className="dashboard-greeting">
          {greeting} 👋
        </p>
      </div>

      <div className="dashboard-header__right">
        <div className="dashboard-icons">
          <Wifi size={20} />

          <button
            type="button"
            className="icon-button"
            aria-label="Paramètres"
          >
            <Settings size={20} />
          </button>
        </div>

        <div className="dashboard-clock">
          {time}
        </div>
      </div>
    </header>
  );
}