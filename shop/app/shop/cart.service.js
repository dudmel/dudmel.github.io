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
var CartService = (function () {
    function CartService(productService) {
        this.productService = productService;
        this.cart = [];
        this.total = 0;
    }
    CartService.prototype.query = function () {
        return this.cart;
    };
    CartService.prototype.addToCart = function (id) {
        var _this = this;
        this.productService.get(id).then(function (product) {
            if (!_this.cart[0])
                _this.cart.push({ 'item': product, 'amount': 1 });
            else if (_this.findInCart(id)[0])
                _this.findInCart(id)[0].amount++;
            else
                _this.cart.push({ 'item': product, 'amount': 1 });
        });
    };
    CartService.prototype.findInCart = function (productId) {
        return this.cart.filter(function (p) {
            return p.item.id === productId;
        });
    };
    CartService.prototype.removeFromCart = function (productId) {
        console.log('removing from cart: ', productId);
        this.cart = this.cart.filter(function (p) {
            return p.item.id !== productId;
        });
        return this.query();
    };
    CartService.prototype.checkTotal = function () {
        this.cart = this.query();
        return this.cart.reduce(function (acc, curr) {
            return acc + curr.item.price * curr.amount;
        }, 0);
    };
    CartService.prototype.checkAmount = function () {
        if (this.cart)
            return this.cart.reduce(function (acc, curr) {
                return acc + curr.amount;
            }, 0);
        else
            return 0;
    };
    CartService.prototype.changeAmount = function (product, change) {
        if ((product.amount > 0 && change === -1) || change === 1)
            product.amount += change;
        this.total = this.checkTotal();
    };
    CartService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map