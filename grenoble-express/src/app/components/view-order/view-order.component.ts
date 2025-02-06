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

  ngOnInit(): void {
  }

}
