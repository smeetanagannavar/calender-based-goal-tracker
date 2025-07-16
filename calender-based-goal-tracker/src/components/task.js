export const CATEGORIES = ["Work", "Personal", "Urgent"];
export const PRIORITIES = ["Low", "Medium", "High"];

export class Task {
    constructor(id, title, date, category, priority, completed = false) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.category = category;
        this.priority = priority;
        this.completed = completed;
    }

    toggleCompleted(){
        this.completed = !this.completed;
    }

    toString() {
        return `Task ID: ${this.id}, Title: ${this.title}, Date: ${this.date}, Category: ${this.catagory}`;
    }
}
    const t = new Task(1, "complete project", "2025-01-01", "work");
    console.log(t.toString());