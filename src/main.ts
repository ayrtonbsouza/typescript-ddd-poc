import { Address } from './entities/address';
import { Customer } from './entities/customer';
import { Order } from './entities/order';
import { OrderItem } from './entities/order_item';

const customer = new Customer('123', 'John Doe');
const address = new Address('Main St', 123, '12345', 'Anytown', 'CA');

customer.Address = address;

customer.activate();

const item1 = new OrderItem('123', 'Item 1', 10);
const item2 = new OrderItem('456', 'Item 2', 20);

const order = new Order('123', '123', [item1, item2]);
