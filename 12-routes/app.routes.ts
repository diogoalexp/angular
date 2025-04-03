import { Routes } from "@angular/router";
import { TaskComponent } from "./src/app/tasks/task/task.component";
import { NoTaskComponent } from "./src/app/tasks/no-task/no-task.component";
import { UserTasksComponent } from "./src/app/users/user-tasks/user-tasks.component";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent
    },
    {
        path: 'tasks', //<your-domain>/tasks
        component: TaskComponent
    }
]