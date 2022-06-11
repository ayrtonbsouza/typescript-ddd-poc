import { Address } from './address';

export class Customer {
  _id: string;
  _name = '';
  _address!: Address;
  _active = true;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  set Address(address: Address) {
    this._address = address;
  }
}
