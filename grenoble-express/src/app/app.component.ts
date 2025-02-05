import {Component, effect, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DeliveryService} from './service/delivery.service';
import {OrderState} from './data/enums';
import {DisplayedOrder} from './data/types';
import { CreateTourComponent } from "./components/create-tour/create-tour.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { ViewOrderComponent } from "./components/view-order/view-order.component";

@Component({
  selector: 'app-root',
  imports: [
    //RouterOutlet,
    CreateTourComponent,
    NavBarComponent,
    ViewOrderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor() {
    this.getOrdersDataToDisplay().then();
  }
  private readonly _deliveryService = inject(DeliveryService);
  protected readonly ordersToDisplay = signal<readonly DisplayedOrder[]>([]);

  private async getOrdersDataToDisplay() {
    const undeliveredOrders = await this._deliveryService.getUndeliveredOrders();
    const customers = await this._deliveryService.getCustomers();

    this.ordersToDisplay.set(this._deliveryService.ordersDataToDisplay(undeliveredOrders, customers));
  }

  private display = effect(
    () => console.log(this.ordersToDisplay())
  )
}
