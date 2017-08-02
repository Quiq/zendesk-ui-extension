import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
  <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  private tokenRE = /#access_token=(\w*)&/;

  constructor(private router: Router) {}

  ngOnInit(): void {
    let hasToken = window.location.href.match(this.tokenRE);
    if (hasToken) {
      localStorage.setItem('zen_token', hasToken[1]);
    }
    this.router.navigateByUrl('/tickets');
  }
}
