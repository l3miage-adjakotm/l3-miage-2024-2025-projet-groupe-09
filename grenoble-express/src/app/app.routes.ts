import { Routes } from '@angular/router';
import {ViewOrderComponent} from './components/view-order/view-order.component';

export const routes: Routes = [
  {path: "", component: ViewOrderComponent},
  {path: "liste-commandes", component: ViewOrderComponent},
];
