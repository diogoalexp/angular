import { Routes } from "@angular/router";
import { TaskComponent } from "./src/app/tasks/task/task.component";
import { NoTaskComponent } from "./src/app/tasks/no-task/no-task.component";
import { UserTasksComponent } from "./src/app/users/user-tasks/user-tasks.component";
import { NewTaskComponent } from "./src/app/tasks/new-task/new-task.component";
import { TasksComponent } from "./src/app/tasks/tasks.component";
import { NotFoundComponent } from "./src/app/not-found/not-found.component";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: [
            {
                path: 'tasks', //<your-domain>/users/<uid>tasks
                component: TasksComponent
            },
            {
                path: 'tasks/new', //<your-domain>/users/<uid>tasks
                component: NewTaskComponent
            }
        ]
    },
    {
        path: '**', //not match other paths
        component: NotFoundComponent
    }
]