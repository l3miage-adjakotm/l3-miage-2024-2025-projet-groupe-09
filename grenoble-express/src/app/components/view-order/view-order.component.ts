import { afterRender, Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DeliveryService } from '../../service/delivery.service';
import { DisplayedOrder } from '../../data/types';
import { MatDialog } from '@angular/material/dialog';
import { CreateTourComponent } from '../create-tour/create-tour.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-view-order',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule
  ],
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {

  ngOnInit(): void {

  }
}
