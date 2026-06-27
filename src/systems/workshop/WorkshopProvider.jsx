import { createContext, useContext } from "react";
import { initialWorkshopData } from "../../data/initialWorkshopData";
import { useLocalStorage } from "../storage/useLocalStorage";

const WorkshopContext = createContext(null);

export function WorkshopProvider({ children }) {
  const [workshop, setWorkshop] = useLocalStorage(
    "the-workshop-data",
    initialWorkshopData
  );

  function openPanel(panelName, objectId = null) {
    setWorkshop((current) => ({
      ...current,
      activePanel: panelName,
      activeObjectId: objectId,
    }));
  }

  function closePanel() {
    setWorkshop((current) => ({
      ...current,
      activePanel: null,
      activeObjectId: null,
    }));
  }

  function resetWorkshop() {
    const confirmed = confirm("Reset The Workshop demo data?");
    if (!confirmed) return;
    setWorkshop(initialWorkshopData);
  }

  function addSticky(color = "yellow") {
    const note = {
      id: crypto.randomUUID(),
      text: "New idea...",
      owner: "Shared",
      color,
      x: 80,
      y: 80,
    };

    setWorkshop((current) => ({
      ...current,
      whiteboard: {
        ...current.whiteboard,
        notes: [...current.whiteboard.notes, note],
      },
    }));
  }

  function updateSticky(noteId, updates) {
    setWorkshop((current) => ({
      ...current,
      whiteboard: {
        ...current.whiteboard,
        notes: current.whiteboard.notes.map((note) =>
          note.id === noteId ? { ...note, ...updates } : note
        ),
      },
    }));
  }

  function deleteSticky(noteId) {
    setWorkshop((current) => ({
      ...current,
      whiteboard: {
        ...current.whiteboard,
        notes: current.whiteboard.notes.filter((note) => note.id !== noteId),
      },
    }));
  }

  function toggleTask(taskId) {
    setWorkshop((current) => ({
      ...current,
      tasks: current.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      ),
    }));
  }

  return (
    <WorkshopContext.Provider
      value={{
        workshop,
        openPanel,
        closePanel,
        resetWorkshop,
        addSticky,
        updateSticky,
        deleteSticky,
        toggleTask,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  );
}

export function useWorkshop() {
  const context = useContext(WorkshopContext);

  if (!context) {
    throw new Error("useWorkshop must be used inside WorkshopProvider");
  }

  return context;
}
