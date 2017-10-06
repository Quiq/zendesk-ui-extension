import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatTooltipModule} from '@angular/material';
import {Response} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {Ticket} from './ticket';
import {User} from './user';
import {AuthService} from './auth.service';
import {EnvService} from './envs.service';

declare var Quiq: any;

@Component({
  selector: 'my-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./priority-colors.css', './tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;
  tickets: Ticket[];
  quiqConversation: any;
  userName: string;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private envService: EnvService,
  ) {}

  ngOnInit(): void {
    // Oauth - implicit grant flow
    this.authService.getAccess();
    // Use Quiq SDK to get conversation object
    if (window.self !== window.top) {
      this.quiqConversation = Quiq.getConversation();
      //console.log(this.quiqConversation);
      // Use contact name to search tickets via Zendesk API
      if (this.quiqConversation.contact.firstName || this.quiqConversation.contact.lastName) {
        this.userName = [
          this.quiqConversation.contact.firstName,
          this.quiqConversation.contact.lastName,
        ].join(' ');
        this.getDataByName(this.userName);
      } else if (this.quiqConversation.contact.phoneNumber) {
        this.getDataByPhone(this.quiqConversation.contact.phoneNumber)
      } else {
        this.errorMessage = 'No user history information available';
      }
    } else {
      // No Quiq object if running locally
      this.userName = this.envService.END_USER;
      this.getDataByName(this.userName);
    }
  }

  private getDataByName(name: string): void {
    if (name) {
      const a = this.authService
        .getTicketsByName(name)
        .then(
          tickets =>
            (this.tickets = tickets.sort(
              (a, b) => +new Date(b.updated_at) - +new Date(a.updated_at),
            )),
        )
        .then(this.setIconsAndTooltips)
        .catch(err => console.error('An error has occurred', err));
      }
  }

  private getDataByPhone(phone: string): void {
    if (phone) {
      const a = this.authService
        .getTicketsByPhone(phone)
        .then(
          tickets =>
            (this.tickets = tickets.sort(
              (a, b) => +new Date(b.updated_at) - +new Date(a.updated_at),
            )),
        )
        .then(this.setIconsAndTooltips)
        .catch(err => console.error('An error has occurred', err));
    }
  }

  private setIconsAndTooltips = (tickets: Ticket[]) => {
    if (tickets.length < 1) {
      this.errorMessage = `No previous tickets found`;
      return;
    }
    const viaRegEx = /via (\w*)$/;
    for (let ticket of tickets) {
      // try to parse icon from the subject first
      let result = viaRegEx.exec(ticket.subject);
      let icon = result ? result[1] : ticket.via.channel;
      // set icon to font-awesome icon name
      switch (icon) {
        case 'Chat':
          ticket.icon = 'comments-o';
          break;
        case 'web':
          ticket.icon = 'envelope-o';
          break;
        case 'mobile':
        case 'SMS':
          ticket.icon = 'mobile';
          break;
        case 'Facebook':
          ticket.icon = 'facebook-official';
          break;
        default:
          ticket.icon = 'ticket';
      }
      // set tooltip content based on status and priority
      ticket.tooltip = ticket.priority ? `${ticket.priority} priority` : ticket.status;
      if (ticket.status === 'closed' || ticket.status === 'solved') {
        ticket.tooltip = ticket.status;
      }
    }
  }

  private onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }
}
