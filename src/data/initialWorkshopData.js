export const initialWorkshopData = {
  activePanel: null,
  activeObjectId: null,

  whiteboard: {
    notes: [
      {
        id: "note-1",
        text: "Workshop v0.2\nLiving Whiteboard",
        owner: "Shared",
        color: "yellow",
        x: 40,
        y: 45,
      },
      {
        id: "note-2",
        text: "Does this make us more excited to create?",
        owner: "Dane",
        color: "blue",
        x: 220,
        y: 82,
      },
      {
        id: "note-3",
        text: "Build the room like a game, not a dashboard.",
        owner: "Kas",
        color: "pink",
        x: 120,
        y: 190,
      },
    ],
  },

  projects: [
    {
      id: "project-1",
      title: "The Workshop",
      status: "Building",
      owner: "Shared",
      type: "Software",
      momentum: 12,
    },
    {
      id: "project-2",
      title: "Hot Dabs",
      status: "Dreaming",
      owner: "Dane",
      type: "Media",
      momentum: 4,
    },
    {
      id: "project-3",
      title: "Event System",
      status: "Planning",
      owner: "Kas",
      type: "Events",
      momentum: 6,
    },
  ],

  tasks: [
    {
      id: "task-1",
      owner: "Dane",
      text: "Build Workshop file structure",
      done: false,
      tag: "Code",
    },
    {
      id: "task-2",
      owner: "Dane",
      text: "Make whiteboard interactive",
      done: false,
      tag: "Whiteboard",
    },
    {
      id: "task-3",
      owner: "Kas",
      text: "Brainstorm first event room objects",
      done: false,
      tag: "Events",
    },
  ],

  trophies: [
    {
      id: "trophy-1",
      title: "First Room Built",
      unlocked: true,
    },
    {
      id: "trophy-2",
      title: "First Project Completed",
      unlocked: false,
    },
  ],
};
