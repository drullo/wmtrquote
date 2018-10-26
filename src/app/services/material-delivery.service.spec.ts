import { TestBed } from '@angular/core/testing';

import { MaterialDeliveryService } from './material-delivery.service';

describe('MaterialDeliveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialDeliveryService = TestBed.get(MaterialDeliveryService);
    expect(service).toBeTruthy();
  });
});
