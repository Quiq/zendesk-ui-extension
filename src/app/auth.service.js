"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.zenUrl = 'https://jetdog.zendesk.com/oauth/authorizations/new';
        this.zenQueryUrl = 'https://jetdog.zendesk.com/api/v2/search.json';
        this.redirectUri = 'http://localhost:3000/oauth';
        this.client_id = 'my_sample_app';
    }
    // getCheese(id: number): Promise<Cheese> {
    //   return this.getCheeses()
    //             .then(cheeses => cheeses.find(cheese => cheese.id === id));
    // }
    //
    // getCheeses(): Promise<Cheese[]> {
    //   return Promise.resolve(CHEESES);
    // }
    AuthService.prototype.getAccess = function () {
        if (!localStorage.getItem('zen_token')) {
            var params = new http_1.URLSearchParams();
            params.set('response_type', 'token');
            params.set('client_id', this.client_id);
            params.set('scope', 'read');
            params.set('redirect_uri', this.redirectUri);
            var windowHandle = window.location.replace(this.zenUrl + "?" + params.toString());
        }
    };
    AuthService.prototype.getTicket = function (id) {
        return this.getTickets()
            .then(function (tickets) { return tickets.find(function (ticket) { return ticket.id === id; }); });
    };
    AuthService.prototype.getTickets = function () {
        var headers = new http_1.Headers();
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        var search_string = 'type:ticket requester:"Donkey Kong"';
        return this.http.get(this.zenQueryUrl + "?query=" + search_string, { headers: headers })
            .toPromise()
            .then(this.extractTickets)
            .catch(this.handleError);
    };
    AuthService.prototype.extractTickets = function (res) {
        var body = res.json();
        console.log(body);
        return body.data || {};
    };
    AuthService.prototype.handleError = function (error) {
        console.error("An error has occurred", error);
        return Promise.reject(error.message || error);
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map