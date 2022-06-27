import { IEventHandler } from '../../@shared/IEventHandler';
import { CustomerAddressChangedEvent } from '../CustomerAddressChanged.event';

export class SendEmailWhenCustomerAddressIsUpdatedHandler
  implements IEventHandler<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Sending e-mail to ${event.eventData.phone}`);
  }
}
