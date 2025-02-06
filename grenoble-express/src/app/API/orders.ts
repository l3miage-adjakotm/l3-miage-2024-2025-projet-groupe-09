import {Order} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseOrders} from '../utils/processData';

export function readOrders(): Promise<readonly Order[]> {
  return fetch(
    `${environment.apiURL}/commandes`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseOrders
  ).catch(
    error => Promise.reject(error)
  )
}

export function changeOrderState(id: string, order: Partial<Order>): Promise<Order> {
  return fetch(
    `${environment.apiURL}/commandes/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(order)
    }
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).catch(
    error => Promise.reject(error)
  )
}
