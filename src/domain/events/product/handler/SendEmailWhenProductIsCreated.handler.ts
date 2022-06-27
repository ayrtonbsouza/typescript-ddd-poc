import { IEventHandler } from '../../@shared/IEventHandler';
import { ProductCreatedEvent } from '../ProductCreated.event';

export class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ${event.eventData.email}`);
  }
}
