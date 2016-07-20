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
var cart_service_1 = require('../shop/cart.service');
var CustomerBtnsComponent = (function () {
    function CustomerBtnsComponent(cartService) {
        this.cartService = cartService;
    }
    CustomerBtnsComponent.prototype.ngOnInit = function () { };
    CustomerBtnsComponent.prototype.addToCart = function (productId) {
        this.cartService.addToCart(productId);
    };
    CustomerBtnsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'customersBtns',
            inputs: ['product'],
            template: "<button class=\"btn btn-warning\"\n                 (click) = \"addToCart(product.id)\"> \n                 <i class=\"glyphicon glyphicon-shopping-cart\"></i> Add to cart\n               </button>\n                 <a routerLink=\"/product/{{product.id}}/{{product.name}}\" class=\"btn btn-success\">Details</a>"
        }), 
        __metadata('design:paramtypes', [cart_service_1.CartService])
    ], CustomerBtnsComponent);
    return CustomerBtnsComponent;
}());
exports.CustomerBtnsComponent = CustomerBtnsComponent;
//# sourceMappingURL=customer-btns.component.js.map