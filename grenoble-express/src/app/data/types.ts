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
  encombrement: string,
  id: string
}

export interface Stock {
  jdds: string,
  reference: string,
  entrepot: string,
  produit_en_stock: string,
  quantite: number,
  id: string
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
  etat: "livré" | "livrable" | "inscrit",
  id: string
}

export interface Order {
  jdds: string,
  reference: string,
  etat: OrderState,
  date_de_creation: string,
  note: number | null,
  commentaire: string | null,
  client: string,
  lignes: readonly string[],
  id: string
}

export interface Lines {
  jdds: string,
  reference: string,
  commande: string,
  produit: string,
  quantite: number,
  option_montage: boolean,
  id: string
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
  entrepot: string,
  id: string
}

export interface Truck {
  jdds: readonly string[],
  code: string,
  immatriculation: string,
  latitude: number | null,
  longitude: number | null,
  kilometrage: number,
  entrepot: string,
  type: string,
  id?: string
}

export interface TruckType {
  nom: string,
  volume: number,
  prix_au_km: string,
  image: string,
  camions: readonly string[],
  id: string
}

export interface DisplayedOrder {
  reference: string,
  etat: OrderState,
  date_de_creation: string,
  selected?: boolean,
  client: {
    id?: string,
    email: string,
    prenom: string,
    nom: string,
    adresse: string,
    code_postal: number,
    ville: string
  }
}

const clientSchema = zod.object({
  email: zod.string(),
  prenom: zod.string(),
  nom: zod.string(),
  adresse: zod.string(),
  code_postal: zod.number(),
  ville: zod.string(),
  id: zod.string().optional()
});

export const displayOrderSchema = zod.object({
  reference: zod.string(),
  etat: zod.nativeEnum(OrderState),
  date_de_creation: zod.string(),
  selected: zod.boolean().optional(),
  client: clientSchema
})

export interface Tour {
  id?: string,
  name: string,
  orders: readonly DisplayedOrder[],
  date: string,
  truck: Truck
  delivers: readonly Employee[]
}

export interface Job {
  id: number;
  service: number;
  delivery: number[];
  location: [number, number];
  skills: number[];
  time_windows?: [number, number][];
}

export interface Vehicle {
  id: number;
  profile: string;
  start:[number,number];
  end:[number,number];
  capacity:[number];
  skills: number[];
  time_windows?: [number, number][];
}

export interface OptimizationBodyRequest{
  jobs : Job[];
  vehicles : Vehicle[];
}


export const orderSchema = zod.object({
  jdds: zod.string(),
  reference: zod.string(),
  etat: zod.nativeEnum(OrderState),
  date_de_creation: zod.string(),
  note: zod.number().nullable(),
  commentaire: zod.string().nullable(),
  client: zod.string(),
  lignes: zod.array(zod.string()).readonly(),
  id: zod.string()
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
  etat: zod.enum(["livré", "livrable", "inscrit"]),
  id: zod.string()
})

export const customersSchema = zod.array(customerSchema).readonly();

export const truckSchema = zod.object({
  jdds: zod.array(zod.string()).readonly(),
  code: zod.string(),
  immatriculation: zod.string(),
  latitude: zod.number().nullable(),
  longitude: zod.number().nullable(),
  kilometrage: zod.number(),
  entrepot: zod.string(),
  type: zod.string(),
  id: zod.string().optional()
});

export const trucksSchema = zod.array(truckSchema).readonly();

export const employeeSchema = zod.object({
  jdds: zod.array(zod.string()).readonly(),
  trigramme: zod.string(),
  prenom: zod.string(),
  nom: zod.string(),
  photo: zod.string(),
  telephone: zod.string(),
  email: zod.string(),
  emploi: zod.string(),
  entrepot: zod.string(),
  id: zod.string()
});

export const employeesSchema = zod.array(employeeSchema).readonly();

export const tourSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string(),
  orders: zod.array(displayOrderSchema).readonly(),
  date: zod.string(),
  truck: truckSchema,
  delivers: zod.array(employeeSchema).readonly()
})

export const toursSchema = zod.array(tourSchema).readonly();

export const entrepotSchema = zod.object({
  jdds: zod.array(zod.string()).readonly(),
  nom: zod.string(),
  lettre: zod.string(),
  photo: zod.string(),
  adresse: zod.string(),
  code_postal: zod.string(),
  ville: zod.string(),
  latitude: zod.number(),
  longitude: zod.number(),
  camions: zod.array(zod.string()).readonly(),
  employes: zod.array(zod.string()).readonly()
})
