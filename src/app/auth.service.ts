import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise'

import { Ticket } from './Ticket';
import { User } from './User';

@Injectable()
export class AuthService {
  private localData = 'app/mock-ticket-data.json';
  private myAuthUrl = 'https://d3v-jetdog.zendesk.com/oauth/authorizations/new';
  private centAuthUrl = 'https://centricient.zendesk.com/oauth/authorizations/new';
  private myQueryUrl = 'https://d3v-jetdog.zendesk.com/api/v2/search.json';
  private centQueryUrl = 'https://centricient.zendesk.com/api/v2/search.json';
  private redirectUri = 'https://e2cea7a2.ngrok.io/oauth';
  private myClientId = 'zendeskCustomerLookup';
  private centClientID = 'zendesk_ui_extension';

  user: User;
  userName: string;
  phone: string;
  tickets: Ticket[];

  constructor (private http: Http) {}

  getAccess(): void {
    if (!localStorage.getItem('zen_token')) {
      let params = new URLSearchParams();
      params.set('response_type', 'token');
      params.set('client_id', this.myClientId);
      params.set('scope', 'read');
      params.set('redirect_uri', this.redirectUri);
      const windowHandle = window.location.replace(`${this.myAuthUrl}?${params.toString()}`);
    }
  }

  // getTicket(id: number): Promise<Ticket> {
  //   if (this.tickets) {
  //     return Promise.resolve(this.tickets.find(ticket => ticket.id === id));
  //   }
  //   return Promise.reject("No tickets currently available");
  // }

  getTicketsByName(name: string): Promise<Ticket[]> {
    if (!localStorage.getItem('zen_token')) {
      return Promise.reject("No access token available");
    }
    this.userName = name;
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));

    const search_string = `type:ticket requester:${this.userName}`;

    return this.http.get(`${this.myQueryUrl}?query=${search_string}`, { headers: headers })
                    .toPromise()
                    .then(this.extractResults)
                    .then(tickets => this.tickets = tickets)
                    .catch(this.handleError);
  }

  getUserByPhone(phoneNumber: string): Promise<User> {
    this.phone = phoneNumber;
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));

    const search_string = `type:user phone:${this.phone}`;

    return this.http.get(`${this.myQueryUrl}?query=${search_string}`, { headers: headers })
                    .toPromise()
                    .then(this.extractResults)
                    .then(user => this.user = user)
                    .catch(this.handleError);
  }

  getTicketsByPhone(phoneNumber: string): Promise<Ticket[]> {
    this.phone = phoneNumber;
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));

    const search_string = `type:user phone:${this.phone}`;

    return this.http.get(`${this.myQueryUrl}?query=${search_string}`, { headers: headers })
                    .toPromise()
                    .then(response => this.userName = response.json().results.name)
                    .then(() => this.getTicketsByName(this.userName))
                    .catch(this.handleError);
  }

  getUserById(id: number): Promise<User> {
    let tempUser: User = new User();
    tempUser.id = 1;
    tempUser.name = "Donkey Kong";
    return Promise.resolve(tempUser);
  }

  getLocalTickets(): Promise<Ticket[]> {
    return this.http.get(this.localData).toPromise().then(this.extractResults).then(tickets => this.tickets = tickets);
  }

  private extractResults(res: Response) {
    let body = res.json();
    console.log(body);
    return body.results || {};
  }

  private handleError (error: | any): Promise<any> {  // TODO: IMPROVE THIS
    console.error("An error has occurred", error);
    return Promise.reject(error.message || error);
  }
}
