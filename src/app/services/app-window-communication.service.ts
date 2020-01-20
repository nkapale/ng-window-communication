/**
 * app-window-communication.service.ts
 *
 * 01/20/2020
 * @anuthor nkapale
 */
import { Injectable, OnDestroy } from '@angular/core';
import { AppEvent } from 'src/app/model/event.model';

import { AppEventManagerService } from './app-event-manager.service';

@Injectable({
  providedIn: 'root'
})
export class AppWindowCommunicationService implements OnDestroy {
  /**
   * This constructor inject services.
   *
   * @param eventManager AppEventManagerService
   */
  constructor(private eventManager: AppEventManagerService) {
    window.onstorage = event => {
      if (event.key === 'WINDOW_COMMUNICATION_EVENT' && event.newValue) {
        const originalEvent: AppEvent<any> = JSON.parse(event.newValue);
        this.eventManager.broadcast(originalEvent);
      }
    };
    // tslint:disable-next-line: no-string-literal
    Window['receiveMessage'] = event => {
      this.receiveMessage(event);
    };
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: no-string-literal
    Window['receiveMessage'] = null;
  }

  /**
   * This method broadcast storag event.
   *
   * @param eventName string
   * @param data any
   */
  on(eventName: string, data: any): void {
    const event = new AppEvent(eventName, data);
    localStorage.setItem('WINDOW_COMMUNICATION_EVENT', JSON.stringify(event));
    localStorage.removeItem('WINDOW_COMMUNICATION_EVENT');
  }

  /**
   * This method is used to open child window and send data to child window.
   *
   * @param handler Window
   * @param data any
   */
  registerToSendData(handler: Window, data: any): void {
    const origin = window.origin;
    const event = new AppEvent('CHILD_WINDOW_EVENT', JSON.stringify(data));
    handler.window.addEventListener(
      'message',
      evt => {
        // tslint:disable-next-line: no-string-literal
        handler.window['receiveMessage'](evt);
      },
      false
    );
    handler.onload = () => {
      handler.postMessage(event, origin);
    };
  }

  /**
   * This method is used to send data to child window.
   *
   * @param handler Window
   * @param data any
   */
  sendData(handler: Window, data: any): void {
    const origin = window.origin;
    const event = new AppEvent('CHILD_WINDOW_EVENT', JSON.stringify(data));
    handler.postMessage(event, origin);
  }

  /**
   * This method is used to recive the parent window data.
   * @param event any
   */
  private receiveMessage(event: any): void {
    if (event.origin !== window.origin) {
      return;
    }
    const evt = event.data;
    if (evt['name'] === 'CHILD_WINDOW_EVENT') {
      const data = JSON.parse(evt['data']);
      const appEvent = new AppEvent('PARENT_WINDOW_DATA_EVENT', data);
      this.eventManager.broadcast(appEvent);
    }
  }
}
