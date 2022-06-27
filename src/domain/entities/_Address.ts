export class Address {
  _street = '';
  _number = 0;
  _zip = '';
  _city = '';
  _state = '';

  constructor(
    street: string,
    number: number,
    zip: string,
    city: string,
    state: string
  ) {
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;
    this._state = state;
    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }

    if (this._number === 0) {
      throw new Error('Number is required');
    }

    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }

    if (this._city.length === 0) {
      throw new Error('City is required');
    }

    if (this._state.length === 0) {
      throw new Error('State is required');
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city} - ${this._state}, ${this._zip}`;
  }
}
