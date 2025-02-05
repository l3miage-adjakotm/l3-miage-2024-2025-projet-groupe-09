import {afterRender, Component, computed, inject, signal} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {DeliveryService} from '../../service/delivery.service';
import {DisplayedOrder} from '../../data/types';

/*
interface Commande {
  reference_commande: string;
  reference_client: string;
  adresse: string;
  date: string;
  etat: string;
  selected?: boolean;
  ville: string;
  codePostal:string;
}

const ELEMENT_DATA: Commande[] = [
  {
    reference_commande: "108",
    reference_client: "c001",
    adresse: "5 rue de Poisat",
    ville:"Grenoble",
    codePostal:"38000",
    date: "04/01/24",
    etat: "ouverte"

  },
  {
    reference_commande: "109",
    reference_client: "c002",
    adresse: "10 avenue Jean Jaurès, Grenoble",
    ville: "Grenoble",
    codePostal: "38000",
    date: "06/01/24",
    etat: "ouverte"
  }
];
 */

@Component({
  selector: 'app-view-order',
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
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
  protected readonly ordersToDisplay = signal<readonly DisplayedOrder[]>([]);

  protected displayedColumns: string[] = ['select', 'reference_commande', 'reference_client', 'adresse','ville','codePostal', 'date', 'etat'];
  protected dataSource = computed( () => this.ordersToDisplay() );

  private async getOrdersDataToDisplay() {
    const undeliveredOrders = await this._deliveryService.getUndeliveredOrders();
    const customers = await this._deliveryService.getCustomers();

    this.ordersToDisplay.set(this._deliveryService.ordersDataToDisplay(undeliveredOrders, customers));
  }

  selectAllRows(event: any) {
    const checked = event.checked;
    this.dataSource().forEach(row => row.selected = checked);
  }

  isAllSelected() {
    return this.dataSource().every(row => row.selected);
  }

  isSomeSelected() {
    return this.dataSource().some(row => row.selected);
  }

  getSelectedRows() {
    const selectedRows = this.dataSource().filter(row => row.selected);
    console.log(selectedRows);
  }
}
