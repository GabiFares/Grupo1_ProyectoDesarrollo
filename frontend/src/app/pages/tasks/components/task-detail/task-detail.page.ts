import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.page.html',
  styleUrl: './task-detail.page.css',
})
export class TaskDetailPage implements OnInit {
  detail = input<string>();

  ngOnInit() {
    console.log('esto es un ejemplo', this.detail());
  }
}
