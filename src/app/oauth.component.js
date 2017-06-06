"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var OauthComponent = (function () {
    function OauthComponent() {
        this.tokenRE = /#access_token=(\w*)&/;
        this.redirectUri = 'http://localhost:3000';
    }
    OauthComponent.prototype.ngOnInit = function () {
        var hasToken = window.location.href.match(this.tokenRE);
        localStorage.setItem('zen_token', hasToken[1]);
        window.location.replace(this.redirectUri);
    };
    return OauthComponent;
}());
OauthComponent = __decorate([
    core_1.Component({
        selector: 'oauth',
        template: '<div></div>'
    })
], OauthComponent);
exports.OauthComponent = OauthComponent;
//# sourceMappingURL=oauth.component.js.map