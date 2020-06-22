import { TestBed, inject } from '@angular/core/testing';

import { TdcserviceService } from './tdcservice.service';

describe('TdcserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TdcserviceService]
    });
  });

  it('should be created', inject([TdcserviceService], (service: TdcserviceService) => {
    expect(service).toBeTruthy();
  }));
});
