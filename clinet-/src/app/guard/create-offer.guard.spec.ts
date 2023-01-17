import { TestBed } from '@angular/core/testing';

import { CreateOfferGuard } from './create-offer.guard';

describe('CreateOfferGuard', () => {
  let guard: CreateOfferGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateOfferGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
