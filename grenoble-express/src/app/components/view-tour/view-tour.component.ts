import {Component, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable,
  MatTableModule
} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import {MatAnchor, MatButton} from '@angular/material/button';
import {ActivatedRoute} from '@angular/router';
import {DeliveryService} from '../../service/delivery.service';


@Component({
  selector: 'app-view-tour',
  imports: [
    MatAnchor,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatButton

  ],
  templateUrl: './view-tour.component.html',
  styleUrl: './view-tour.component.scss',
  standalone: true
})


export class ViewTourComponent implements OnInit {

  private _route = inject(ActivatedRoute);
  private _deliveryService = inject(DeliveryService);

  ngOnInit(): void {
    const tourId = this._route.snapshot.params['id'];

  }

}
