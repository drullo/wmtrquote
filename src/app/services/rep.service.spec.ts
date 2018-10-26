import { TestBed } from '@angular/core/testing';

import { RepService } from './rep.service';

describe('RepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepService = TestBed.get(RepService);
    expect(service).toBeTruthy();
  });
});
