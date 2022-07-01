import { IEventHandler } from '../../../@shared/events/IEventHandler';
import { ProductCreatedEvent } from '../ProductCreated.event';

export class SendEmailWhenProductIsCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email because ${event.eventData.name} was created`);
  }
}
