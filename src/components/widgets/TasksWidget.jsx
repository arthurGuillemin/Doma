import { useState } from "react";
import { Check, Plus } from "lucide-react";

import Widget from "../ui/Widget";
import Modal from "../ui/Modal";
import Checkbox from "../ui/Checkbox";

export default function TasksWidget({
  tasks,
  onAdd,
  onToggle,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [label, setLabel] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const value = label.trim();

    if (!value) return;

    await onAdd(value);

    setLabel("");
    setModalOpen(false);
  }

  return (
    <>
      <Widget
        title="À faire"
        icon={<Check size={20} />}
        action="Voir tout ›"
        className="tasks-widget"
      >
        <div className="list">
          {tasks.map((task) => (
            <div
              className={`list-item ${
                task.completed
                  ? "list-item--completed"
                  : ""
              }`}
              key={task.id}
            >
              <Checkbox
                checked={task.completed}
                label={`Terminer ${task.label}`}
                onChange={() => onToggle(task.id)}
              />

              <span className="list-item__text">
                {task.label}
              </span>

              {task.due && (
                <span className="list-item__badge">
                  {task.due}
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="widget-add widget-add--orange"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={20} />
          Ajouter une tâche
        </button>
      </Widget>

      <Modal
        open={modalOpen}
        title="Ajouter une tâche"
        onClose={() => setModalOpen(false)}
      >
        <form
          className="add-form"
          onSubmit={handleSubmit}
        >
          <label>
            Tâche

            <input
              autoFocus
              type="text"
              value={label}
              onChange={(event) =>
                setLabel(event.target.value)
              }
              placeholder="Ex. Arroser les plantes"
            />
          </label>

          <button
            className="primary-button"
            type="submit"
          >
            Ajouter
          </button>
        </form>
      </Modal>
    </>
  );
}