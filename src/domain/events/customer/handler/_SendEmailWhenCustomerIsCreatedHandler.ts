import { IEventHandler } from '../../@shared/IEventHandler';
import { CustomerCreatedEvent } from '../CustomerCreated.event';

export class SendEmailWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Sending e-mail to ${event.eventData.phone}`);
  }
}
