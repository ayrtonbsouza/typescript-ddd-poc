import { IEventHandler } from '../../../@shared/events/IEventHandler';
import { CustomerCreatedEvent } from '../CustomerCreated.event';

export class SendEmailWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o primeiro console.log do evento: CustomerCreated');
  }
}
