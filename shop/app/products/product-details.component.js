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
var product_service_1 = require('./product.service');
var router_1 = require('@angular/router');
var ProductDetailsComponent = (function () {
    function ProductDetailsComponent(route, router, productService) {
        this.route = route;
        this.router = router;
        this.productService = productService;
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = +params['id'];
            var prmProduct = _this.productService.get(id);
            prmProduct.then(function (product) {
                _this.product = product;
            });
        });
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product-details',
            template: "\n          <section *ngIf=\"product\" style=\"margin-top: 100px\"> \n            <h5>{{product.name}}</h5>\n            <a routerLink=\"/product/{{product.id}}/{{product.name}}\">\n              <img class=\"imgProduct\" [src]=\"product.getImgUrl()\" />\n            </a>\n            <h6>Price: {{product.price | currency:'USD':true}}</h6>\n\n          </section>\n          "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
//# sourceMappingURL=product-details.component.js.map