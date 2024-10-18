import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { TasksPage } from './pages/tasks/tasks.page';
import { TaskDetailPage } from './pages/tasks/components/task-detail/task-detail.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'tasks',
    component: TasksPage,
  },

  {
    path: 'tasks/:id',
    component: TaskDetailPage,
  },
];
