import { IEventHandler } from '../../@shared/IEventHandler';
import { CustomerCreatedEvent } from '../CustomerCreated.event';

export class SendSMSWhenCustomerIsCreatedHandler
  implements IEventHandler<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log('Esse é o segundo console.log do evento: CustomerCreated');
  }
}
