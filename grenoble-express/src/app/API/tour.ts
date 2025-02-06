import {Tour} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseTour} from '../utils/processData';

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
