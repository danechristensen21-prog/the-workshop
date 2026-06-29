export const initialWorkshopData = {
  activePanel: null,
  activeObjectId: null,
  whiteboardFocused: false,

  whiteboard: {
    drawing: null,
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
    ],
  },

  calendar: {
    sources: [
      {
        id: "workshop-main",
        name: "Workshop",
        type: "local",
        connected: true,
      },
      {
        id: "google-dane",
        name: "Dane Google Calendar",
        type: "google",
        connected: false,
      },
      {
        id: "google-kas",
        name: "Kas Google Calendar",
        type: "google",
        connected: false,
      },
    ],

    events: [
      {
        id: "event-1",
        source: "workshop",
        calendarId: "workshop-main",
        externalId: null,
        syncStatus: "local",
        title: "Workshop Build Night",
        date: "2026-06-29",
        time: "7:00 PM",
        owner: "Shared",
        color: "yellow",
        location: "The Workshop",
        details: "Build the calendar system and keep it Google-ready.",
      },
      {
        id: "event-2",
        source: "workshop",
        calendarId: "workshop-main",
        externalId: null,
        syncStatus: "local",
        title: "Content Planning",
        date: "2026-06-30",
        time: "11:00 AM",
        owner: "Dane",
        color: "blue",
        location: "",
        details: "Hot Dabs, DTG media, and local brand ideas.",
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
