import * as tools from "./tools.js"
import handle from "./handle.png";
import biohazard from "./vecteezy_biohazard_36657370.svg";

export const renderProjects = function(projectsArr) {
    //for each project in the projectsArr, we need to create a project instance
    //div, a contents-todo-container, and the contents-controls with it's contents 
    wipeContents(document.getElementById('projects-container'));
    for (let i = 0; i < projectsArr.length; i++) {
        const instanceDiv = tools.createElement('div', 'project-instance-div');
        document.getElementById('projects-container').appendChild(instanceDiv);

        const todoDiv = tools.createElement('div', 'contents-todos-container', instanceDiv);
        const controlsDiv = tools.createElement('div', 'contents-controls', instanceDiv);

        //fill controls div
        const todoCount = tools.createElement('span', 'note-count', controlsDiv);
        const projectTitle = tools.createElement('span', 'project-title', controlsDiv);
        const openProjectButton = tools.createElement('img', 'handle', controlsDiv);
        const addTodoButton = tools.createElement('button', 'add-note-button', controlsDiv);
        const deleteProjectButton = tools.createElement('button', 'delete-project-button', controlsDiv);
        const deleteProjectImage = tools.createElement('img', 'delete-project-image', deleteProjectButton);

        //create the create a todo functionality 
        addTodoButton.addEventListener('click', () => {
            const newTodoDialog = document.getElementById('new-todo-dialog');

            currentProject = projectsArr[i];
            currentTodoDiv = todoDiv;
            newTodoDialog.showModal();
        })

        deleteProjectButton.addEventListener('click', () => {
            //delete the project
            projectsArr.splice(i, 1);

            //rerender projects
            renderProjects(projectsArr);
        })

        //fill controls div element's content
        todoCount.textContent = `-${projectsArr[i].todoCount}°`;
        projectTitle.textContent = projectsArr[i].title;
        openProjectButton.src = handle; 
        addTodoButton.textContent = "+";
        deleteProjectImage.src = biohazard;

    }
}

const renderTodos = function(todoArr, todoContainer) {
    wipeContents(todoContainer);
    for (let i = 0; i < todoArr.length; i++) {
        const todoDiv = tools.createElement('div', 'todo-instance', todoContainer);

        //create priority
        const todoPriority = tools.createElement('span', 'todo-priority', todoDiv);
        todoPriority.textContent = todoArr[i].priority;

        //create bar and contents 
        const todoBar = tools.createElement('div', 'todo-bar', todoDiv);
        const todoTitle = tools.createElement('p', 'todo-title', todoBar);
        const todoDeleteButton = tools.createElement('button', 'todo-delete', todoBar);
        const todoDueDate = tools.createElement('p', 'todo-due-date', todoBar);
        const todoCheckbox = tools.createElement('input', 'todo-checkbox', todoBar);

        todoDeleteButton.addEventListener('click', (e) => {
           //delete todo
            console.log(todoArr);
            todoArr.splice(i, 1);
            console.log(todoArr);
           // reredner todos - reredering todos will change this event listener, thus indexes
           //will always remain correct 
            renderTodos(todoArr, todoContainer);
        })

        //fill bar contents' contents
        todoTitle.textContent = todoArr[i].title;
        todoDeleteButton.textContent = "X";
        todoDueDate.textContent = todoArr[i].dueDate;
        todoCheckbox.type = "checkbox";

        //create description and its contents
        const descriptionDiv = tools.createElement('div', 'todo-description', todoDiv);
        const descriptionP = tools.createElement('p', 'todo-description-p', descriptionDiv);
        descriptionP.textContent = todoArr[i].description;
    }
}

export const wipeContents = function(containerElement) {
    while (containerElement.hasChildNodes()) {
        containerElement.removeChild(containerElement.firstChild);
    }
}

// functionality for new todo form 
let currentProject = undefined;
let currentTodoDiv = undefined;
const todoForm = document.getElementById('new-todo-form');
const todoDialog = document.getElementById('new-todo-dialog');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // create todo 
    currentProject.createTodo(
        document.getElementById('todo-title').value,
        document.getElementById('todo-priority').value,
        document.getElementById('todo-description').value,
        document.getElementById('todo-date').value
    )
    console.log(currentProject);

    //render todo 
    wipeContents(currentTodoDiv)
    renderTodos(currentProject.todoArr, currentTodoDiv);

    todoForm.reset();
    todoDialog.close();
})
