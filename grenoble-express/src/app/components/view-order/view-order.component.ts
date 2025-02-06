import {afterRender, Component, computed, inject, OnInit, signal} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {DeliveryService} from '../../service/delivery.service';
import {DisplayedOrder} from '../../data/types';
import {
  MatDialog,
} from '@angular/material/dialog';
import {CreateTourComponent} from '../create-tour/create-tour.component';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {

  private readonly _deliveryService = inject(DeliveryService);
  protected readonly dialog = inject(MatDialog);

  protected displayedColumns: string[] = ['select', 'reference_commande', 'reference_client', 'adresse', 'ville','codePostal', 'date', "etat"];

  protected dataSource = signal<MatTableDataSource<DisplayedOrder>>(new MatTableDataSource<DisplayedOrder>());
  // protected selectedDataSource = computed<DisplayedOrder[]>(
  //     () => this.dataSource().data.filter(d => d.selected === true)
  // )

  ngOnInit(): void {
    this.getOrders().then(
      data => {
        this.dataSource().data = [...data]
      }
    );
  }

  private async getOrders() {
    const undeliveredOrders = await this._deliveryService.getUndeliveredOrders();
    const customers = await this._deliveryService.getCustomers();
    return this._deliveryService.ordersDataToDisplay(undeliveredOrders, customers);
  }


  selectAllRows(event: any) {
    const checked = event.checked;
    this.dataSource().data = this.dataSource().data.map(
      row => ({ ...row, selected: checked })
    )
    this.dataSource()._updateChangeSubscription();
  }

  isAllSelected() {
    const data = this.dataSource().data;
    return data.length > 0 && data.every(row => row.selected);
  }

  isSomeSelected() {
    if (!this.isAllSelected())
      return this.dataSource().data.some(row => row.selected);
    else return false;
  }

  toggleRowSelection(row: DisplayedOrder) {
    this.dataSource().data = this.dataSource().data.map(
      el => el === row ? { ...el, selected: !el.selected } : el
    );
    this.dataSource()._updateChangeSubscription();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTourComponent, {
      data: this.dataSource().data.filter(d => d.selected),
      panelClass: 'custom-dialog',
      height: '650px',
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


searchText : string = '';


applyFilter() {
  this.dataSource().filter = this.searchText.trim().toLowerCase();
}

}