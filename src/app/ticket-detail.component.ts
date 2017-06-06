import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { Ticket } from './ticket';
import { AuthService } from './auth.service';

@Component({
  selector: 'ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})

export class TicketDetailComponent implements OnInit{
  ticket: Ticket;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.authService.getTicket(+params['id']))
      .subscribe(ticket => this.ticket = ticket);
  }
}
