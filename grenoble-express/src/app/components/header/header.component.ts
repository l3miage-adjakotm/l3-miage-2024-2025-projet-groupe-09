import { Component } from '@angular/core';

interface Planner {
  name: string;
  photo: string;
  role: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {
  planner: Planner; //

  Planners: Planner[] = [
    {
      name: 'Claudia TESSIER',
      photo: 'https://i.postimg.cc/nVDg47VX/planificatrice.jpg',
      role: 'Planificatrice'
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
