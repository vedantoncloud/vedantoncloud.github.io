let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function save() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}