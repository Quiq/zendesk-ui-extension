import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

import { Ticket } from './Ticket';

@Injectable()
export class AuthService {
  private zenUrl = 'https://jetdog.zendesk.com/oauth/authorizations/new';
  private zenQueryUrl = 'https://jetdog.zendesk.com/api/v2/search.json';
  private redirectUri = 'http://localhost:3000/oauth';
  private client_id = 'my_sample_app';

  constructor (private http: Http) {}

  // getCheese(id: number): Promise<Cheese> {
  //   return this.getCheeses()
  //             .then(cheeses => cheeses.find(cheese => cheese.id === id));
  // }
  //
  // getCheeses(): Promise<Cheese[]> {
  //   return Promise.resolve(CHEESES);
  // }

  getAccess(): void {
    if (!localStorage.getItem('zen_token')){
      let params = new URLSearchParams();
      params.set('response_type', 'token');
      params.set('client_id', this.client_id);
      params.set('scope', 'read');
      params.set('redirect_uri', this.redirectUri);
      const windowHandle = window.location.replace(`${this.zenUrl}?${params.toString()}`);
    }
  }

  getTicket(id: number): Promise<Ticket> {
    return this.getTickets()
              .then(tickets => tickets.find(ticket => ticket.id === id));
  }

  getTickets(): Promise<Ticket[]> {
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));

    const search_string = 'type:ticket requester:"Donkey Kong"';

    return this.http.get(`${this.zenQueryUrl}?query=${search_string}`, { headers: headers })
                    .toPromise()
                    .then(this.extractTickets)
                    .catch(this.handleError);
  }

  private extractTickets(res: Response) {
    let body = res.json();
    console.log(body);
    return body.data || {};
  }

  private handleError (error: | any): Promise<any> {  // TODO: IMPROVE THIS
    console.error("An error has occurred", error);
    return Promise.reject(error.message || error);
  }
}
