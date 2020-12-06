import { TestBed } from '@angular/core/testing';

import { TicketStatusesService } from './ticket-statuses.service';

describe('TicketStatusesService', () => {
  let service: TicketStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
