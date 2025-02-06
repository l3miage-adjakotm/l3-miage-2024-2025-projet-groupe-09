import { Routes } from '@angular/router';
import {ViewOrderComponent} from './components/view-order/view-order.component';
import {ViewTourComponent} from './components/view-tour/view-tour.component';
import {ViewTourListComponent} from './components/view-tour-list/view-tour-list.component';

export const routes: Routes = [
  {path: "liste-tournees/:id", component: ViewTourComponent},
  {path: "liste-tournees", component: ViewTourListComponent},
  {path: "", component: ViewOrderComponent},
];
