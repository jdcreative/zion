import { TestBed, async, inject } from '@angular/core/testing';

import { BusinessInformationGuard } from './business-information.guard';

describe('BusinessInformationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessInformationGuard]
    });
  });

  it('should ...', inject([BusinessInformationGuard], (guard: BusinessInformationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
