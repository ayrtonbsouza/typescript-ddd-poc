import { ProductFactory } from './Product.factory';

describe('Product Factory', () => {
  it('should be able to create a product', () => {
    const product = ProductFactory.create('a', 'Product 1', 10);
    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product 1');
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe('Product');
  });

  it('should receive an error when creating a product with invalid type', () => {
    expect(() =>
      ProductFactory.create('fake-type', 'Product 2', 20)
    ).toThrowError('Invalid product type');
  });
});
