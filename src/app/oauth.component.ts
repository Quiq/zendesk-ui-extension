import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oauth',
  template: '<div></div>'
})

export class OauthComponent implements OnInit {
  private tokenRE = /#access_token=(\w*)&/;
  private redirectUri = 'http://localhost:3000';

  ngOnInit(): void{
    let hasToken = window.location.href.match(this.tokenRE);
    localStorage.setItem('zen_token', hasToken[1]);
    window.location.replace(this.redirectUri);
  }
}
