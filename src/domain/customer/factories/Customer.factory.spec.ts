import { Address } from '../value-object/Address';
import { CustomerFactory } from './Customer.factory';

describe('Customer Factory', () => {
  it('should be able to create a customer', () => {
    const customer = CustomerFactory.create('John Doe');
    expect(customer).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBeUndefined();
  });

  it('should be able to create a customer with an address', () => {
    const address = new Address('Main st', 123, '12345', 'New York', 'NY');
    const customer = CustomerFactory.createWithAddress('John Doe', address);

    expect(customer).toBeDefined();
    expect(customer.name).toBe('John Doe');
    expect(customer.address).toBe(address);
  });
});
