import { TestBed, async, inject } from '@angular/core/testing';

import { StateCompanyGuard } from './state-company.guard';

describe('StateCompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateCompanyGuard]
    });
  });

  it('should ...', inject([StateCompanyGuard], (guard: StateCompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
