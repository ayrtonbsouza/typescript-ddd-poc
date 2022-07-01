import { EventDispatcher } from '../events/@shared/EventDispatcher';
import { AddressChangedEvent } from '../events/customer/AddressChanged.event';
import { CustomerCreatedEvent } from '../events/customer/CustomerCreated.event';
import { SendEmailWhenAddressIsChangedHandler } from '../events/customer/handler/SendEmailWhenAddressIsChanged.handler';
import { SendEmailWhenCustomerIsCreatedHandler } from '../events/customer/handler/SendEmailWhenCustomerIsCreated.handler';
import { SendSMSWhenCustomerIsCreatedHandler } from '../events/customer/handler/SendSMSWhenCustomerIsCreated.handler';
import { Address } from './Address';

export class Customer {
  private _id: string;
  private _name = '';
  private _address!: Address;
  private _active = false;
  private _rewardPoints = 0;

  private eventDispatcher = new EventDispatcher();
  private sendEmailWhenCustomerIsCreatedHandler =
    new SendEmailWhenCustomerIsCreatedHandler();
  private sendSMSWhenCustomerIsCreatedHandler =
    new SendSMSWhenCustomerIsCreatedHandler();
  private sendEmailWhenAddressIsChanged =
    new SendEmailWhenAddressIsChangedHandler();

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
    this.notifyWhenCustomerIsCreated();
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
    this.eventDispatcher.register(
      'AddressChangedEvent',
      this.sendEmailWhenAddressIsChanged
    );
    const addressChangedEvent = new AddressChangedEvent({
      id: this._id,
      name: this._name,
      address: `${this._address.street}, ${this._address.number}`,
    });
    this.eventDispatcher.notify(addressChangedEvent);
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

  private notifyWhenCustomerIsCreated() {
    this.eventDispatcher.register(
      'CustomerCreatedEvent',
      this.sendEmailWhenCustomerIsCreatedHandler
    );
    this.eventDispatcher.register(
      'CustomerCreatedEvent',
      this.sendSMSWhenCustomerIsCreatedHandler
    );

    const customerCreatedEvent = new CustomerCreatedEvent({});
    this.eventDispatcher.notify(customerCreatedEvent);
  }
}
