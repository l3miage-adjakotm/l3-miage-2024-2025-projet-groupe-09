import {Injectable} from '@angular/core';
import {changeOrderState, readOrders} from '../API/orders';
import {Customer, DisplayedOrder, Employee, Order, Tour, Truck} from '../data/types';
import {readCustomers} from '../API/custormer';
import {OrderState} from '../data/enums';
import {readEmployes} from '../API/employee';
import {readTrucks} from '../API/truck';
import {createTour, readTours} from '../API/tour';

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
          selected: false,
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

  public async getUndeliveredOrders(): Promise<readonly Order[]> {
    const orders = await this.getOrders();

    return Promise.resolve(orders.filter(order => order.etat !== OrderState.livree && order.etat !== OrderState.notee));
  }

  public getDelivers(): Promise<readonly Employee[]> {
    return readEmployes("livreur");
  }

  public getPlanner(): Promise<readonly Employee[]> {
    return readEmployes("plannificateur");
  }

  public getTrucks(): Promise<readonly Truck[]> {
    return readTrucks();
  }

  public addTour(value: Tour): Promise<Tour> {
    return createTour(value);
  }

  public changeOrderState(changedOrder: Order) {
    return changeOrderState(changedOrder.id, { etat: changedOrder.etat });
  }

  public getTours(): Promise<readonly Tour[]> {
    return readTours();
  }

  public getTourById() {

  }
}
