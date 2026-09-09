import * as todo from "./todo";

export class Project {
    constructor(title) {
        this.title = title;
        this.todoArr = [];
        this.todoCount = 0;
    }

    createTodo(title, priority, description, dueDate) {
        this.todoArr.push(todo.createTodo(title, priority, description, dueDate));
    }
}

export const newProject = (title) => new Project(title);