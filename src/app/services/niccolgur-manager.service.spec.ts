import { TestBed } from '@angular/core/testing';

import { NiccolgurManagerService } from './niccolgur-manager.service';

describe('NiccolgurManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiccolgurManagerService = TestBed.get(NiccolgurManagerService);
    expect(service).toBeTruthy();
  });
});
