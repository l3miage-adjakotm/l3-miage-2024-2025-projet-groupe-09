import {Customer} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseCustomers, parseOrders} from '../utils/processData';

export function readCustomers(): Promise<readonly Customer[]> {
  return fetch(
    `${environment.apiURL}/clients`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseCustomers
  ).catch(
    error => Promise.reject(error)
  )
}
