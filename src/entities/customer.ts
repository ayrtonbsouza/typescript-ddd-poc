export class Customer {
  _id: string;
  _name = '';
  _address = '';
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

    if (this._address.length === 0) {
      throw new Error('Address is required');
    }
  }
}
