import { OrderItem } from './OrderItem';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required');
    }

    if (!this._customerId) {
      throw new Error('Customer id is required');
    }

    if (!this._items || this._items.length === 0) {
      throw new Error('Items are required');
    }

    if (this._items.some((item) => item.quantity < 1)) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
