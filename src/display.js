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

        //create a todo
        addTodoButton.addEventListener('click', () => {
            const newTodoDialog = document.getElementById('new-todo-dialog');

            currentProject = projectsArr[i];
            currentTodoDiv = todoDiv;
            currentTodoCount = todoCount;
            newTodoDialog.showModal();
        })

        // create delete project functionality
        deleteProjectButton.addEventListener('click', () => {
            //delete the project
            projectsArr.splice(i, 1);

            //rerender projects
            renderProjects(projectsArr);
        })

        // create open project functionality 
        openProjectButton.addEventListener('click', () => {
            // check if project is already open
            // render todos 
            // if already open, wipe todos 
            if (todoDiv.hasChildNodes()) {
                wipeContents(todoDiv);
            }
            else {
                renderTodos(projectsArr[i], todoDiv, todoCount);
            }
        })

        //fill controls div element's content
        todoCount.textContent = `-${projectsArr[i].todoCount}°`;
        projectTitle.textContent = projectsArr[i].title;
        openProjectButton.src = handle; 
        addTodoButton.textContent = "+";
        deleteProjectImage.src = biohazard;

    }
}

const renderTodos = function(project, todoContainer, todoCountElement) {
    wipeContents(todoContainer);
    for (let i = 0; i < (project.todoArr).length; i++) {
        const todoDiv = tools.createElement('div', 'todo-instance', todoContainer);

        //create priority
        const todoPriority = tools.createElement('span', 'todo-priority', todoDiv);

        //create bar and contents 
        const todoBar = tools.createElement('div', 'todo-bar', todoDiv);
        const todoTitle = tools.createElement('p', 'todo-title', todoBar);
        const todoDeleteButton = tools.createElement('button', 'todo-delete', todoBar);
        const todoDueDate = tools.createElement('p', 'todo-due-date', todoBar);
        const todoCheckbox = tools.createElement('input', 'todo-checkbox', todoBar);

        todoDeleteButton.addEventListener('click', (e) => {
            // delete todo
            project.todoArr.splice(i, 1);

            // decrease todo count
            project.todoCount--;
            console.log(todoCountElement);

            //need to change the current project and todoCountElement
            //the updateTodoCount function requires them to be set
            //if not set here, they may be set by say an add todo prior 

            todoCountElement.textContent = `-${project.todoCount}°`;

            // rerender
            renderTodos(project, todoContainer, todoCountElement);
        })

        //fill bar contents' contents
        todoTitle.textContent = project.todoArr[i].title;
        todoDeleteButton.textContent = "X";
        todoDueDate.textContent = project.todoArr[i].dueDate;
        todoCheckbox.type = "checkbox";

        //create description and its contents
        const descriptionDiv = tools.createElement('div', 'todo-description', todoDiv);
        const descriptionP = tools.createElement('p', 'todo-description-p', descriptionDiv);
        descriptionP.textContent = project.todoArr[i].description;

        todoCheckbox.addEventListener('change', (e) => {
            project.todoArr[i].complete = (!(project.todoArr[i].complete))
            renderPriorityDependentElements();
        })
        
        const renderPriorityDependentElements = function() {
            console.log(`RAN! ${project.todoArr[i].complete}`);
            if (project.todoArr[i].complete) {
                todoPriority.textContent = "✓";
                todoCheckbox.checked = true;
                todoDiv.classList.add('todo-complete');
            }
            else {
                todoPriority.textContent = project.todoArr[i].priority;
                todoDiv.classList.remove('todo-complete');
            }

        }
        renderPriorityDependentElements();
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
    currentProject.todoCount++;
    updateTodoCount();
    renderTodos(currentProject, currentTodoDiv, currentTodoCount);
    
    todoForm.reset();
    todoDialog.close();
})

const updateTodoCount = function() {
    currentTodoCount.textContent = `-${currentProject.todoCount}°`;
}

