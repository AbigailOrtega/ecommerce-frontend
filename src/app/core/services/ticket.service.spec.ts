import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService } from './ticket.service';
import { Ticket, TicketRequest } from '@shared/models';

const BASE_API = 'http://localhost:8080/api';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeTicket(id = 1, orderNumber = 'ORD-001'): Ticket {
  return {
    id,
    orderId: 10,
    orderNumber,
    userId: 3,
    userName: 'Carlos Perez',
    subject: 'Missing item',
    description: 'One item was not in the package.',
    status: 'OPEN',
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-04-01T00:00:00Z',
  };
}

// ── Suite ──────────────────────────────────────────────────────────────────

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService],
    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── createTicket() ─────────────────────────────────────────────────────

  describe('createTicket()', () => {
    const ticketReq: TicketRequest = {
      subject: 'Wrong size delivered',
      description: 'I ordered a Large but received a Small.',
    };

    it('sends POST to /orders/{orderNumber}/tickets', () => {
      service.createTicket('ORD-042', ticketReq).subscribe();

      const req = httpMock.expectOne(`${BASE_API}/orders/ORD-042/tickets`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: makeTicket(1, 'ORD-042') });
    });

    it('sends the correct request body', () => {
      service.createTicket('ORD-042', ticketReq).subscribe();

      const req = httpMock.expectOne(`${BASE_API}/orders/ORD-042/tickets`);
      expect(req.request.body).toEqual(ticketReq);
      req.flush({ success: true, data: makeTicket(1, 'ORD-042') });
    });

    it('returns the created ticket', () => {
      const created = makeTicket(15, 'ORD-042');

      service.createTicket('ORD-042', ticketReq).subscribe(res => {
        expect(res.data.id).toBe(15);
        expect(res.data.orderNumber).toBe('ORD-042');
        expect(res.data.status).toBe('OPEN');
      });

      httpMock
        .expectOne(`${BASE_API}/orders/ORD-042/tickets`)
        .flush({ success: true, data: created });
    });

    it('uses the provided orderNumber in the URL path', () => {
      service.createTicket('ORD-999', ticketReq).subscribe();

      const req = httpMock.expectOne(`${BASE_API}/orders/ORD-999/tickets`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: makeTicket(1, 'ORD-999') });
    });
  });

  // ── getMyTickets() ─────────────────────────────────────────────────────

  describe('getMyTickets()', () => {
    it('sends GET to /tickets', () => {
      service.getMyTickets().subscribe();

      const req = httpMock.expectOne(`${BASE_API}/tickets`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of tickets for the current user', () => {
      const tickets = [makeTicket(1, 'ORD-001'), makeTicket(2, 'ORD-002')];

      service.getMyTickets().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].orderNumber).toBe('ORD-001');
        expect(res.data[1].orderNumber).toBe('ORD-002');
      });

      httpMock.expectOne(`${BASE_API}/tickets`).flush({ success: true, data: tickets });
    });

    it('returns empty list when user has no tickets', () => {
      service.getMyTickets().subscribe(res => {
        expect(res.data).toEqual([]);
      });

      httpMock.expectOne(`${BASE_API}/tickets`).flush({ success: true, data: [] });
    });
  });

  // ── getTicketById() ────────────────────────────────────────────────────

  describe('getTicketById()', () => {
    it('sends GET to /tickets/{id}', () => {
      service.getTicketById(7).subscribe();

      const req = httpMock.expectOne(`${BASE_API}/tickets/7`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeTicket(7) });
    });

    it('returns the ticket matching the given id', () => {
      const expected = makeTicket(7, 'ORD-007');

      service.getTicketById(7).subscribe(res => {
        expect(res.data.id).toBe(7);
        expect(res.data.orderNumber).toBe('ORD-007');
        expect(res.data.subject).toBe('Missing item');
      });

      httpMock.expectOne(`${BASE_API}/tickets/7`).flush({ success: true, data: expected });
    });

    it('returns a ticket with IN_PROGRESS status', () => {
      const inProgress = { ...makeTicket(8), status: 'IN_PROGRESS' as const };

      service.getTicketById(8).subscribe(res => {
        expect(res.data.status).toBe('IN_PROGRESS');
      });

      httpMock.expectOne(`${BASE_API}/tickets/8`).flush({ success: true, data: inProgress });
    });
  });
});
