import {OrderState} from './enums';
import * as zod from 'zod';

export interface Entrepot {
  jdds: readonly string[],
  nom: string,
  lettre: string,
  photo: string,
  adresse: string,
  code_postal: string,
  ville: string,
  latitude: number,
  longitude: number,
  camions: readonly string[],
  employes: readonly string[]
}

export interface Product {
  jdds: string,
  reference: string,
  photo: string,
  titre: string,
  description: string,
  prix: string,
  option_montage: boolean,
  tdm_thérorique: string | null,
  stocks: readonly string[],
  encombrement: string
}

export interface Stock {
  jdds: string,
  reference: string,
  entrepot: string,
  produit_en_stock: string,
  quantite: number
}

export interface Customer {
  jdds: string,
  code: string,
  email: string,
  prenom: string,
  nom: string,
  adresse: string,
  code_postal: number,
  ville: string,
  latitude: number,
  longitude: number,
  commandes: string | null,
  etat: "livré" | "livrable" | "inscrit"
}

export interface Order {
  jdds: string,
  reference: string,
  etat: OrderState,
  date_de_creation: string,
  note: number | null,
  commentaire: string | null,
  client: string,
  lignes: readonly string[]
}

export interface Lines {
  jdds: string,
  reference: string,
  commande: string,
  produit: string,
  quantite: number,
  option_montage: boolean
}

export interface Employee {
  jdds: readonly string[],
  trigramme: string,
  prenom: string,
  nom: string,
  photo: string,
  telephone: string,
  email: string,
  emploi: string,
  entrepot: string
}

export interface Truck {
  jdds: readonly string[],
  code: string,
  immatriculation: string,
  latitude: number | null,
  longitude: number | null,
  kilometrage: number,
  entrepot: string,
  type: string
}

export interface TruckType {
  nom: string,
  volume: number,
  prix_au_km: string,
  image: string,
  camions: readonly string[]
}

export interface DisplayedOrder {
  reference: string,
  etat: OrderState,
  date_de_creation: string,
  selected?: boolean,
  client: {
    email: string,
    prenom: string,
    nom: string,
    adresse: string,
    code_postal: number,
    ville: string
  }
}

export const orderSchema = zod.object({
  jdds: zod.string(),
  reference: zod.string(),
  etat: zod.nativeEnum(OrderState),
  date_de_creation: zod.string(),
  note: zod.number().nullable(),
  commentaire: zod.string().nullable(),
  client: zod.string(),
  lignes: zod.array(zod.string()).readonly()
})

export const ordersSchema = zod.array(orderSchema).readonly();

export const customerSchema = zod.object({
  jdds: zod.string(),
  code: zod.string(),
  email: zod.string(),
  prenom: zod.string(),
  nom: zod.string(),
  adresse: zod.string(),
  code_postal: zod.number(),
  ville: zod.string(),
  latitude: zod.number(),
  longitude: zod.number(),
  commandes: zod.string().nullable(),
  etat: zod.enum(["livré", "livrable", "inscrit"])
})

export const customersSchema = zod.array(customerSchema).readonly();

