import { useEffect, useState } from "react";
import { getWeather } from "./services/weatherService";
import Header from "./components/layout/Header";

import WeatherWidget from "./components/widgets/WeatherWidget";
import AgendaWidget from "./components/widgets/AgendaWidget";
import ShoppingWidget from "./components/widgets/ShoppingWidget";
import TasksWidget from "./components/widgets/TasksWidget";
import BottomBar from "./components/widgets/BottomBar";

import {
  addShoppingItem,
  addTask,
  getDashboard,
  toggleShoppingItem,
  toggleTask,
} from "./services/dashboardService";

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
  try {
    const dashboardData =
      await getDashboard();

    setDashboard(dashboardData);

    try {
      const weather =
        await getWeather();

      setDashboard((current) => ({
        ...current,
        weather,
      }));
    } catch (weatherError) {
      console.error(
        "Weather unavailable",
        weatherError,
      );
    }
  } catch (error) {
    console.error(error);

    setError(
      "Impossible de charger Doma.",
    );
  }
}

    loadDashboard();
  }, []);

  async function handleAddShopping(label) {
    const item = await addShoppingItem(label);

    setDashboard((current) => ({
      ...current,
      shopping: [
        ...current.shopping,
        item,
      ],
    }));
  }

  async function handleToggleShopping(id) {
    const updatedItem =
      await toggleShoppingItem(id);

    setDashboard((current) => ({
      ...current,

      shopping: current.shopping.map((item) =>
        item.id === id
          ? updatedItem
          : item,
      ),
    }));
  }

  async function handleAddTask(label) {
    const task = await addTask(label);

    setDashboard((current) => ({
      ...current,
      tasks: [
        ...current.tasks,
        task,
      ],
    }));
  }

  async function handleToggleTask(id) {
    const updatedTask =
      await toggleTask(id);

    setDashboard((current) => ({
      ...current,

      tasks: current.tasks.map((task) =>
        task.id === id
          ? updatedTask
          : task,
      ),
    }));
  }

  if (error) {
    return (
      <div className="dashboard-status">
        {error}
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="dashboard-status">
        Chargement…
      </div>
    );
  }

  return (
    <main className="dashboard">
      <Header />

      <div className="dashboard-grid">
        <WeatherWidget
          weather={dashboard.weather}
        />

        <AgendaWidget
          events={dashboard.events}
        />

        <ShoppingWidget
          items={dashboard.shopping}
          onAdd={handleAddShopping}
          onToggle={handleToggleShopping}
        />

        <TasksWidget
          tasks={dashboard.tasks}
          onAdd={handleAddTask}
          onToggle={handleToggleTask}
        />
      </div>

      <BottomBar
        dinner={dashboard.dinner}
        trash={dashboard.trash}
      />
    </main>
  );
}