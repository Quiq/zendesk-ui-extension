import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  template: `
  <h1>{{title}}</h1>
  <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Zendesk Customer History';
}
