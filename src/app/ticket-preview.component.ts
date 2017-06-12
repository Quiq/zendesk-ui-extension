import { Component, Input } from '@angular/core';

import { Ticket } from './ticket';

@Component ({
  selector: 'ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.css']
})

export class TicketPreviewComponent {
  @Input() selectedTicket: Ticket;
}
