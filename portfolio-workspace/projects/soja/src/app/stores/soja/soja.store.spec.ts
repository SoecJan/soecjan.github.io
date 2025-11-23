import { TestBed } from '@angular/core/testing';

import { SojaStore } from './soja.store';

describe('SojaStore', () => {
  let service: SojaStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SojaStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
