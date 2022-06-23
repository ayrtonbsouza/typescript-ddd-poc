import { Customer, Order, OrderItem } from '../entities';
import { OrderService } from './order.service';

describe('Order Service', () => {
  it('should be able to place a new order', () => {
    const customer = new Customer('1234567890', 'John Doe');
    const item = new OrderItem('1', '1234567890', 'First Item', 100, 2);

    const order = OrderService.placeOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(100);
    expect(order.total()).toBe(200);
  });

  it('should be able to summarize all orders value', () => {
    const item1 = new OrderItem(
      '1234567890',
      '1234567890',
      'First Item',
      100,
      1
    );
    const item2 = new OrderItem(
      '0987654321',
      '0987654321',
      'Second Item',
      200,
      2
    );
    const item3 = new OrderItem(
      '1234567890',
      '1234567890',
      'Third Item',
      150,
      1
    );
    const item4 = new OrderItem(
      '0987654321',
      '0987654321',
      'Fourth Item',
      120,
      2
    );

    const order1 = new Order('123456', '123456', [item1, item2]);
    const order2 = new Order('098765', '098765', [item3, item4]);

    const sum = OrderService.summarizeValue([order1, order2]);

    expect(sum).toBe(890);
  });
});
