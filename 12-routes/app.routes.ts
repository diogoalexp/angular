import { CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes } from './src/app/users/users.routes'
import { NoTaskComponent } from "./src/app/tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./src/app/users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./src/app/not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const shouldGetAcess = Math.random();
    if(shouldGetAcess < 0.5){
        return true;
    }

    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', //<your-domain>
        component: NoTaskComponent,
        title: 'No task selected'
    },
    {
        path: 'users/:userId', //<your-domain>/users/<uid>
        component: UserTasksComponent,
        children: userRoutes,
        canMatch: [dummyCanMatch],
        data: { //static data
            message: 'Hello!'
        },
        resolve: { //dynamic data
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**', //not match other paths
        component: NotFoundComponent
    }
]