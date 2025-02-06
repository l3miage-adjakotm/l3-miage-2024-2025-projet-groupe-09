import {RouterOutlet} from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import {HeaderComponent} from './components/header/header.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent,
    HeaderComponent,
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }
}
