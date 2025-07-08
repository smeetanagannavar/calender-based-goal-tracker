import { Task } from "./components/task";
import { TaskList } from "./components/taskList";
import { renderTask, clearTasks } from "./components/UI";

const taskList = new TaskList();
const form = document.getElementById('task-form');
const taskContainer = document.getElementById('task-list');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = form.elements['title'].value;
    const date = form.elements['date'].value;
    const category = form.elements['category'].value;

    const task = new Task(Date.now(), title, date, category);
    taskList.addTask(task);

    displayTasks(date);
    form.reset();
});

function displayTasks(date) {
    clearTasks(taskContainer);
    const tasks = taskList.getTasksByDate(date);
    tasks.forEach(task => {
        renderTask(task, taskContainer);
    } );
}