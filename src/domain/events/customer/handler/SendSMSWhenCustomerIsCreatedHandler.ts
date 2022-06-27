import { IEventHandler } from '../../@shared/IEventHandler';
import { CustomerCreatedEvent } from '../CustomerCreated.event';

export class SendSMSWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Sending SMS to ${event.eventData.phone}`);
  }
}
