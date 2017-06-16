import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdTooltipModule} from '@angular/material';
import {Response} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {Ticket} from './ticket';
import {User} from './user';
import {AuthService} from './auth.service';

declare const Quiq: any;

@Component({
  selector: 'my-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./priority-colors.css', './tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;
  tickets: Ticket[];
  user: User;
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getAccess();

    const convo = Quiq.getConversation();
    console.log(convo);

    this.getData();
  }

  getData(): void {
    const a = this.authService
      .getTicketsByName('Joe Montana')
      .then(
        tickets =>
          (this.tickets = tickets.sort(
            (a, b) => +new Date(b.updated_at) - +new Date(a.updated_at),
          )),
      )
      .then(this.setIconsAndTooltips)
      .then(() => this.authService.getUserById(this.tickets[1].id))
      .then(user => (this.user = user))
      .catch(err => console.error('An error has occurred', err));
  }

  private setIconsAndTooltips(tickets: Ticket[]) {
    // TODO: parse this from ticket.subject or ticket.rawsubject
    for (let ticket of tickets) {
      switch (ticket.via.channel) {
        case 'web':
          ticket.icon = 'envelope-o';
          break;
        case 'mobile':
          ticket.icon = 'mobile';
          break;
        default:
          ticket.icon = 'bath';
      }
      ticket.tooltip = ticket.priority ? `${ticket.priority} priority` : ticket.status;
      if (ticket.status === 'closed' || ticket.status === 'solved') {
        ticket.tooltip = ticket.status;
      }
    }
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }
}
