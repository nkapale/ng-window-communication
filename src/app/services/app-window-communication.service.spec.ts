import { TestBed } from '@angular/core/testing';

import { AppWindowCommunicationService } from './app-window-communication.service';

describe('AppWindowCommunicationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppWindowCommunicationService = TestBed.get(AppWindowCommunicationService);
    expect(service).toBeTruthy();
  });
});
