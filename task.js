class Task {
    constructor(id, title, date, category) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.category = category;
    }

    toString() {
        return `Task ID: ${this.id}, Title: ${this.title}, Date: ${this.date}, Category: ${this.catagory}`;
    }
}
    const t = new Task(1, "complete project", "2025-01-01", "work");
    console.log(t.toString());