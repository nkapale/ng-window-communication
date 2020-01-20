/**
 * main.component.ts
 *
 * 01/20/2020
 * @anuthor nkapale
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AppEventManagerService } from 'src/app/services/app-event-manager.service';
import { AppWindowCommunicationService } from 'src/app/services/app-window-communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  data = '';
  handler: Window;

  /**
   * This constructor inject services.
   *
   * @param eventManager AppEventManagerService
   */
  constructor(
    private eventManager: AppEventManagerService,
    private cdref: ChangeDetectorRef,
    private windowService: AppWindowCommunicationService
  ) {
    this.eventManager.subscribe('CHILD_EVENT_DATA', res => {
      this.data = res.data;
      this.cdref.markForCheck();
    });
  }

  /**
   * This method is used to open child window.
   *
   * @param value string
   */
  openChildWindow(value: string): void {
    const handler = window.open(
      'window',
      '',
      'toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=400,height=400,top=100,left=100'
    );
    this.handler = handler;
    this.windowService.registerToSendData(handler, value);
  }

  /**
   * This method is used to send the message to child window.
   *
   * @param value strig
   */
  sendMessage(value: string): void {
    if (!this.handler) {
      return;
    }
    this.windowService.sendData(this.handler, value);
  }
}
