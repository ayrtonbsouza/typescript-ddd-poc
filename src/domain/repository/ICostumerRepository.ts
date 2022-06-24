import { Customer } from '../entities';
import { IRepository } from './IRepository';

export type ICustomerRepository = IRepository<Customer>;
