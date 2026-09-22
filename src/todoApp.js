import * as storage from "./storage.js";
import * as projects from "./projects.js";
import * as tools from "./tools.js";
import * as display from "./display.js";

export const runApp = function() {
    let myProjects = undefined;
    if (!localStorage.getItem("projectsData")) {
        //if theres no saves, then create a projects and create saveState function 
        console.log("no data!");
        myProjects = projects.createProjects(); 
        storage.createSaveStateFunction(myProjects);
        myProjects.createProject("My first project!");
        myProjects.projectsArr[0].createTodo("Get in the zone", 0, "pssst... hit that play button! the orange one up there! Then get to work...")
        myProjects.projectsArr[0].createTodo("Background credit: @timmorrrow", 0, "check him out!")

    }
    else {
        console.log("data!");
        myProjects = storage.setProjects(); 
        storage.createSaveStateFunction(myProjects);
    }

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

    document.getElementById('music-button').addEventListener('click', () => {
        const song = document.getElementById('music');
        if (!music.paused) {
            music.pause();
        }
        else {
            music.play();
        }
    })

    display.renderProjects(myProjects.projectsArr);
}