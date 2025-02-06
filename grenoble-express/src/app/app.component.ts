import {Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateTourComponent } from "./create-tour/create-tour.component";
import { ViewOrderComponent } from "./view-order/view-order.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ViewTourComponent } from './view-tour/view-tour.component';
import { OneTourComponent } from './one-tour/one-tour.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    //CreateTourComponent,
    //ViewOrderComponent,
    NavBarComponent,
    //ViewTourComponent,
    OneTourComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
