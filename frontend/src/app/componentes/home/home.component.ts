import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { TaskComponent } from '../task/task.component';
import { Task } from '../../interfaces/task';
import { TasksService } from '../../servicios/tasks.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, TaskComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private taskService: TasksService = inject(TasksService);
  taskList: Task[] = [
    {
      id: 1,
      title: 'Tarea1',
      description: 'Esta es la Tarea 1',
      status: 'Activo',
      createdAt: '09/10',
      updatedAt: '10/10',
      usuarios: ['Emilio Rodriguez', 'Francisco Lima'],
      id_usuario: 1,
    },
    {
      id: 2,
      title: 'Tarea2',
      description: 'Esta es la Tarea 2',
      status: 'Activo',
      createdAt: '09/10',
      updatedAt: '10/10',
      usuarios: ['Emilio2 Rodriguez', 'Francisco2 Lima'],
      id_usuario: 2,
    },
    {
      id: 3,
      title: 'Tarea3',
      description: 'Esta es la Tarea 3',
      status: 'Activo',
      createdAt: '09/10',
      updatedAt: '10/10',
      usuarios: ['Emilio3ESTOESUNEJEMPLO Rodriguez', 'Francisco3 Lima'],
      id_usuario: 3,
    },
  ];

  selectedTask: Task | undefined;

  async ngOnInit(): Promise<void> {
    this.selectedTask = this.taskList[1];
    this.taskList = await this.taskService.getAllTasks();
    console.log(this.taskList);
  }
  public onSearchValue(value: string) {
    this.selectedTask = this.taskList?.find((task) => task.title == value);
  }
}
