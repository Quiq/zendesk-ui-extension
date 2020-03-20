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
var ticket_1 = require("./ticket");
var envs_service_1 = require("./envs.service");
var TicketDetailComponent = /** @class */ (function () {
    function TicketDetailComponent(envService) {
        this.envService = envService;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", ticket_1.Ticket)
    ], TicketDetailComponent.prototype, "ticket", void 0);
    TicketDetailComponent = __decorate([
        core_1.Component({
            selector: 'ticket-detail',
            templateUrl: './ticket-detail.component.html',
            styleUrls: ['./ticket-detail.component.css'],
        }),
        __metadata("design:paramtypes", [envs_service_1.EnvService])
    ], TicketDetailComponent);
    return TicketDetailComponent;
}());
exports.TicketDetailComponent = TicketDetailComponent;
//# sourceMappingURL=ticket-detail.component.js.map