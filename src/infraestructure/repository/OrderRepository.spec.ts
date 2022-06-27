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
import { OrderRepository } from './OrderRepository';
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
          id: orderItem.id,
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
      ],
    });
  });

  it('should be able to update an order', async () => {
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

    const orderItem2 = new OrderItem(
      '1234567890',
      product.id,
      product.name,
      product.price,
      3
    );

    const order2 = new Order('1234567890', customer.id, [orderItem2]);

    await orderRepository.update(order2);

    const orderModel = await OrderModel.findOne({
      where: { id: order2.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1234567890',
      customerId: '1234567890',
      total: 300,
      items: [
        {
          id: orderItem2.id,
          productId: orderItem2.productId,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order2.id,
        },
      ],
    });
  });

  it('should be able to find an order', async () => {
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
          id: orderItem.id,
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
      ],
    });
  });

  it('should be able to list all orders', async () => {
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
          id: orderItem.id,
          productId: orderItem.productId,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
        },
      ],
    });
  });
});
