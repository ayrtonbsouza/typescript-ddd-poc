import { Order } from './Order';
import { OrderItem } from './OrderItem';

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
    const item1 = new OrderItem('1', '1234567890', 'First Item', 10, 2);
    const item2 = new OrderItem('2', '0987654321', 'Second Item', 20, 2);
    const order = new Order('1234567890', '1234567890', [item1, item2]);
    expect(order.total()).toBe(60);
  });

  it('should not be able to use a negative number as quantity parameter', () => {
    expect(() => {
      const item = new OrderItem('1', '1234567890', 'First Item', 10, 0);
      const order = new Order('1234567890', '1234567890', [item]);
      return order;
    }).toThrowError('Quantity must be greater than 0');
  });
});
