import { v4 as uuid } from 'uuid';
import { Customer, OrderItem, Order } from '../entities';

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static summarizeValue(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
