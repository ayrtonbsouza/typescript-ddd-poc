import { Order } from '../entities/order';

export class OrderService {
  static summarizeValue(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
