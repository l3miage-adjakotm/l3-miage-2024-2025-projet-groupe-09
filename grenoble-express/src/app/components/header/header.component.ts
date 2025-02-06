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
      name: 'Anne-Marie Dupont',
      photo: 'https://media.licdn.com/dms/image/D4E03AQED8wzIelU5FA/profile-displayphoto-shrink_800_800/0/1689882637314?e=2147483647&v=beta&t=kiqpYV5LWdCOnY3fV1LPwDLsnihGrcx7i-a7NIshiO8',
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
