import { TestBed, async, inject } from '@angular/core/testing';

import { ConfirmPaymentGuard } from './confirm-payment.guard';

describe('ConfirmPaymentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmPaymentGuard]
    });
  });

  it('should ...', inject([ConfirmPaymentGuard], (guard: ConfirmPaymentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
