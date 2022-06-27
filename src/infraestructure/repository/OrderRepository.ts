import { Order, OrderItem } from '../../domain/entities';
import { IOrderRepository } from '../../domain/repository/IOrderRepository';
import { OrderItemModel, OrderModel } from '../database/sequelize/model';

export class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const items = entity.items.map(async (item) => {
      await OrderItemModel.update(
        {
          id: item.id,
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        },
        { where: { id: item.id } }
      );
      return new OrderItem(
        item.id,
        item.productId,
        item.name,
        item.price,
        item.quantity
      );
    });

    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items,
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id } });
    const orderItems = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.productId,
          item.name,
          item.price,
          item.quantity
        )
    );
    return new Order(orderModel.id, orderModel.customerId, orderItems);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll();
    return orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.productId,
            item.name,
            item.price,
            item.quantity
          )
      );
      return new Order(orderModel.id, orderModel.customerId, orderItems);
    });
  }
}
