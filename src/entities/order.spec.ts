import { Order } from './order';
import { OrderItem } from './order_item';

describe('Order Entity', () => {
  it('should not be able to create a new order instance when id is empty', () => {
    expect(() => {
      const order = new Order('', '1234567890', []);
      return order;
    }).toThrowError('Id is required');
  });

  it('should not be able to create a new order instance when customer id is empty', () => {
    expect(() => {
      const order = new Order('1234567890', '', []);
      return order;
    }).toThrowError('Customer id is required');
  });

  it('should not be able to create a new order instance when items are empty', () => {
    expect(() => {
      const order = new Order('1234567890', '1234567890', []);
      return order;
    }).toThrowError('Items are required');
  });

  it('should be able to calculate total', () => {
    const item1 = new OrderItem('1', 'First Item', 10);
    const item2 = new OrderItem('2', 'Second Item', 20);
    const order = new Order('1234567890', '1234567890', [item1, item2]);
    expect(order.total()).toBe(30);
  });
});
