import { Routes } from "@angular/router";
import { TaskComponent } from "./src/app/tasks/task/task.component";
import { NoTaskComponent } from "./src/app/tasks/no-task/no-task.component";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent
    },
    {
        path: 'tasks', //<your-domain>/tasks
        component: TaskComponent
    }
]