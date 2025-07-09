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
}