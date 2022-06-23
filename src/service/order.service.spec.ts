import { Order } from '../entities/order';
import { OrderItem } from '../entities/order_item';
import { OrderService } from './order.service';

describe('Order Service', () => {
  it('should be able to summarize all orders value', () => {
    const item1 = new OrderItem('1234567890', '1234567890', 'Item 1', 100, 1);
    const item2 = new OrderItem('0987654321', '0987654321', 'Item 2', 200, 2);
    const item3 = new OrderItem('1234567890', '1234567890', 'Item 1', 150, 1);
    const item4 = new OrderItem('0987654321', '0987654321', 'Item 2', 120, 2);

    const order1 = new Order('123456', '123456', [item1, item2]);
    const order2 = new Order('098765', '098765', [item3, item4]);

    const sum = OrderService.summarizeValue([order1, order2]);

    expect(sum).toBe(890);
  });
});
