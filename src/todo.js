import { format } from "date-fns";
import * as storage from "./storage";

class Todo {
    constructor(title, priority, description, dueDate) {
       this.title = title;
       let j = "!";
       for (let i = 0; i < priority; i++) {
           j += "!";
       }
       this.priority = j; 
       this.description = description; 
       if (dueDate) {
           this.dueDate = format(dueDate, 'dd/MM/yyyy');
       }
       this.complete = false;
    }

    edit(title, priority, description, dueDate, complete) {
       this.title = title;
       let j = "!";
       for (let i = 0; i < priority; i++) {
           j += "!";
       }
       this.priority = j; 
       this.description = description; 
       if (dueDate) {
           this.dueDate = format(dueDate, 'dd/MM/yyyy');
       }
       this.complete = false;
    }

    fromTodo(parsedTodo) {
       this.title = parsedTodo.title;
       this.priority = parsedTodo.priority;
       this.description = parsedTodo.description;
       this.dueDate = parsedTodo.dueDate; //might need to create a new date object here 
       this.complete = parsedTodo.complete;
    }
}

export const editTodo = function(todo, title, priority, description, dueDate) {
    todo.edit(title, priority, description, dueDate);
}

export const createTodo = function(title, priority, description, dueDate){
   return new Todo(title, priority, description, dueDate);
}