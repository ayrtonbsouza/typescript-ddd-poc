import { IEventHandler } from '../../../@shared/events/IEventHandler';
import { AddressChangedEvent } from '../AddressChanged.event';

export class SendEmailWhenAddressIsChangedHandler
  implements IEventHandler<AddressChangedEvent>
{
  handle(event: AddressChangedEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`
    );
  }
}
