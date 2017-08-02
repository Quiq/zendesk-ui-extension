"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EnvService = (function () {
    function EnvService() {
        this.LABELS = {
            '60316187': 'ZIP CODE',
            '60726048': 'CUSTOM TAG',
            '58411107': 'CONV ID',
            '60315747': 'CUSTOM DATE',
            '60315567': 'CUSTOM DECIMAL',
            '60726208': 'CUSTOM TEXT',
            '56668108': 'QUIQ TENANT',
            '60725468': 'CUSTOM TEXTAREA',
            '60726508': 'CUSTOM NUMERIC',
        };
        this.ZEN_SITE = 'https://centricient.zendesk.com';
        this.CLIENT_ID = 'zendeskCustomerLookup';
        this.REDIRECT_URI = 'http://localhost:3000';
        // REDIRECT_URI = 'https://f4725beb.ngrok.io';
        // REDIRECT_URI = 'https://static.quiq-cdn.com/zendeskUIExtension/index.html';
        this.END_USER = 'Joe Montana';
    }
    EnvService = __decorate([
        core_1.Injectable()
    ], EnvService);
    return EnvService;
}());
exports.EnvService = EnvService;
//# sourceMappingURL=envs.service.js.map