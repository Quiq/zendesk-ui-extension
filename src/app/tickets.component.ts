import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdTooltipModule } from '@angular/material';
import { Response } from '@angular/http';
import { Ticket } from './ticket';
import { User } from './user';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./priority-colors.css','./tickets.component.css']
})

export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;
  tickets: Ticket[];
  user: User;
  errorMessage: string;

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void{
    this.authService.getAccess();
    this.getData();
  }

  getData(): void {
    const a = this.authService.getTicketsByName('Donkey Kong')
                    .then(tickets => this.tickets = tickets)
                    .then(this.appendIcons)
                    .then(() => this.authService.getUserById(this.tickets[1].id))
                    .then(user => this.user = user)
                    .catch(err => console.error('An error has occurred', err));
  }

  private appendIcons(tickets: Ticket[]) {
    // TODO: parse this from ticket.subject or ticket.rawsubject
    for (let ticket of tickets) {
      switch (ticket.via.channel) {
        case "web":
          ticket.icon = "envelope-o";
          break;
        case "mobile":
          ticket.icon = "mobile";
          break;
        default:
          ticket.icon = "bath";
      }
    }
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTicket.id]);
  }
}
