import { Injectable } from '@angular/core';
import {readOrders} from '../API/orders';
import {Order, Customer, DisplayedOrder} from '../data/types';
import {readCustomers} from '../API/custormer';
import {OrderState} from '../data/enums';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor() { }

  public getOrders(): Promise<readonly Order[]> {
    return readOrders();
  }

  public getCustomers(): Promise<readonly Customer[]> {
    return readCustomers();
  }

  public ordersDataToDisplay(orders: readonly Order[], customers: readonly Customer[]): readonly DisplayedOrder[] {
    return orders.map(
      order => {
        const customer = customers.filter(customer => customer.email === order.client);
        return {
          reference: order.reference,
          etat: order.etat,
          date_de_creation: order.date_de_creation,
          client: {
            email: customer[0].email,
            prenom: customer[0].prenom,
            nom: customer[0].nom,
            adresse: customer[0].adresse,
            code_postal: customer[0].code_postal,
            ville: customer[0].ville
          }
        }
      }
    );
  }

  async getUndeliveredOrders(): Promise<readonly Order[]> {
    const orders = await this.getOrders();

    return Promise.resolve(orders.filter(order => order.etat !== OrderState.livree && order.etat !== OrderState.notee));
  }
}
