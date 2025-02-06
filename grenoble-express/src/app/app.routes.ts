import { Routes } from '@angular/router';
import {ViewTourComponent} from './components/view-tour/view-tour.component';
import {ViewTourListComponent} from './components/view-tour-list/view-tour-list.component';
import {ViewOrderListComponent} from './components/view-order-list/view-order-list.component';
import {MapComponent} from './components/map/map.component';

export const routes: Routes = [
  {path: "liste-tournees/:id", component: ViewTourComponent},
  {path: "liste-tournees", component: ViewTourListComponent},
  {path: "map/:id", component: MapComponent},
  {path: "", component: ViewOrderListComponent},
];
