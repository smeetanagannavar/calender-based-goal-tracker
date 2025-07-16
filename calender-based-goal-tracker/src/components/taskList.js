import { Task } from "./task";

//const tasks =[];

export class TaskList {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getTasks() {
        return this.tasks;
    }

    getTasksByDate(date) {
        return this.tasks.filter(task => task.date === date);
    }

   getALLTasks() {
        return this.tasks.map(task => task.toString());
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id.toString() === id.toString());
    }

    updateTaskDate(taskId, newDate) {
        const task = this.getTaskById(taskId);
        if(task) {
            task.date = newDate;
        }
    }
}