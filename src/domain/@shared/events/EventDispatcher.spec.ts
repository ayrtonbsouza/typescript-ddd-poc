import { SendEmailWhenProductIsCreatedHandler } from '../../product/events/handler/SendEmailWhenProductIsCreated.handler';
import { ProductCreatedEvent } from '../../product/events/ProductCreated.event';
import { EventDispatcher } from './EventDispatcher';

describe('Domain events', () => {
  it('should be able to notify event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      description: 'Product 1 description',
      price: 10.0,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it('should be able to register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);
  });

  it('should be able to unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();
    expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
  });

  it('should be able to unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent[0]
    ).toMatchObject(eventHandler);
    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers.ProductCreatedEvent
    ).toBeUndefined();
  });
});
