import {Component, Input} from '@angular/core';

import {Ticket} from './ticket';
import {EnvService} from './envs.service';

@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css'],
})
export class TicketDetailComponent {
  @Input() ticket: Ticket;

  constructor(private envService: EnvService) {}
}
