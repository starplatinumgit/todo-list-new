import * as projects from "./projects.js";
import * as tools from "./tools.js";
import * as display from "./display.js";

export const runApp = function() {
    const myProjects = projects.createProjects(); 

    const newProjectDialog = document.getElementById('new-project-dialog');
    const newProjectForm = document.getElementById('new-project-form');
    //functionality for add project button + dialog / form
    document.getElementById('new-project-button').addEventListener('click', () => {
        newProjectDialog.showModal();
    })

    document.getElementById('close-project-dialog').addEventListener('click', () => {
        newProjectForm.reset();
        newProjectDialog.close();
    })

    newProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //create a new project 
        myProjects.createProject(document.getElementById('project-title').value);
        console.log(myProjects);

        //now render the projects
        display.wipeContents(document.getElementById('projects-container'));
        display.renderProjects(myProjects.projectsArr);

        newProjectForm.reset();
        newProjectDialog.close();
    })

    document.getElementById('close-todo-dialog').addEventListener('click', (e) => {
        document.getElementById('new-todo-form').reset();
        document.getElementById('new-todo-dialog').close();
    })

    myProjects.createProject("Default Project");
    display.renderProjects(myProjects.projectsArr);
}