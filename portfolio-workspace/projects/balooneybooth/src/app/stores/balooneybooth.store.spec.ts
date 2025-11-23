import { TestBed } from '@angular/core/testing';

import { BaloneyStoreService } from './balooneybooth.service';

describe('sojajService', () => {
  let service: BaloneyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaloneyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
