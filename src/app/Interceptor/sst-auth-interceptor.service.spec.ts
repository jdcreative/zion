import { TestBed } from '@angular/core/testing';

import { SSTAuthInterceptorService } from './sst-auth-interceptor.service';

describe('SSTAuthInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SSTAuthInterceptorService = TestBed.get(SSTAuthInterceptorService);
    expect(service).toBeTruthy();
  });
});
