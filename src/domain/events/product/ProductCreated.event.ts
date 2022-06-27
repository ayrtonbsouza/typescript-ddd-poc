import { IEvent } from '../@shared/IEvent';

export class ProductCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}