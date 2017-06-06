import { Component, OnInit } from '@angular/core';

import { Ticket } from './ticket';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  tickets: Ticket[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getTickets()
      .then(tickets => this.tickets = tickets.slice(1,4));
  }
}
