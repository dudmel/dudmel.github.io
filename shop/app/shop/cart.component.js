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
var product_service_1 = require('../products/product.service');
var admin_btns_component_1 = require('../admin/admin-btns.component');
var customer_btns_component_1 = require('../shop/customer-btns.component');
var cart_service_1 = require('../shop/cart.service');
var CartComponent = (function () {
    function CartComponent(productService, cartService) {
        this.productService = productService;
        this.cartService = cartService;
        this.products = [];
    }
    CartComponent.prototype.ngOnInit = function () {
        this.products = this.cartService.query();
        this.total = this.cartService.checkTotal();
        this.cartService.checkAmount();
    };
    CartComponent.prototype.removeFromCart = function (productId) {
        this.products = this.cartService.removeFromCart(productId);
    };
    CartComponent.prototype.changeAmount = function (product, change) {
        this.cartService.changeAmount(product, change);
        this.total = this.cartService.checkTotal();
    };
    CartComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styles: ['img {width: 50px}'],
            directives: [admin_btns_component_1.AdminBtnsComponent, customer_btns_component_1.CustomerBtnsComponent],
            selector: 'products-list',
            template: "\n    <section style=\"margin-top:100px\">\n      <h2>Cart</h2>\n\n      <table class=\"table table-hover\">\n        <thead>\n                <th></th>\n                <th>Product</th>\n                <th>Price</th>\n                <th>Actions</th>\n                <th>Amount</th>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let product of products\">\n                <td> <img [src]=\"product.item.getImgUrl()\">    </td>\n                <td> {{product.item.name}}   </td>\n                <td> {{product.item.price  | currency:'USD':true}} </td>\n                <td> \n                  <button class=\"btn btn-danger\"\n                    (click) = \"removeFromCart(product.item.id)\">\n                    <i class=\"glyphicon glyphicon-trash\"></i>\n                  </button>\n                  <button class=\"btn btn-primary\"\n                    (click) = \"changeAmount(product, 1)\"> +\n                  </button>\n                  <button class=\"btn btn-primary\"\n                    (click) = \"changeAmount(product, -1)\"> -\n                  </button>\n                </td>\n                <td> {{product.amount}} </td>\n            </tr>\n            <tr> Total: {{total}} </tr>\n        </tbody>\n    </table>\n       \n    </section>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, cart_service_1.CartService])
    ], CartComponent);
    return CartComponent;
}());
exports.CartComponent = CartComponent;
//# sourceMappingURL=cart.component.js.map