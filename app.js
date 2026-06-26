const defaultData = {
  stickies: [
    { id: crypto.randomUUID(), text: "Film budtender challenge pilot", owner: "Dane" },
    { id: crypto.randomUUID(), text: "Build company homepage", owner: "Kas" },
    { id: crypto.randomUUID(), text: "Ask Bri about photo shoots", owner: "Dane" }
  ],
  projects: [
    { id: crypto.randomUUID(), title: "DTG Website", status: "Building", owner: "Dane", due: "Jul 15" },
    { id: crypto.randomUUID(), title: "Hot Dabs", status: "Dreaming", owner: "Dane", due: "Aug 1" },
    { id: crypto.randomUUID(), title: "Green Labs Drop Boxes", status: "Planning", owner: "Kas", due: "Jul 30" },
    { id: crypto.randomUUID(), title: "DTG Merch Line", status: "Concept", owner: "Dane", due: "Aug 20" }
  ],
  tasks: [
    { id: crypto.randomUUID(), owner: "Dane", text: "Update DTG homepage", done: false, tag: "Website" },
    { id: crypto.randomUUID(), owner: "Dane", text: "Build Hot Dabs landing page", done: false, tag: "Hot Dabs" },
    { id: crypto.randomUUID(), owner: "Dane", text: "Set up Shopify store", done: false, tag: "Shopify" },
    { id: crypto.randomUUID(), owner: "Kas", text: "Plan vendor event", done: false, tag: "Events" },
    { id: crypto.randomUUID(), owner: "Kas", text: "Green Labs drop boxes", done: false, tag: "Drop Boxes" },
    { id: crypto.randomUUID(), owner: "Kas", text: "Film Instagram video", done: true, tag: "Content" }
  ],
  files: []
};

let data = JSON.parse(localStorage.getItem("workshopData")) || defaultData;

function save() {
  localStorage.setItem("workshopData", JSON.stringify(data));
  render();
}

function resetDemo() {
  if (!confirm("Reset the demo data?")) return;
  localStorage.removeItem("workshopData");
  data = structuredClone(defaultData);
  save();
}

function render() {
  renderStickies();
  renderProjectWall();
  renderDeskTasks("Dane", "daneTasksPreview");
  renderDeskTasks("Kas", "kasTasksPreview");
  renderAllProjects();
  renderFiles();
}

function renderStickies() {
  const box = document.getElementById("stickyPreview");
  box.innerHTML = data.stickies.slice(0, 6).map(note => `
    <div class="sticky">
      ${escapeHTML(note.text)}
      <br><br>
      <small>${escapeHTML(note.owner)}</small>
    </div>
  `).join("");
}

function renderProjectWall() {
  const box = document.getElementById("projectWallList");
  box.innerHTML = data.projects.slice(0, 5).map(project => `
    <div class="project-pill">
      <strong>${escapeHTML(project.title)}</strong><br>
      <span class="tag">${escapeHTML(project.status)}</span>
    </div>
  `).join("");
}

function renderDeskTasks(owner, elementId) {
  const box = document.getElementById(elementId);
  const tasks = data.tasks.filter(task => task.owner === owner).slice(0, 4);

  box.innerHTML = tasks.map(task => `
    <div class="mini-task">${task.done ? "✓ " : ""}${escapeHTML(task.text)}</div>
  `).join("");
}

function renderAllProjects() {
  const box = document.getElementById("allProjects");
  if (!box) return;

  box.innerHTML = data.projects.map(project => `
    <article class="item">
      <h3>${escapeHTML(project.title)}</h3>
      <p><strong>Status:</strong> ${escapeHTML(project.status)}</p>
      <p><strong>Owner:</strong> ${escapeHTML(project.owner)}</p>
      <p><strong>Due:</strong> ${escapeHTML(project.due || "No date")}</p>
      <div class="item-actions">
        <button onclick="editProject('${project.id}')">Edit</button>
        <button class="danger" onclick="deleteProject('${project.id}')">Delete</button>
      </div>
    </article>
  `).join("");
}

function renderFiles() {
  const box = document.getElementById("fileGrid");
  if (!box) return;

  if (!data.files.length) {
    box.innerHTML = `<p>No files yet. Upload an image to test the cabinet.</p>`;
    return;
  }

  box.innerHTML = data.files.map(file => `
    <article class="item file-card">
      <img src="${file.src}" alt="${escapeHTML(file.name)}">
      <h3>${escapeHTML(file.name)}</h3>
      <p>${escapeHTML(file.project || "Unsorted")}</p>
      <button class="danger" onclick="deleteFile('${file.id}')">Delete</button>
    </article>
  `).join("");
}

function setView(view) {
  document.getElementById("roomView").classList.toggle("hidden", view !== "room");
  document.getElementById("projectsView").classList.toggle("hidden", view !== "projects");
  document.getElementById("filesView").classList.toggle("hidden", view !== "files");

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

function openPanel(type) {
  const title = document.getElementById("panelTitle");
  const body = document.getElementById("panelBody");

  title.textContent = type;

  if (type === "Whiteboard") body.innerHTML = whiteboardPanel();
  if (type === "Dane Desk") body.innerHTML = deskPanel("Dane");
  if (type === "Kas Desk") body.innerHTML = deskPanel("Kas");
  if (type === "Project Wall") body.innerHTML = projectPanel();
  if (type === "File Cabinet") body.innerHTML = filePanel();

  document.getElementById("panel").classList.add("open");
}

function closePanel() {
  document.getElementById("panel").classList.remove("open");
}

function whiteboardPanel() {
  return `
    <p>Add, delete, and save sticky notes. Right now this saves in your browser.</p>

    ${data.stickies.map(note => `
      <div class="item">
        <strong>${escapeHTML(note.owner)}</strong>
        <p>${escapeHTML(note.text)}</p>
        <button class="danger" onclick="deleteSticky('${note.id}')">Delete</button>
      </div>
    `).join("")}

    <h3>Add Sticky Note</h3>
    <input id="stickyText" placeholder="New idea..." />
    <select id="stickyOwner">
      <option>Dane</option>
      <option>Kas</option>
      <option>Shared</option>
    </select>
    <button onclick="addSticky()">Add Sticky</button>
  `;
}

function deskPanel(owner) {
  const tasks = data.tasks.filter(task => task.owner === owner);

  return `
    <p>${owner}'s active task board.</p>

    ${tasks.map(task => `
      <div class="item">
        <label>
          <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask('${task.id}')">
          <strong>${escapeHTML(task.text)}</strong>
        </label>
        <p><span class="tag">${escapeHTML(task.tag)}</span></p>
        <button class="danger" onclick="deleteTask('${task.id}')">Delete</button>
      </div>
    `).join("")}

    <h3>Add Task</h3>
    <input id="taskText" placeholder="Task..." />
    <input id="taskTag" placeholder="Tag, like Website or Events..." />
    <button onclick="addTask('${owner}')">Add Task</button>
  `;
}

function projectPanel() {
  return `
    <button onclick="openProjectForm()">+ Add Project</button>
    ${data.projects.map(project => `
      <div class="item">
        <h3>${escapeHTML(project.title)}</h3>
        <p><strong>Status:</strong> ${escapeHTML(project.status)}</p>
        <p><strong>Owner:</strong> ${escapeHTML(project.owner)}</p>
        <p><strong>Due:</strong> ${escapeHTML(project.due || "No date")}</p>
        <div class="item-actions">
          <button onclick="editProject('${project.id}')">Edit</button>
          <button class="danger" onclick="deleteProject('${project.id}')">Delete</button>
        </div>
      </div>
    `).join("")}
  `;
}

function filePanel() {
  return `
    <p>Upload images on the Files page. This version stores them in browser memory.</p>
    <button onclick="setView('files'); closePanel()">Open File Cabinet</button>
  `;
}

function addSticky() {
  const text = document.getElementById("stickyText").value.trim();
  const owner = document.getElementById("stickyOwner").value;

  if (!text) return;

  data.stickies.push({
    id: crypto.randomUUID(),
    text,
    owner
  });

  save();
  openPanel("Whiteboard");
}

function deleteSticky(id) {
  data.stickies = data.stickies.filter(note => note.id !== id);
  save();
  openPanel("Whiteboard");
}

function addTask(owner) {
  const text = document.getElementById("taskText").value.trim();
  const tag = document.getElementById("taskTag").value.trim() || "General";

  if (!text) return;

  data.tasks.push({
    id: crypto.randomUUID(),
    owner,
    text,
    tag,
    done: false
  });

  save();
  openPanel(`${owner} Desk`);
}

function toggleTask(id) {
  const task = data.tasks.find(task => task.id === id);
  if (!task) return;
  task.done = !task.done;
  save();
}

function deleteTask(id) {
  data.tasks = data.tasks.filter(task => task.id !== id);
  save();
  closePanel();
}

function openProjectForm(projectId = null) {
  const project = data.projects.find(p => p.id === projectId);

  document.getElementById("modalBody").innerHTML = `
    <h2>${project ? "Edit Project" : "Add Project"}</h2>
    <input id="projectTitle" placeholder="Project title" value="${project ? escapeAttr(project.title) : ""}" />
    <select id="projectStatus">
      ${["Dreaming", "Concept", "Planning", "Building", "Live"].map(status => `
        <option ${project && project.status === status ? "selected" : ""}>${status}</option>
      `).join("")}
    </select>
    <select id="projectOwner">
      ${["Dane", "Kas", "Shared"].map(owner => `
        <option ${project && project.owner === owner ? "selected" : ""}>${owner}</option>
      `).join("")}
    </select>
    <input id="projectDue" placeholder="Due date" value="${project ? escapeAttr(project.due || "") : ""}" />
    <button onclick="${project ? `updateProject('${project.id}')` : "addProject()"}">
      ${project ? "Save Project" : "Add Project"}
    </button>
  `;

  document.getElementById("modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function addProject() {
  const title = document.getElementById("projectTitle").value.trim();
  if (!title) return;

  data.projects.push({
    id: crypto.randomUUID(),
    title,
    status: document.getElementById("projectStatus").value,
    owner: document.getElementById("projectOwner").value,
    due: document.getElementById("projectDue").value.trim()
  });

  save();
  closeModal();
  closePanel();
}

function editProject(id) {
  openProjectForm(id);
}

function updateProject(id) {
  const project = data.projects.find(p => p.id === id);
  if (!project) return;

  project.title = document.getElementById("projectTitle").value.trim();
  project.status = document.getElementById("projectStatus").value;
  project.owner = document.getElementById("projectOwner").value;
  project.due = document.getElementById("projectDue").value.trim();

  save();
  closeModal();
  closePanel();
}

function deleteProject(id) {
  if (!confirm("Delete this project?")) return;
  data.projects = data.projects.filter(project => project.id !== id);
  save();
  closePanel();
}

function uploadFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    data.files.push({
      id: crypto.randomUUID(),
      name: file.name,
      src: e.target.result,
      project: "Unsorted"
    });

    save();
  };

  reader.readAsDataURL(file);
}

function deleteFile(id) {
  data.files = data.files.filter(file => file.id !== id);
  save();
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(text) {
  return escapeHTML(text);
}

render();
