import {Customer, Employee} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseCustomers, parseEmployees, parseOrders} from '../utils/processData';

export function readEmployes(emploi: string): Promise<readonly Employee[]> {
  return fetch(
    `${environment.apiURL}/employes/?emploi=${emploi}`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseEmployees
  ).catch(
    error => Promise.reject(error)
  )
}
