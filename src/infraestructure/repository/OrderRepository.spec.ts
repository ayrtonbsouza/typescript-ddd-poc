import { Sequelize } from 'sequelize-typescript';
import {
  Address,
  Customer,
  Order,
  OrderItem,
  Product,
} from '../../domain/entities';
import {
  CustomerModel,
  OrderModel,
  OrderItemModel,
  ProductModel,
} from '../database/sequelize/model';
import { CustomerRepository } from './CustomerRepository';
import { ProductRepository } from './ProductRepository';

describe('Order Repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1234567890', 'Product 1', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1234567890',
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order('1234567890', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1234567890',
      customerId: '1234567890',
      total: 200,
      items: [
        {
          id: '1234567890',
          productId: '1234567890',
          productName: 'Product 1',
          price: 100,
          quantity: 2,
          orderId: '1234567890',
        },
      ],
    });
  });
});
