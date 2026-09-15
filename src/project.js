import * as todo from "./todo";
import * as storage from "./storage";

export class Project {
    constructor(title) {
        this.title = title;
        this.todoArr = [];
        this.todoCount = 0;
    }

    createTodo(title, priority, description, dueDate) {
        this.todoArr.push(todo.createTodo(title, priority, description, dueDate));
        storage.saveState();
    }

    fromProject(parsedProject) {
        this.title = parsedProject.title;
        this.todoCount = parsedProject.todoCount;
        for (const parsedTodo of parsedProject.todoArr) {
            let myTodo = todo.createTodo();
            myTodo.fromTodo(parsedTodo);
            this.todoArr.push(myTodo);
        }
    }
}

export const newProject = (title) => new Project(title);