import {Component, effect, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {DeliveryService} from './service/delivery.service';
import {OrderState} from './data/enums';
import {DisplayedOrder} from './data/types';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
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
