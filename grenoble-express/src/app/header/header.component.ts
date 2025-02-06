import { Component } from '@angular/core';

interface Planner {
  name: string;
  photo: string;
  role: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // 
})
export class HeaderComponent {
  planner: Planner; // 

  Planners: Planner[] = [
    {
      name: 'Anne-Marie Dupont',
      photo: 'https://i.pinimg.com/originals/be/b6/63/beb663f8fe4fa66d74dd2de9975b073f.jpg',
      role: 'Planner'
    },
    {
      name: 'nadji',
      photo: 'assets/anne-marie.jpg',
      role: 'Planificatrice'
    }
  ];

  constructor() {
    this.planner = this.Planners[0]; 
  }
}