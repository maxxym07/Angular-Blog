import { TestBed } from '@angular/core/testing';

import { Mainservice } from './mainservice.service';

describe('Mainservice', () => {
  let service: Mainservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mainservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
