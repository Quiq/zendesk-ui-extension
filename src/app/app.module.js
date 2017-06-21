"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var ticket_detail_component_1 = require("./ticket-detail.component");
var tickets_component_1 = require("./tickets.component");
var oauth_component_1 = require("./oauth.component");
var auth_service_1 = require("./auth.service");
var envs_service_1 = require("./envs.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            providers: [auth_service_1.AuthService, envs_service_1.EnvService],
            imports: [
                app_routing_module_1.AppRoutingModule,
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                animations_1.BrowserAnimationsModule,
                material_1.MdTooltipModule,
                ng_bootstrap_1.NgbModule.forRoot(),
            ],
            declarations: [
                app_component_1.AppComponent,
                tickets_component_1.TicketsComponent,
                ticket_detail_component_1.TicketDetailComponent,
                oauth_component_1.OauthComponent,
            ],
            bootstrap: [app_component_1.AppComponent],
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map