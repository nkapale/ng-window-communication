/**
 * window.component.ts
 *
 * 01/20/2020
 * @anuthor nkapale
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AppEventManagerService } from 'src/app/services/app-event-manager.service';

import { AppWindowCommunicationService } from './../../services/app-window-communication.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent {
  data: any;

  /**
   * Constructor to inject services.
   *
   * @param windowService AppWindowCommunicationService
   * @param cdref ChangeDetectorRef
   */
  constructor(
    private windowService: AppWindowCommunicationService,
    private cdref: ChangeDetectorRef,
    private eventManager: AppEventManagerService
  ) {
    this.eventManager.subscribe('PARENT_WINDOW_DATA_EVENT', res => {
      this.data = res.data;
      this.cdref.detectChanges();
    });
  }

  /**
   * Method to send data to parent.
   *
   * @param value value string
   */
  sendMessageToParent(value: string): void {
    this.windowService.on('CHILD_EVENT_DATA', value);
  }
}
