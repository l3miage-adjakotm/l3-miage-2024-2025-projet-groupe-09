import {Component, computed, effect, inject, model, OnInit, signal} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DisplayedOrder, Employee, Tour, Truck} from '../../data/types';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DeliveryService} from "../../service/delivery.service";
import {TitleCasePipe} from "@angular/common";
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import {provideMomentDateAdapter} from "@angular/material-moment-adapter";
import {OrderState} from "../../data/enums";

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrl: './create-tour.component.scss',
  providers: [
      provideMomentDateAdapter()
  ],
  standalone: true,
  imports: [
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      FormsModule,
      MatButtonModule,
      MatInputModule,
      MatSelectModule,
      MatFormFieldModule,
      MatDatepickerModule,
      TitleCasePipe
  ],
})

export class CreateTourComponent implements OnInit {

  private readonly dialogRef = inject(MatDialogRef<CreateTourComponent>);
  protected readonly data = inject<readonly DisplayedOrder[]>(MAT_DIALOG_DATA);
  private _deliveryService = inject(DeliveryService);

  protected nameTour = signal<string>("");

  protected delivers = signal<readonly Employee[]>([]);
  protected selectedDelivers = signal<readonly Employee[]>([]);

  protected trucks = signal<readonly Truck[]>([]);
  protected selectedTruck = signal<Truck>({
    id: "",
    jdds: [""],
    code: "",
    immatriculation: "",
    longitude: null,
    latitude: null,
    kilometrage: 0,
    entrepot: "",
    type: ""
  });

  protected dateOfTour = signal<Moment>(moment());


  ngOnInit(): void {
    this.getDelivers().then();

    this.getTrucks().then();
  }

  private async getDelivers() {
    const delivers = await this._deliveryService.getDelivers();
    this.delivers.set(delivers);
  }

  private async getTrucks() {
    const trucks = await this._deliveryService.getTrucks();
    this.trucks.set(trucks);
  }

  private formatDate(): string {
    return this.dateOfTour() ? this.dateOfTour().format('DD/MM/YYYY') : '';
  }

  private onNoClick(): void {
    this.dialogRef.close();
  }

  private addTour() {
    this._deliveryService.getOrders().then(
        orders => {
          const ordersReferences = this.data.map(o => o.reference);
          return orders.filter(o => ordersReferences.includes(o.reference))
        }
    ).then(
        filteredOrders => {
          const plannedOrders = filteredOrders.map(o => ({...o, etat: OrderState.planifiee}))
          return Promise.all(plannedOrders.map(this._deliveryService.changeOrderState))
        }
    ).then(
        _ => {
          const plannedDisplayOrders = this.data.map(pl => ({...pl, etat: OrderState.planifiee}));
          const createdTour: Tour = {
            name: this.nameTour(),
            orders: plannedDisplayOrders,
            date: this.formatDate(),
            truck: this.selectedTruck(),
            delivers: this.selectedDelivers()
          }
          return this._deliveryService.addTour(createdTour);
        }
    )
  }

  protected createTourDay() {
    this.addTour();
    this.onNoClick();
  }
}
