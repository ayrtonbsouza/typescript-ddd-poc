import { Address } from './entities/address';
import { Customer } from './entities/customer';
import { Order } from './entities/order';
import { OrderItem } from './entities/order_item';

const customer = new Customer('123', 'John Doe');
const address = new Address('Main St', 123, '12345', 'Anytown', 'CA');

customer.Address = address;

customer.activate();

const item1 = new OrderItem('1', '1234567890', 'First Item', 10, 2);
const item2 = new OrderItem('2', '0987654321', 'Second Item', 20, 2);
const order = new Order('1234567890', '1234567890', [item1, item2]);
