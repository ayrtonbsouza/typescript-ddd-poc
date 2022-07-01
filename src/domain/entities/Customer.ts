import { EventDispatcher } from '../events/@shared/EventDispatcher';
import { Address } from './Address';

export class Customer {
  private _id: string;
  private _name = '';
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;
  private eventDispatcher = new EventDispatcher();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }

    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is required');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
