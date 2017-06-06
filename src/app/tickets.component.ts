import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from './ticket';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-tickets',
  templateUrl: "./tickets.component.html",
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {
  selectedTicket: Ticket;
  tickets: Ticket[];
  errorMessage: string;

  constructor (private authService: AuthService, private router: Router) {}

  ngOnInit(): void{
    this.getData();
  }

  getTicket(): void {
    this.authService.getTickets().then(tickets => this.tickets = tickets);
  }

  getData(): void {
    this.authService.getTickets()
                    .then(tickets => console.log("Data access success!"))
                    .catch(err => console.error('An error has occurred', err));
  }

  onSelect(ticket: Ticket): void {
    this.selectedTicket = ticket;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedTicket.id]);
  }
}
