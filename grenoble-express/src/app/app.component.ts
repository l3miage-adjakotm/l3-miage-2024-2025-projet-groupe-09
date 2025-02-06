import { ViewTourComponent } from "./view-tour/view-tour.component";
import {Component, effect, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DeliveryService} from './service/delivery.service';
import {OrderState} from './data/enums';
import {DisplayedOrder} from './data/types';
import { CreateTourComponent } from "./components/create-tour/create-tour.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ViewOrderComponent } from "./components/view-order/view-order.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    CreateTourComponent,
    NavBarComponent,
    ViewOrderComponent,
    ViewTourComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {

  }



}
