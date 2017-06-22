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
var envs_service_1 = require("./envs.service");
var TicketsComponent = (function () {
    function TicketsComponent(authService, router, envService) {
        this.authService = authService;
        this.router = router;
        this.envService = envService;
    }
    TicketsComponent.prototype.ngOnInit = function () {
        // Oauth - implicit grant flow
        this.authService.getAccess();
        // Use Quiq SDK to get conversation object
        if (window.self !== window.top) {
            this.quiqConversation = Quiq.getConversation();
            //console.log(this.quiqConversation);
            // Use contact name to search tickets via Zendesk API
            if (this.quiqConversation.contact.firstName || this.quiqConversation.contact.lastName) {
                this.userName = [
                    this.quiqConversation.contact.firstName,
                    this.quiqConversation.contact.lastName,
                ].join(' ');
                this.getData(this.userName);
            }
            else {
                this.errorMessage = 'No user history information available';
            }
        }
        else {
            // No Quiq object if running locally
            this.userName = this.envService.END_USER;
            this.getData(this.userName);
        }
    };
    TicketsComponent.prototype.getData = function (name) {
        var _this = this;
        var a = this.authService
            .getTicketsByName(name)
            .then(function (tickets) {
            return (_this.tickets = tickets.sort(function (a, b) { return +new Date(b.updated_at) - +new Date(a.updated_at); }));
        })
            .then(this.setIconsAndTooltips)
            .catch(function (err) { return console.error('An error has occurred', err); });
    };
    TicketsComponent.prototype.setIconsAndTooltips = function (tickets) {
        if (tickets.length < 1) {
            this.errorMessage = "No previous tickets found for " + this.userName;
        }
        var viaRegEx = /via (\w*)$/;
        for (var _i = 0, tickets_1 = tickets; _i < tickets_1.length; _i++) {
            var ticket = tickets_1[_i];
            // try to parse icon from the subject first
            var result = viaRegEx.exec(ticket.subject);
            var icon = result ? result[1] : ticket.via.channel;
            // set icon to font-awesome icon name
            switch (icon) {
                case 'Chat':
                    ticket.icon = 'comments-o';
                    break;
                case 'web':
                    ticket.icon = 'envelope-o';
                    break;
                case 'mobile':
                case 'SMS':
                    ticket.icon = 'mobile';
                    break;
                case 'Facebook':
                    ticket.icon = 'facebook-official';
                    break;
                default:
                    ticket.icon = 'ticket';
            }
            // set tooltip content based on status and priority
            ticket.tooltip = ticket.priority ? ticket.priority + " priority" : ticket.status;
            if (ticket.status === 'closed' || ticket.status === 'solved') {
                ticket.tooltip = ticket.status;
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
        __metadata("design:paramtypes", [auth_service_1.AuthService,
            router_1.Router,
            envs_service_1.EnvService])
    ], TicketsComponent);
    return TicketsComponent;
}());
exports.TicketsComponent = TicketsComponent;
//# sourceMappingURL=tickets.component.js.map