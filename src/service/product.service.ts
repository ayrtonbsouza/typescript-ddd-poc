import { Product } from '../entities/product';

export class ProductService {
  static increasePrice(products: Product[], percentage: number) {
    products.forEach((product) => {
      product.changePrice(product.price * (1 + percentage / 100));
    });
  }
}
