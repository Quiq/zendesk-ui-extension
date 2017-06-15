import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    const convo = Quiq.getConversation();
    console.log('Conversation gotten');
    console.log(convo);
  }
}
