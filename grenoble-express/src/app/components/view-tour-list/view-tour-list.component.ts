import {Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {DeliveryService} from '../../service/delivery.service';
import {Tour} from '../../data/types';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-view-tour-list',
  imports: [
    MatTableModule,
    FormsModule,
    MatButton,
    TitleCasePipe,
  ],
  standalone: true,
  templateUrl: './view-tour-list.component.html',
  styleUrl: './view-tour-list.component.scss'
})
export class ViewTourListComponent implements OnInit {
  displayedColumns: string[] = ['nom_tournee', 'livreurs', 'camion', 'date', 'action'];

  private _router = inject(Router);
  private _deliveryService = inject(DeliveryService);
  protected tours = signal<readonly Tour[]>([]);

  ngOnInit(): void {
    this.getTours();
  }

  private getTours() {
    this._deliveryService.getTours().then(
      tours => this.tours.set(tours)
    )
  }


  onClickTour(id: string) {
    this._router.navigate(["/liste-tournees", id]);
  }
}
