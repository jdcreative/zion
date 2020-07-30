import { TestBed, async, inject } from '@angular/core/testing';

import { BusinessStateLoginGuard } from './business-state-login.guard';

describe('BusinessStateLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessStateLoginGuard]
    });
  });

  it('should ...', inject([BusinessStateLoginGuard], (guard: BusinessStateLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
