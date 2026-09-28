import { Trash2, Utensils } from "lucide-react";

export default function BottomBar({ dinner, trash }) {
  return (
    <div className="bottom-bar">
      <div className="bottom-bar__item">
        <span className="bottom-bar__icon bottom-bar__icon--meal">
          <Utensils />
        </span>

        <div>
          <strong>Ce soir : {dinner.title}</strong>
          <span>{dinner.description}</span>
        </div>
      </div>

      <div className="bottom-bar__item">
        <span className="bottom-bar__icon bottom-bar__icon--trash">
          <Trash2 />
        </span>

        <div>
          <strong>{trash.title}</strong>
          <span>{trash.description}</span>
        </div>
      </div>
    </div>
  );
}