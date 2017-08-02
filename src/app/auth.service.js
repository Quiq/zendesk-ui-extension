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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var envs_service_1 = require("./envs.service");
var AuthService = (function () {
    function AuthService(http, envService) {
        this.http = http;
        this.envService = envService;
        this.localData = 'app/mock-ticket-data.json';
    }
    AuthService.prototype.getAccess = function () {
        if (!localStorage.getItem('zen_token')) {
            var params = new http_1.URLSearchParams();
            params.set('response_type', 'token');
            params.set('client_id', this.envService.CLIENT_ID);
            params.set('scope', 'read');
            params.set('redirect_uri', this.envService.REDIRECT_URI);
            window.location.replace(this.envService.ZEN_SITE + "/oauth/authorizations/new?" + params.toString());
        }
    };
    AuthService.prototype.getTicketsByName = function (name) {
        if (!localStorage.getItem('zen_token')) {
            return Promise.reject('No access token available');
        }
        var headers = new http_1.Headers();
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        var search_string = "type:ticket requester:" + name;
        return this.http
            .get(this.envService.ZEN_SITE + "/api/v2/search.json?query=" + search_string, {
            headers: headers,
        })
            .toPromise()
            .then(this.extractResults)
            .catch(this.handleError);
    };
    AuthService.prototype.getTicketsByPhone = function (phone) {
        var _this = this;
        if (!localStorage.getItem('zen_token')) {
            return Promise.reject('No access token available');
        }
        var headers = new http_1.Headers();
        var new_phone = phone;
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        if (phone[0] === '+') {
            new_phone = phone.slice(1);
        }
        var search_string = "type:user phone:" + new_phone;
        return this.http
            .get(this.envService.ZEN_SITE + "/api/v2/search.json?query=" + search_string, {
            headers: headers,
        })
            .toPromise()
            .then(function (response) { return (response.json().results[0] ? _this.getTicketsByName(response.json().results[0].name) : Promise.resolve([])); })
            .catch(this.handleError);
    };
    AuthService.prototype.getLocalTickets = function () {
        return this.http
            .get(this.localData)
            .toPromise()
            .then(this.extractResults);
    };
    AuthService.prototype.extractResults = function (res) {
        var body = res.json();
        return body.results || {};
    };
    AuthService.prototype.handleError = function (error) {
        // TODO: IMPROVE THIS
        console.error('An error has occurred', error);
        return Promise.reject(error.message || error);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, envs_service_1.EnvService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map