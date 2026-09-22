import * as tools from "./tools.js"
import handle from "./handle.png";
import deleteSvg from "./delete.svg";
import * as storage from "./storage.js";

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
        todoCount.title = "number of todos"
        const projectTitle = tools.createElement('span', 'project-title', controlsDiv);
        const openProjectButton = tools.createElement('img', 'handle', controlsDiv);
        openProjectButton.title = "open project";
        const addTodoButton = tools.createElement('button', 'add-note-button', controlsDiv);
        addTodoButton.title = "create todo";
        const deleteProjectButton = tools.createElement('button', 'delete-project-button', controlsDiv);
        deleteProjectButton.title = "delete project";
        const deleteProjectImage = tools.createElement('img', 'delete-project-image', deleteProjectButton);

        // add a class for the first project so that borders don't overlap

        if (i === 0) {
            controlsDiv.classList.add('first-project');
        }
        else {
            controlsDiv.classList.remove('first-project');
        }

        //create a todo
        addTodoButton.addEventListener('click', () => {
            const newTodoDialog = document.getElementById('new-todo-dialog');

            currentProject = projectsArr[i];
            currentTodoDiv = todoDiv;
            currentTodoCount = todoCount;
            newTodoDialog.showModal();
        })

        // create delete project functionality
        const deleteProjectDialog = document.getElementById('delete-project-dialog');
        deleteProjectButton.addEventListener('click', () => {
            deleteProjectDialog.showModal();

        })
        
        const deleteProjectConfirmButton = document.getElementById('delete-project-confirm');
        const deleteProjectDeclineButton = document.getElementById('delete-project-decline');
        
        deleteProjectConfirmButton.addEventListener('click', () => {
            //delete the project
            projectsArr.splice(i, 1);
            storage.saveState();
            //rerender projects
            renderProjects(projectsArr);
            deleteProjectDialog.close();
        })

        deleteProjectDeclineButton.addEventListener('click', () => {
            deleteProjectDialog.close();
        })

        // create open project functionality 
        openProjectButton.addEventListener('click', () => {
            // check if project is already open
            // render todos 
            // if already open, wipe todos 
            if (todoDiv.hasChildNodes()) {
                todoDiv.classList.remove('contents-todos-container-open');
                wipeContents(todoDiv);
            }
            else {
                renderTodos(projectsArr[i], todoDiv, todoCount);
            }
        })

        //fill controls div element's content
        todoCount.textContent = `${tools.formatNumberToTally(projectsArr[i].todoCount)}`;
        projectTitle.textContent = projectsArr[i].title;
        openProjectButton.src = handle; 
        addTodoButton.textContent = "+";
        deleteProjectImage.src = deleteSvg;

    }
}

const renderTodos = function(project, todoContainer, todoCountElement) {
    wipeContents(todoContainer);
    if (project.todoArr.length != 0) {
        todoContainer.classList.add('contents-todos-container-open');
        for (let i = 0; i < (project.todoArr).length; i++) {
            const todoDiv = tools.createElement('div', 'todo-instance', todoContainer);
    
            //create priority
            const todoPriority = tools.createElement('span', 'todo-priority', todoDiv);
    
            //create bar and contents 
            const todoBar = tools.createElement('div', 'todo-bar', todoDiv);
            const todoTitle = tools.createElement('p', 'todo-title', todoBar);
            const buttonDiv = tools.createElement('div', 'button-div', todoBar);
            const todoDeleteButton = tools.createElement('button', 'todo-delete', buttonDiv);
            const todoDueDate = tools.createElement('p', 'todo-due-date', todoDiv);
            const todoCheckbox = tools.createElement('input', 'todo-checkbox', buttonDiv);

            todoDeleteButton.title  = "delete todo";
    
            todoDeleteButton.addEventListener('click', (e) => {
                // delete todo
                project.todoArr.splice(i, 1);
    
                // decrease todo count
                project.todoCount--;
                storage.saveState();
    
                //need to change the current project and todoCountElement
                //the updateTodoCount function requires them to be set
                //if not set here, they may be set by say an add todo prior 
    
                todoCountElement.textContent = `${tools.formatNumberToTally(project.todoCount)}`;
                if (project.todoCount === 0) {
                    todoContainer.classList.remove('contents-todos-container-open');
                }
    
                // rerender
                renderTodos(project, todoContainer, todoCountElement);
            })
    
            //fill bar contents' contents
            todoTitle.textContent = project.todoArr[i].title;
            todoDueDate.textContent = project.todoArr[i].dueDate;
            todoCheckbox.type = "checkbox";
    
            //create description and its contents
            const descriptionDiv = tools.createElement('div', 'todo-description', todoDiv);
            const descriptionP = tools.createElement('p', 'todo-description-p', descriptionDiv);
            descriptionP.textContent = project.todoArr[i].description;
    
            todoCheckbox.addEventListener('change', (e) => {
                project.todoArr[i].complete = (!(project.todoArr[i].complete))
                storage.saveState();
                todoDiv.classList.toggle('todo-complete');
                renderPriorityDependentElements();
            })
            
            const renderPriorityDependentElements = function() {
                if (project.todoArr[i].complete) {
                    todoPriority.textContent = "✓";
                    todoCheckbox.checked = true;
                }
                else {
                    todoPriority.textContent = project.todoArr[i].priority;
                }
    
            }
            renderPriorityDependentElements();
            if (project.todoArr[i].complete) {
                todoDiv.classList.add('todo-complete');
            }
        }
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
let currentTodoCount = undefined;
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


    //render todo 
    updateTodoCount();
    renderTodos(currentProject, currentTodoDiv, currentTodoCount);
    
    todoForm.reset();
    todoDialog.close();
})

const updateTodoCount = function() {
    currentTodoCount.textContent = `${tools.formatNumberToTally(currentProject.todoCount)}`;
}

