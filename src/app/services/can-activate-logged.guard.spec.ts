import { TestBed } from '@angular/core/testing';

import { CanActivateLoggedGuard } from './can-activate-logged.guard';

describe('CanActivateLoggedGuard', () => {
  let guard: CanActivateLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanActivateLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
