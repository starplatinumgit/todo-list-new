import * as project from "./project";

export class Projects {
    constructor() {
        this.projectsArr = [];
        this.projectsCount = 0;
    }

    createProject(title = "Untitled Project") {
        const myProject = project.newProject(title);
        this.projectsArr.push(myProject);
    }
}

export const createProjects = () => new Projects();