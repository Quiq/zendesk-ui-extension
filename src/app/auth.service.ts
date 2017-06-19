import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import {EnvService} from './envs.service';
import {Ticket} from './Ticket';
import {User} from './User';

@Injectable()
export class AuthService {
  private localData = 'app/mock-ticket-data.json';

  constructor(private http: Http, private envService: EnvService) {}

  getAccess(): void {
    if (!localStorage.getItem('zen_token')) {
      let params = new URLSearchParams();
      params.set('response_type', 'token');
      params.set('client_id', this.envService.CLIENT_ID);
      params.set('scope', 'read');
      params.set('redirect_uri', this.envService.REDIRECT_URI);
      window.location.replace(
        `${this.envService.ZEN_SITE}/oauth/authorizations/new?${params.toString()}`,
      );
    }
  }

  getTicketsByName(name: string): Promise<Ticket[]> {
    if (!localStorage.getItem('zen_token')) {
      return Promise.reject('No access token available');
    }

    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
    const search_string = `type:ticket requester:${name}`;

    return this.http
      .get(`${this.envService.ZEN_SITE}/api/v2/search.json?query=${search_string}`, {
        headers: headers,
      })
      .toPromise()
      .then(this.extractResults)
      .catch(this.handleError);
  }

  getLocalTickets(): Promise<Ticket[]> {
    return this.http
      .get(this.localData)
      .toPromise()
      .then(this.extractResults);
  }

  private extractResults(res: Response) {
    let body = res.json();
    return body.results || {};
  }

  private handleError(error: any): Promise<any> {
    // TODO: IMPROVE THIS
    console.error('An error has occurred', error);
    return Promise.reject(error.message || error);
  }
}
