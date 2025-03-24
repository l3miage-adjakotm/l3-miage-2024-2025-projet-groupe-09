import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import {HeaderComponent} from './components/header/header.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ViewTourComponent } from './components/view-tour/view-tour.component';
import {CreateTourComponent} from './components/create-tour/create-tour.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavBarComponent,
    HeaderComponent,
    RouterOutlet,
    NavBarComponent,
    ViewOrderComponent,
    ViewTourComponent,
    CreateTourComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }



}
