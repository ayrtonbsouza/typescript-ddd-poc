import { Product } from './product';

describe('Product Entity', () => {
  it('should not be able to create a new product instance when id is empty', () => {
    expect(() => {
      const product = new Product('', 'Product 1', 10);
      return product;
    }).toThrowError('Id is required');
  });

  it('should not be able to create a new product instance when name is empty', () => {
    expect(() => {
      const product = new Product('1234567890', '', 10);
      return product;
    }).toThrowError('Name is required');
  });

  it('should not be able to create a new product instance when price is less than zero', () => {
    expect(() => {
      const product = new Product('1234567890', 'Product 1', -1);
      return product;
    }).toThrowError('Price must be greater than zero');
  });

  it('should be able to change product name', () => {
    const product = new Product('1234567890', 'Product 1', 10);
    product.changeName('Product 2');
    expect(product.name).toBe('Product 2');
  });

  it('should be able to change product price', () => {
    const product = new Product('1234567890', 'Product 1', 10);
    product.changePrice(20);
    expect(product.price).toBe(20);
  });
});
