import { Routes } from "@angular/router";
import { routes as userRoutes } from './src/app/users/users.routes'
import { NoTaskComponent } from "./src/app/tasks/no-task/no-task.component";
import { UserTasksComponent } from "./src/app/users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./src/app/not-found/not-found.component";

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes
    },
    {
        path: '**', //not match other paths
        component: NotFoundComponent
    }
]