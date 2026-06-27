import { WorkshopProvider } from "./systems/workshop/WorkshopProvider";
import TopBar from "./components/TopBar";
import SidePanel from "./components/SidePanel";
import WorkshopRoom from "./room/WorkshopRoom";

export default function App() {
  return (
    <WorkshopProvider>
      <div className="app-shell">
        <TopBar />
        <WorkshopRoom />
        <SidePanel />
      </div>
    </WorkshopProvider>
  );
}
