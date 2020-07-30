import { TestBed } from '@angular/core/testing';

import { SSOService } from './sso.service';

describe('SSOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SSOService = TestBed.get(SSOService);
    expect(service).toBeTruthy();
  });
});
