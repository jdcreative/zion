import { TestBed, async, inject } from '@angular/core/testing';

import { BusinessHomeGuard } from './business-home.guard';

describe('BusinessHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessHomeGuard]
    });
  });

  it('should ...', inject([BusinessHomeGuard], (guard: BusinessHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
