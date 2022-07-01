import { v4 as uuid } from 'uuid';
import { Order } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';

interface IOrderFactoryProps {
  customerId: string;
  items: {
    id: string;
    name: string;
    productId: string;
    quantity: number;
    price: number;
  }[];
}

export class OrderFactory {
  static create(props: IOrderFactoryProps): Order {
    const items = props.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.productId,
          item.quantity,
          item.price
        )
    );

    return new Order(uuid(), props.customerId, items);
  }
}
