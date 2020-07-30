import { TestBed } from '@angular/core/testing';

import { SSTService } from './sst.service';

describe('SSTService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SSTService = TestBed.get(SSTService);
    expect(service).toBeTruthy();
  });
});
