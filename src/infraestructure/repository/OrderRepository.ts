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
    await OrderItemModel.destroy({ where: { orderId: entity.id } });

    entity.items.map(async (item) => {
      await OrderItemModel.create({
        id: item.id,
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
        orderId: entity.id,
      });
    });

    await OrderModel.update(
      {
        customerId: entity.customerId,
        total: entity.total(),
      },
      {
        where: { id: entity.id },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;

    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        include: [{ model: OrderItemModel }],
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Order not found');
    }

    const items = orderModel.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.productId,
          item.name,
          item.price,
          item.quantity
        )
    );

    const order = new Order(orderModel.id, orderModel.customerId, items);

    return order;
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
