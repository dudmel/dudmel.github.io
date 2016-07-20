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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var product_service_1 = require('./products/product.service');
var cart_service_1 = require('./shop/cart.service');
var AppComponent = (function () {
    function AppComponent(router, cartService) {
        this.router = router;
        this.cartService = cartService;
        this.title = 'Welcaome to my store!';
    }
    AppComponent.prototype.log = function (str) {
        console.log(str);
    };
    AppComponent.prototype.checkAmount = function () {
        return this.cartService.checkAmount();
    };
    AppComponent.prototype.ngOnInit = function () {
        this.router.navigate(['/shop']);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            providers: [cart_service_1.CartService, product_service_1.ProductService],
            template: "\n    <div>\n      <nav class=\"navbar navbar-default navbar-fixed-top\">\n        <div class=\"container-fluid\">\n          <span class=\"navbar-brand\"> Shop | </span>\n          <ul class=\"nav navbar-nav\">\n            <li><a routerLink=\"/shop\">Shop</a></li>\n            <li><a routerLink=\"/admin\">Admin</a></li>\n            <li><a routerLink=\"/cart\">Cart ({{checkAmount()}})</a></li>\n          </ul>\n        </div>\n      </nav>\n    </div>\n    <div>\n      <router-outlet></router-outlet>\n    </div>\n",
            styleUrls: ['app.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, cart_service_1.CartService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map