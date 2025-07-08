
export function renderTask(task, container) {
    const div = document.createElement('div');
    div.className = `task ${task.category.toLowerCase()}`;
    div.innerText = `${task.tittle} (${task.category})`;
    container.appendChild(div);
}

export function clearTasks(container) {
    const taskList = document.getElementById('taskList');
    if (taskList) {
        taskList.innerHTML = '';
    }
}