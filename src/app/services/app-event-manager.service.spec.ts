import { TestBed } from '@angular/core/testing';

import { AppEventManagerService } from './app-event-manager.service';

describe('AppEventManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppEventManagerService = TestBed.get(AppEventManagerService);
    expect(service).toBeTruthy();
  });
});
