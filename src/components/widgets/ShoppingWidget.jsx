import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";

import Widget from "../ui/Widget";
import Modal from "../ui/Modal";
import Checkbox from "../ui/Checkbox";

export default function ShoppingWidget({
  items,
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
        title="Courses"
        icon={<ShoppingCart size={20} />}
        action="Voir tout ›"
        className="shopping-widget"
      >
        <div className="list">
          {items.map((item) => (
            <div
              className={`list-item ${
                item.checked
                  ? "list-item--completed"
                  : ""
              }`}
              key={item.id}
            >
              <Checkbox
                checked={item.checked}
                label={`Cocher ${item.label}`}
                onChange={() => onToggle(item.id)}
              />

              <span className="list-item__text">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <button
          className="widget-add widget-add--green"
          type="button"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={20} />
          Ajouter un article
        </button>
      </Widget>

      <Modal
        open={modalOpen}
        title="Ajouter aux courses"
        onClose={() => setModalOpen(false)}
      >
        <form
          className="add-form"
          onSubmit={handleSubmit}
        >
          <label>
            Article

            <input
              autoFocus
              type="text"
              value={label}
              onChange={(event) =>
                setLabel(event.target.value)
              }
              placeholder="Ex. Pain"
            />
          </label>

          <button
            type="submit"
            className="primary-button"
          >
            Ajouter
          </button>
        </form>
      </Modal>
    </>
  );
}