import { Order } from '../../domain/entities';
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
    throw new Error('Method not implemented.');
  }

  async find(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
