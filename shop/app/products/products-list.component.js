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
var filter_list_pipe_1 = require('../shared/pipes/filter-list.pipe');
var product_filter_component_1 = require('./product-filter.component');
var ProductsListComponent = (function () {
    function ProductsListComponent(productService, cartService) {
        this.productService = productService;
        this.cartService = cartService;
        this.filter = { byName: '', byPrice: '' };
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var prmProducts = this.productService.query();
        prmProducts.then(function (products) {
            _this.products = products;
        });
        prmProducts.catch(function (err) {
            console.log('Sorry, cannot load the products, try again later');
            console.log('Caught an error in ProductsList', err);
        });
    };
    ProductsListComponent.prototype.removeProduct = function (id) {
        var _this = this;
        var prmProducts = this.productService.remove(id);
        prmProducts.then(function (products) {
            _this.products = products;
            prmProducts.catch(function (err) {
                console.log('Sorry, cannot load the products, try again later');
                console.log('Caught an error in removeProduct', err);
            });
        });
    };
    ProductsListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            styles: ['img {width: 50px}'],
            directives: [admin_btns_component_1.AdminBtnsComponent, customer_btns_component_1.CustomerBtnsComponent, product_filter_component_1.ProductFilterComponent],
            pipes: [filter_list_pipe_1.FilterByPipe],
            selector: 'products-list',
            inputs: ['isAdmin'],
            template: "\n    <section style=\"margin-top:200px\">\n      <h2>Products</h2>\n      <product-filter (filterChange)=\"filter = $event\"></product-filter>\n      <a *ngIf=\"isAdmin\" routerLink=\"/product/edit\" class=\"btn btn-primary\">+ Add</a>\n     \n      <table class=\"table table-hover\">\n        <thead>\n                <th>ID</th>\n                <th>Product</th>\n                <th>Price</th>\n                <th>Actions</th>\n        </thead>\n        <tbody>\n            <tr *ngFor=\"let product of products | filterBy: filter\">\n                <td> {{product.id}}    </td>\n                <td> {{product.name}}  </td>\n                <td> {{product.price | currency:'USD':true}} </td>\n                <td> <img [src]=\"product.getImgUrl()\"> </td>\n                <td> \n                  <adminBtns     \n                    *ngIf=\"isAdmin\"  \n                    [product]=\"product\"\n                    (productId) = \"removeProduct($event)\" ></adminBtns>\n                  <customersBtns *ngIf=\"!isAdmin\" [product]=\"product\" ></customersBtns>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n       \n    </section>\n\n\n  "
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService, cart_service_1.CartService])
    ], ProductsListComponent);
    return ProductsListComponent;
}());
exports.ProductsListComponent = ProductsListComponent;
//# sourceMappingURL=products-list.component.js.map