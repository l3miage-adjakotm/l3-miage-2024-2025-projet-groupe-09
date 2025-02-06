import {afterRender, Component, computed, inject, signal} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {DeliveryService} from '../../service/delivery.service';
import {DisplayedOrder} from '../../data/types';

@Component({
  selector: 'app-view-order',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent {

  constructor() {
    afterRender(
      async () => {
        await this.getOrdersDataToDisplay();
      }
    )
  }

  private readonly _deliveryService = inject(DeliveryService);

  protected displayedColumns: string[] = ['select', 'reference_commande', 'reference_client', 'adresse', 'ville', 'codePostal', 'date', 'etat'];
  protected readonly ordersToDisplay = signal<readonly DisplayedOrder[]>([]);

  private async getOrdersDataToDisplay() {
    const undeliveredOrders = await this._deliveryService.getUndeliveredOrders();
    const customers = await this._deliveryService.getCustomers();

    this.ordersToDisplay.set(this._deliveryService.ordersDataToDisplay(undeliveredOrders, customers));
  }


  selectAllRows(event: any) {
    const checked = event.checked;
    this.ordersToDisplay.set(
      this.ordersToDisplay().map(row => ({ ...row, selected: checked }))
    );
  }

  isAllSelected() {
    const data = this.ordersToDisplay();
    return data.length > 0 && data.every(row => row.selected);
  }

  isSomeSelected() {
    return this.ordersToDisplay().some(row => row.selected);
  }


  getSelectedRows() {
    const selectedRows = this.ordersToDisplay().filter(row => row.selected);
    console.log(selectedRows);
  }

  toggleRowSelection(row: DisplayedOrder) {
    this.ordersToDisplay.set(
      this.ordersToDisplay().map(el =>
        el === row ? { ...el, selected: !el.selected } : el
      )
    );
  }

}
