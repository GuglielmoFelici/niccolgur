import { TestBed } from '@angular/core/testing';

import { NiccolgurService } from './niccolgur.service';

describe('NiccolgurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiccolgurService = TestBed.get(NiccolgurService);
    expect(service).toBeTruthy();
  });
});
