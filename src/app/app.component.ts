import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  template: `
  <h1>{{title}}</h1>
  <nav>
    <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
    <a routerLink="/tickets" routerLinkActive="active">Tickets</a>
  </nav>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Zen Tickets';
}
