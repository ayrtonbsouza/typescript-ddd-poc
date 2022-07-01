import { IEvent } from '../../@shared/events/IEvent';

export class CustomerCreatedEvent implements IEvent {
  dateTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
