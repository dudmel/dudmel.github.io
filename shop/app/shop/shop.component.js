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
var products_list_component_1 = require('../products/products-list.component');
var router_1 = require('@angular/router');
var ShopComponent = (function () {
    function ShopComponent(route, productService) {
        this.route = route;
        this.productService = productService;
    }
    ShopComponent.prototype.ngOnInit = function () {
        var _this = this;
        var prmProducts = this.productService.query();
        prmProducts.then(function (products) {
            _this.products = products;
        });
        prmProducts.catch(function (err) {
            console.log('Sorry, cannot load the products, try again later');
        });
    };
    ShopComponent.prototype.removeProduct = function (productId) {
        var _this = this;
        this.productService.remove(productId)
            .then(function (products) {
            _this.products = products;
        });
    };
    ShopComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'shop',
            directives: [products_list_component_1.ProductsListComponent],
            providers: [product_service_1.ProductService],
            template: "\n    <products-list [isAdmin]=\"false\"></products-list>\n        "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, product_service_1.ProductService])
    ], ShopComponent);
    return ShopComponent;
}());
exports.ShopComponent = ShopComponent;
//# sourceMappingURL=shop.component.js.map