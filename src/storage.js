import * as projects from "./projects.js";

export let saveState = undefined;
    
export const createSaveStateFunction = function(projectsObj) {
    saveState = function() {
        localStorage.setItem("projectsData", JSON.stringify(projectsObj));
    }
}

export const setProjects = function() {
    let tempProjects = projects.createProjects();
    tempProjects.fromProjects(JSON.parse(localStorage.getItem("projectsData")));
    return tempProjects;
}