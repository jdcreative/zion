import { TestBed, async, inject } from '@angular/core/testing';

import { BusinessSelfAppraisalGuard } from './business-self-appraisal.guard';

describe('BusinessSelfAppraisalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessSelfAppraisalGuard]
    });
  });

  it('should ...', inject([BusinessSelfAppraisalGuard], (guard: BusinessSelfAppraisalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
