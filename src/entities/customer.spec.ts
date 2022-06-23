import { Address } from './address';
import { Customer } from './customer';

describe('Customer Entity', () => {
  it('should not be able to create a new category instance when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'John Doe');
      return customer;
    }).toThrowError('Id is required');
  });

  it('should not be able to create a new category instance when name is empty', () => {
    expect(() => {
      const customer = new Customer('1234567890', '');
      return customer;
    }).toThrowError('Name is required');
  });

  it('should be able to change name', () => {
    const customer = new Customer('1234567890', 'John Doe');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  });

  it('should be able to activate customer', () => {
    const customer = new Customer('1234567890', 'John Doe');
    const address = new Address('123 Main St', 123, '12345', 'Anytown', 'CA');

    customer.Address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should be able to deactivate customer', () => {
    const customer = new Customer('1234567890', 'John Doe');

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it('should not be able to activate a customer without address', () => {
    const customer = new Customer('1234567890', 'John Doe');

    expect(() => {
      customer.activate();
    }).toThrowError('Address is required');
  });

  it('should be able to add reward points', () => {
    const customer = new Customer('1234567890', 'John Doe');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });
});
