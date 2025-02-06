import {
  Order,
  Customer,
  ordersSchema,
  customersSchema,
  Employee,
  employeesSchema,
  Truck,
  trucksSchema, Tour, tourSchema, toursSchema, Entrepot, entrepotSchema
} from '../data/types';

export function parseOrders(data: unknown): Promise<readonly Order[]> {
  return ordersSchema.parseAsync(data);
}

export function parseCustomers(data: unknown): Promise<readonly Customer[]> {
  return customersSchema.parseAsync(data);
}

export function parseEmployees(data: unknown): Promise<readonly Employee[]> {
  return employeesSchema.parseAsync(data);
}

export function parseTrucks(data: unknown): Promise<readonly Truck[]> {
  return trucksSchema.parseAsync(data);
}

export function parseTour(data: unknown): Promise<Tour> {
  return tourSchema.parseAsync(data);
}

export function parseTours(data: unknown): Promise<readonly Tour[]> {
  return toursSchema.parseAsync(data);
}

export function parseStore(data: unknown): Promise<Entrepot> {
  return entrepotSchema.parseAsync(data);
}
