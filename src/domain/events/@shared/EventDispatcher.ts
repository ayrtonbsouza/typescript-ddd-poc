import { IEvent } from './IEvent';
import { IEventDispatcher } from './IEventDispatcher';
import { IEventHandler } from './IEventHandler';

export class EventDispatcher implements IEventDispatcher {
  private eventHandlers: { [eventName: string]: IEventHandler<IEvent>[] } = {};

  get getEventHandlers(): { [eventName: string]: IEventHandler[] } {
    return this.eventHandlers;
  }

  notify(event: IEvent): void {
    throw new Error('Method not implemented.');
  }

  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    throw new Error('Method not implemented.');
  }

  unregisterAll(): void {
    throw new Error('Method not implemented.');
  }
}
