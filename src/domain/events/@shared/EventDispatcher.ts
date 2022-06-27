import { IEvent } from './IEvent';
import { IEventDispatcher } from './IEventDispatcher';
import { IEventHandler } from './IEventHandler';

export class EventDispatcher implements IEventDispatcher {
  notify(event: IEvent): void {
    throw new Error('Method not implemented.');
  }
  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    throw new Error('Method not implemented.');
  }
  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    throw new Error('Method not implemented.');
  }
  unregisterAll(): void {
    throw new Error('Method not implemented.');
  }
}
