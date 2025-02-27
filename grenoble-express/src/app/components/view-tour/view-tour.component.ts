import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliveryService} from '../../service/delivery.service';
import {Tour} from "../../data/types";


@Component({
  selector: 'app-view-tour',
  imports: [
    MatButton

  ],
  templateUrl: './view-tour.component.html',
  styleUrl: './view-tour.component.scss',
  standalone: true
})


export class ViewTourComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _deliveryService = inject(DeliveryService);
  private _router = inject(Router);

  protected tour = signal<Tour>({
    name: "",
    orders: [],
    date: "",
    truck: {
      jdds: [],
      code: "",
      immatriculation: "",
      latitude: null,
      longitude: null,
      kilometrage: 0,
      type: "",
      entrepot: ""
    },
    delivers: []
  });
  private _id = signal<string>("");

  ngOnInit(): void {
    this._id.set(this._route.snapshot.params['id']);
    this.getTour();
  }

  private getTour() {
    this._deliveryService.getTourById(this._id()).then(
        tour => this.tour.set(tour)
    )
  }

  protected onViewMap() {
    this._router.navigate(["/map", this._id()]);
  }
}
