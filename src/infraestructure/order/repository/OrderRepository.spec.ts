import { Sequelize } from 'sequelize-typescript';
import { Order } from '../../../domain/checkout/entities/Order';
import { OrderItem } from '../../../domain/checkout/entities/OrderItem';
import { Customer } from '../../../domain/customer/entities/Customer';
import { Address } from '../../../domain/customer/value-object/Address';
import { Product } from '../../../domain/product/entities/Product';
import { CustomerModel } from '../../customer/database/model/Customer.model';
import { CustomerRepository } from '../../customer/repository/CustomerRepository';
import { ProductModel } from '../../product/database/model/sequelize/Product.model';
import { ProductRepository } from '../../product/repository/sequelize/ProductRepository';
import { OrderModel } from '../database/sequelize/model/Order.model';
import { OrderItemModel } from '../database/sequelize/model/OrderItem.model';
import { OrderRepository } from './OrderRepository';

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
    const product1 = new Product('1234567890', 'Product 1', 100);
    const product2 = new Product('0987654321', 'Product 2', 50);
    await productRepository.create(product1);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      '1234567890',
      product1.id,
      product1.name,
      product1.price,
      2
    );

    const orderItem2 = new OrderItem(
      '0987654321',
      product2.id,
      product2.name,
      product2.price,
      2
    );

    const order = new Order('1234567890', customer.id, [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order.changeItems([orderItem2]);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: '1234567890' },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '1234567890',
      customerId: '1234567890',
      total: 100,
      items: [
        {
          id: orderItem2.id,
          productId: orderItem2.productId,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          orderId: order.id,
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

    const orderFound = await orderRepository.find(order.id);

    expect(orderFound).toStrictEqual(order);
  });

  it('should be able to list all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1234567890', 'John Doe');
    const address1 = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer1.changeAddress(address1);

    const customer2 = new Customer('0987654321', 'Jane Doe');
    const address2 = new Address('Other st', 321, '54321', 'Cupertino', 'CA');
    customer2.changeAddress(address2);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRepository = new ProductRepository();

    const product1 = new Product('1234567890', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('0987654321', 'Product 2', 50);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem(
      '1234567890',
      product1.id,
      product1.name,
      product1.price,
      2
    );

    const orderItem2 = new OrderItem(
      '0987654321',
      product2.id,
      product2.name,
      product2.price,
      1
    );

    const order1 = new Order('1234567890', customer1.id, [orderItem1]);
    const order2 = new Order('0987654321', customer2.id, [orderItem2]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});
