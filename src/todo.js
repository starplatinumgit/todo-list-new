
class Todo {
    constructor(title, priority, description, dueDate) {
       this.title = title;
       this.priority = priority;
       this.description = description; 
       this.dueDate = dueDate;
    }
}


export const createTodo = (title, priority, description, dueDate) => new Todo(title, priority, description, dueDate);