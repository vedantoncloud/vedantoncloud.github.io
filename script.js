let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("taskDate").value;

  if (!text) {
    alert("Write task first");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    date: date,
    done: false,
    created: new Date().toISOString()
  });

  save();
  render();

  document.getElementById("taskInput").value = "";
}

function toggle(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, done: !task.done } : task
  );

  save();
  render();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  save();
  render();
}

function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let completed = 0;

  tasks.forEach(task => {
    if (task.done) completed++;

    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.done ? "done" : ""}" 
            onclick="toggle(${task.id})">
        ✔ ${task.text} ${task.date ? `(${task.date})` : ""}
      </span>

      <button onclick="removeTask(${task.id})">❌</button>
    `;

    list.appendChild(li);
  });

  const percent =
    tasks.length === 0
      ? 0
      : Math.round((completed / tasks.length) * 100);

  document.getElementById("progressText").innerText =
    percent + "% Completed";
}

/* ✅ GSAP animation only once */
gsap.from(".app", {
  opacity: 0,
  y: 40,
  duration: 1
});

render();
