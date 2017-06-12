import { Component, OnInit } from '@angular/core';

import { Ticket } from './ticket';
import { User } from './user';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./priority-colors.css', './dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  tickets: Ticket[] = [];
  user: User;
  selectedTicket: Ticket;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getTicketsByName("Donkey Kong")
                    .then(tickets => this.tickets = tickets
                      .filter((ticket) => ticket.status!=="solved" && ticket.status!=="closed")
                      .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
                      .slice(0,4))
                    .catch(err => console.error('An error has occurred', err));
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }
}
