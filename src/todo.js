import { format } from "date-fns";

class Todo {
    constructor(title, priority, description, dueDate) {
       this.title = title;
       let j = "!";
       for (let i = 0; i < priority; i++) {
           j += "!";
       }
       this.priority = j; 
       this.description = description; 
       this.dueDate = format(dueDate, 'dd/MM/yyyy');
       this.complete = false;
    }
}


export const createTodo = (title, priority, description, dueDate) => new Todo(title, priority, description, dueDate);