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
var User_1 = require("./User");
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
        var _this = this;
        if (!localStorage.getItem('zen_token')) {
            return Promise.reject('No access token available');
        }
        this.userName = name;
        var headers = new http_1.Headers();
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        var search_string = "type:ticket requester:" + this.userName;
        return this.http
            .get(this.envService.ZEN_SITE + "/api/v2/search.json?query=" + search_string, {
            headers: headers,
        })
            .toPromise()
            .then(this.extractResults)
            .then(function (tickets) { return (_this.tickets = tickets); })
            .catch(this.handleError);
    };
    AuthService.prototype.getUserByPhone = function (phoneNumber) {
        var _this = this;
        this.phone = phoneNumber;
        var headers = new http_1.Headers();
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        var search_string = "type:user phone:" + this.phone;
        return this.http
            .get(this.envService.ZEN_SITE + "/api/v2/search.json?query=" + search_string, {
            headers: headers,
        })
            .toPromise()
            .then(this.extractResults)
            .then(function (user) { return (_this.user = user); })
            .catch(this.handleError);
    };
    AuthService.prototype.getTicketsByPhone = function (phoneNumber) {
        var _this = this;
        this.phone = phoneNumber;
        var headers = new http_1.Headers();
        headers.set('Authorization', 'Bearer ' + localStorage.getItem('zen_token'));
        var search_string = "type:user phone:" + this.phone;
        return this.http
            .get(this.envService.ZEN_SITE + "/api/v2/search.json?query=" + search_string, {
            headers: headers,
        })
            .toPromise()
            .then(function (response) { return (_this.userName = response.json().results.name); })
            .then(function () { return _this.getTicketsByName(_this.userName); })
            .catch(this.handleError);
    };
    AuthService.prototype.getUserById = function (id) {
        // TODO: Implement this
        var tempUser = new User_1.User();
        tempUser.id = 1;
        tempUser.name = 'Donkey Kong';
        return Promise.resolve(tempUser);
    };
    AuthService.prototype.getLocalTickets = function () {
        var _this = this;
        return this.http
            .get(this.localData)
            .toPromise()
            .then(this.extractResults)
            .then(function (tickets) { return (_this.tickets = tickets); });
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