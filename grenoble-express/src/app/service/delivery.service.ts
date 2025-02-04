import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor() { }

  public getUndeliveredOrders(): Promise<any> {
    return fetch('http://localhost:3000/commandes');
  }
}
