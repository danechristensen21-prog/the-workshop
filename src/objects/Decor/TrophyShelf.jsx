import { useWorkshop } from "../../systems/workshop/WorkshopProvider";

export default function TrophyShelf() {
  const { workshop } = useWorkshop();

  return (
    <div className="trophy-shelf-object">
      {workshop.trophies.map((trophy) => (
        <span key={trophy.id}>{trophy.unlocked ? "🏆" : "🔒"}</span>
      ))}
    </div>
  );
}
