export const mockDashboard = {
  weather: {
    location: "Cormeilles",
    temperature: 18,
    condition: "Ensoleillé",
    min: 12,
    max: 21,

    hourly: [
      { time: "19h", temperature: 18, condition: "sun" },
      { time: "20h", temperature: 17, condition: "sun" },
      { time: "21h", temperature: 16, condition: "moon" },
      { time: "22h", temperature: 15, condition: "moon" },
      { time: "23h", temperature: 14, condition: "cloud" },
    ],

    forecast: [
      { day: "Mar", condition: "sun", max: 22, min: 12 },
      { day: "Mer", condition: "cloud", max: 20, min: 11 },
      { day: "Jeu", condition: "rain", max: 19, min: 11 },
    ],
  },

  events: [
    {
      id: 1,
      date: "today",
      time: "19:00",
      title: "Dîner",
      subtitle: "À la maison",
      type: "meal",
    },
    {
      id: 2,
      date: "today",
      time: "20:30",
      title: "Appeler maman",
      subtitle: "5 min",
      type: "call",
    },
    {
      id: 3,
      date: "tomorrow",
      time: "09:00",
      title: "Kiné",
      subtitle: "Cabinet du centre",
      type: "appointment",
    },
    {
      id: 4,
      date: "tomorrow",
      time: "18:00",
      title: "Cours de piano",
      subtitle: "45 min",
      type: "music",
    },
  ],

  shopping: [
    { id: 1, label: "Lait", checked: false },
    { id: 2, label: "Café", checked: false },
    { id: 3, label: "Tomates", checked: false },
    { id: 4, label: "Pâtes", checked: false },
    { id: 5, label: "Lessive", checked: false },
  ],

  tasks: [
    {
      id: 1,
      label: "Sortir la poubelle",
      completed: false,
      due: "Demain",
    },
    {
      id: 2,
      label: "Commander les filtres pour la cafetière",
      completed: false,
    },
    {
      id: 3,
      label: "Arroser les plantes",
      completed: false,
    },
    {
      id: 4,
      label: "Ranger le garage",
      completed: false,
    },
  ],

  dinner: {
    title: "Carbonara",
    description: "Pâtes, lardons, parmesan",
  },

  trash: {
    title: "Poubelles : demain",
    description: "Ordures ménagères",
  },
};