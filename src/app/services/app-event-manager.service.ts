/**
 * app-event-manager.service.ts
 *
 * 01/20/2020
 * @anuthor nkapale
 */
import { Injectable } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';
import { AppEvent } from 'src/app/model/event.model';

@Injectable({
  providedIn: 'root'
})
export class AppEventManagerService {
  observable: Observable<AppEvent<any> | string>;
  observer: Observer<AppEvent<any> | string>;

  constructor() {
    this.observable = Observable.create(
      (observer: Observer<AppEvent<any> | string>) => {
        this.observer = observer;
      }
    ).pipe(share());
  }

  /**
   * Method broadcast the event to observer.
   *
   * @param event  AppEvent<any> | string
   */
  broadcast(event: AppEvent<any> | string): void {
    if (this.observer) {
      this.observer.next(event);
    }
  }

  /**
   * Method subscribe to an event with callback.
   *
   * @param eventName string
   * @param callback any
   *
   * @returns Subscription
   */
  subscribe(eventName: string, callback: any): Subscription {
    const subscriber: Subscription = this.observable
      .pipe(
        filter((event: AppEvent<any> | string) => {
          if (typeof event === 'string') {
            return event === eventName;
          }
          return event.name === eventName;
        }),
        map((event: AppEvent<any> | string) => {
          if (typeof event !== 'string') {
            return event;
          }
        })
      )
      .subscribe(callback);
    return subscriber;
  }

  /**
   * Method unsubscribe the subscription.
   *
   * @param subscriber Subscription
   */
  unsubscribe(subscriber: Subscription): void {
    subscriber.unsubscribe();
  }
}
