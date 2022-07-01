import { v4 as uuid } from 'uuid';
import { IProduct } from '../entities/IProduct';
import { Product } from '../entities/Product';

export class ProductFactory {
  static create(type: string, name: string, price: number): IProduct {
    switch (type) {
      case 'a':
        return new Product(uuid(), name, price);
      default:
        throw new Error('Invalid product type');
    }
  }
}
