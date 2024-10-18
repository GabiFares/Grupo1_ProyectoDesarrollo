import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../interfaces/task';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.css',
})
export class TasksPage implements OnInit {
  private httpClient: HttpClient = inject(HttpClient);
  tasklist: TasksPage[] = [];
  ngOnInit() {
    const tasks = firstValueFrom(this.httpClient.get<Task[]>('/back/tareas'));
  }
}
