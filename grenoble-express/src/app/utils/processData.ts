import {Order, Customer, ordersSchema, customersSchema} from '../data/types';

export function parseOrders(data: unknown): Promise<readonly Order[]> {
  return ordersSchema.parseAsync(data);
}

export function parseCustomers(data: unknown): Promise<readonly Customer[]> {
  return customersSchema.parseAsync(data);
}
