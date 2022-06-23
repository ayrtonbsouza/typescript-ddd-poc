import { Product } from '../entities/product';
import { ProductService } from './product.service';

describe('Product Service', () => {
  it('should be able to change price of all products', () => {
    const product1 = new Product('1234567890', 'Product 1', 100);
    const product2 = new Product('1234567891', 'Product 2', 200);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(200);
    expect(product2.price).toBe(400);
  });
});
