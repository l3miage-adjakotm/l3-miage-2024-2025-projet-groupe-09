import {Entrepot} from '../data/types';
import {environment} from '../../environments/environment.development';
import {parseStore} from '../utils/processData';

export function readStore(): Promise<Entrepot> {
  return fetch(
    `${environment.apiURL}/entrepot`
  ).then(
    res => res.status === 200 ? res.json() : Promise.reject(new Error(`${res.status} ${res.statusText}`))
  ).then(
    parseStore
  ).catch(
    error => Promise.reject(error)
  )
}
