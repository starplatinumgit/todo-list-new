import * as project from "./project";
import * as storage from "./storage";

export class Projects {
    constructor() {
        this.projectsArr = [];
        this.projectsCount = 0;
    }

    createProject(title = "Untitled Project") {
        const myProject = project.newProject(title);
        this.projectsArr.push(myProject);
        storage.saveState();
    }

    fromProjects(parsedProjects) {
        this.projectsCount = parsedProjects.projectsCount;
        for (const parsedProject of parsedProjects.projectsArr) {
                let myProject = project.newProject(parsedProject.title);
                myProject.fromProject(parsedProject);
                this.projectsArr.push(myProject);
        }
    }
}

export const createProjects = () => new Projects();