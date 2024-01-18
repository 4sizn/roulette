import EventEmitter from "eventemitter3";

type EventName = string;
type Handler = (...args: any[]) => void;

export default class EventManager extends EventEmitter {
  public static on(eventName: EventName, handler: Handler): void {
    EventManager.on(eventName, handler);
  }

  public static once(eventName: EventName, handler: Handler): void {
    EventManager.once(eventName, handler);
  }

  public static off(eventName: EventName, handler: Handler): void {
    EventManager.off(eventName, handler);
  }

  public static emit(eventName: EventName, ...args: any[]): void {
    EventManager.emit(eventName, ...args);
  }
}
