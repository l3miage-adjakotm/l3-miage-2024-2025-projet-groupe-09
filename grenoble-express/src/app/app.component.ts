import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import {HeaderComponent} from './components/header/header.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { ViewTourComponent } from './components/view-tour/view-tour.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[
    NavBarComponent,
    HeaderComponent,
    RouterOutlet,
    NavBarComponent,
    ViewOrderComponent,
    ViewTourComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }



}
