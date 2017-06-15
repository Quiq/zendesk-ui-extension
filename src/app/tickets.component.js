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
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var TicketsComponent = (function () {
    function TicketsComponent(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    TicketsComponent.prototype.ngOnInit = function () {
        this.authService.getAccess();
        this.getData();
    };
    TicketsComponent.prototype.getData = function () {
        var _this = this;
        var a = this.authService
            .getTicketsByName('Donkey Kong')
            .then(function (tickets) {
            return (_this.tickets = tickets.sort(function (a, b) { return +new Date(b.updated_at) - +new Date(a.updated_at); }));
        })
            .then(this.appendIcons)
            .then(function () { return _this.authService.getUserById(_this.tickets[1].id); })
            .then(function (user) { return (_this.user = user); })
            .catch(function (err) { return console.error('An error has occurred', err); });
    };
    TicketsComponent.prototype.appendIcons = function (tickets) {
        // TODO: parse this from ticket.subject or ticket.rawsubject
        for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
            var ticket = tickets_1[_i];
            switch (ticket.via.channel) {
                case 'web':
                    ticket.icon = 'envelope-o';
                    break;
                case 'mobile':
                    ticket.icon = 'mobile';
                    break;
                default:
                    ticket.icon = 'bath';
            }
        }
    };
    TicketsComponent.prototype.onSelect = function (ticket) {
        this.selectedTicket = ticket;
    };
    TicketsComponent = __decorate([
        core_1.Component({
            selector: 'my-tickets',
            templateUrl: './tickets.component.html',
            styleUrls: ['./priority-colors.css', './tickets.component.css'],
        }),
        __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
    ], TicketsComponent);
    return TicketsComponent;
}());
exports.TicketsComponent = TicketsComponent;
//# sourceMappingURL=tickets.component.js.map