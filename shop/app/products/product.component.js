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
var product_service_1 = require('./product.service');
var ProductComponent = (function () {
    function ProductComponent(route, productService) {
        this.route = route;
        this.productService = productService;
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            //  console.log('Params are: ', params);
            var id = +params['id'];
            var prmProduct = _this.productService.get(id);
            prmProduct.then(function (product) {
                _this.product = product;
            });
        });
    };
    ProductComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            //   styleUrls: [`monster.css`],
            // selector: 'monster-list',
            template: "\n    <section *ngIf=\"product\">\n      <h2>Monster {{product.name}}</h2>\n      <!--<img [src]=\"product.getImgUrl()\" >-->\n\n    </section>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, product_service_1.ProductService])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map