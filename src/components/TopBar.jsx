import { useWorkshop } from "../systems/workshop/WorkshopProvider";

export default function TopBar() {
  const { resetWorkshop } = useWorkshop();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Private Creative HQ</p>
        <h1>The Workshop</h1>
      </div>

      <div className="topbar-actions">
        <button type="button">Room</button>
        <button type="button">Morning Mode</button>
        <button type="button" onClick={resetWorkshop}>
          Reset
        </button>
      </div>
    </header>
  );
}
