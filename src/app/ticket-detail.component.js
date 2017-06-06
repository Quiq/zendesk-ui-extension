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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
require("rxjs/add/operator/switchMap");
var auth_service_1 = require("./auth.service");
var TicketDetailComponent = (function () {
    function TicketDetailComponent(authService, route, location) {
        this.authService = authService;
        this.route = route;
        this.location = location;
    }
    TicketDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.authService.getTicket(+params['id']); })
            .subscribe(function (ticket) { return _this.ticket = ticket; });
    };
    return TicketDetailComponent;
}());
TicketDetailComponent = __decorate([
    core_1.Component({
        selector: 'ticket-detail',
        templateUrl: './ticket-detail.component.html',
        styleUrls: ['./ticket-detail.component.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.ActivatedRoute,
        common_1.Location])
], TicketDetailComponent);
exports.TicketDetailComponent = TicketDetailComponent;
//# sourceMappingURL=ticket-detail.component.js.map