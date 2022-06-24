import { Sequelize } from 'sequelize-typescript';
import { Address, Customer } from '../../domain/entities';
import { CustomerModel } from '../database/sequelize/model/Customer.model';
import { CustomerRepository } from './CustomerRepository';

describe('Customer Repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: '1234567890' },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1234567890',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      state: address.state,
    });
  });

  it('should be able to update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    customer.changeName('Jane Doe');
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({
      where: { id: '1234567890' },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1234567890',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      state: address.state,
    });
  });

  it('should be able to find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const customerFound = await customerRepository.find(customer.id);

    expect(customerFound).toStrictEqual(customer);
  });

  it('should receive an error when the customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find('not-a-real-id');
    }).rejects.toThrow('Customer not found');
  });

  it('should be able to find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('1234567890', 'John Doe');
    const address1 = new Address('Main st', 123, '12345', 'New York', 'NY');
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer('0987654321', 'Jane Doe');
    const address2 = new Address('Minor st', 321, '54321', 'Cupertino', 'CA');
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
