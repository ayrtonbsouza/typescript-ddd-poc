import { IEvent } from './IEvent';

export interface IEventHandler<T extends IEvent = IEvent> {
  handle(event: T): void;
}
