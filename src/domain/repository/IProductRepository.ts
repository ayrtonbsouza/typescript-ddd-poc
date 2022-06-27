import { Product } from '../entities';
import { IRepository } from './IRepository';

export type IProductRepository = IRepository<Product>;
