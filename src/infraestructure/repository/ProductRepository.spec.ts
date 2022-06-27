import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../domain/entities';
import { ProductModel } from '../database/sequelize/model/Product.model';
import { ProductRepository } from './ProductRepository';

describe('Product Repository', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1234567890', 'Product 1', 100);

    await productRepository.create(product);

    const findProduct = await ProductModel.findOne({
      where: { id: '1234567890' },
    });

    expect(findProduct.toJSON()).toStrictEqual({
      id: '1234567890',
      name: 'Product 1',
      price: 100,
    });
  });

  it('should be able to update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1234567890', 'Product 1', 100);

    await productRepository.create(product);

    const findProduct = await ProductModel.findOne({
      where: { id: '1234567890' },
    });

    expect(findProduct.toJSON()).toStrictEqual({
      id: '1234567890',
      name: 'Product 1',
      price: 100,
    });

    product.changeName('Product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const findProductUpdated = await ProductModel.findOne({
      where: { id: '1234567890' },
    });

    expect(findProductUpdated.toJSON()).toStrictEqual({
      id: '1234567890',
      name: 'Product 2',
      price: 200,
    });
  });

  it('should be able to find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1234567890', 'Product 1', 100);

    await productRepository.create(product);
    const productModel = await ProductModel.findOne({
      where: { id: '1234567890' },
    });
    const findProduct = await productRepository.find('1234567890');

    expect(productModel.toJSON()).toStrictEqual({
      id: findProduct.id,
      name: findProduct.name,
      price: findProduct.price,
    });
  });

  it('should be able to find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1234567890', 'Product 1', 100);
    await productRepository.create(product1);

    const product2 = new Product('0987654321', 'Product 2', 200);
    await productRepository.create(product2);

    const findProducts = await productRepository.findAll();

    const products = [product1, product2];

    expect(products).toEqual(findProducts);
  });
});
