import { useEffect, useState } from "react";

export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const date = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(now);

  const hour = now.getHours();

  let greeting = "Bonjour";

  if (hour >= 18) {
    greeting = "Bonsoir";
  }

  return {
    now,
    date,
    time,
    greeting,
  };
}