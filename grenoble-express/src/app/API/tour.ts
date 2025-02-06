import {Tour} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseCustomers, parseTour, parseTours} from '../utils/processData';

export function createTour(createdTour: Tour): Promise<Tour> {
  return fetch(
    `${environment.apiURL}/tournees`,
    {
      method: 'POST',
      body: JSON.stringify(createdTour)
    }
  ).then(
    res => res.status === 201 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseTour
  ).catch(
    error => Promise.reject(error)
  )
}

export function readTours(): Promise<readonly Tour[]> {
  return fetch(
    `${environment.apiURL}/tournees`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseTours
  ).catch(
    error => Promise.reject(error)
  )
}

export function readTourById(id: string): Promise<Tour> {
  return fetch(
    `${environment.apiURL}/tournees/?id=${id}`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseTour
  ).catch(
    error => Promise.reject(error)
  )
}
