import { SendEmailWhenProductIsCreatedHandler } from '../product/handler/SendEmailWhenProductIsCreated.handler';
import { EventDispatcher } from './EventDispatcher';

describe('Domain events', () => {
  it('should be able to register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
  });
});
