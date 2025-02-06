import {Employee, Truck} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseEmployees, parseTrucks} from '../utils/processData';

export function readTrucks(): Promise<readonly Truck[]> {
  return fetch(
    `${environment.apiURL}/camions`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseTrucks
  ).catch(
    error => Promise.reject(error)
  )
}
