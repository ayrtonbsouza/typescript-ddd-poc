import { v4 as uuid } from 'uuid';
import { OrderFactory } from './Order.factory';

describe('Order Factory', () => {
  it('should be able to create an order', () => {
    const orderProps = {
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: 'Product 1',
          productId: uuid(),
          quantity: 1,
          price: 100,
        },
      ],
    };

    const order = OrderFactory.create(orderProps);

    expect(order).toBeDefined();
    expect(order.id).toBeDefined();
    expect(order.items.length).toBe(1);
  });
});
