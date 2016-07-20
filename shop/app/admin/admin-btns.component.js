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
var AdminBtnsComponent = (function () {
    function AdminBtnsComponent(route, router) {
        this.route = route;
        this.router = router;
        this.productId = new core_1.EventEmitter();
    }
    AdminBtnsComponent.prototype.ngOnInit = function () { };
    AdminBtnsComponent.prototype.removeProduct = function (id) {
        this.productId.emit(id);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AdminBtnsComponent.prototype, "productId", void 0);
    AdminBtnsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'adminBtns',
            inputs: ['product'],
            template: "<button class=\"btn btn-danger\"\n                  (click) = \"removeProduct(product.id)\">\n                  <i class=\"glyphicon glyphicon-trash\"></i>\n                </button>\n                <a routerLink=\"/product/edit/{{product.id}}\" class=\"btn btn-info\">\n                  <i class=\"glyphicon glyphicon-edit\"></i>\n                </a>\n                <a routerLink=\"/product/{{product.id}}/{{product.name}}\" class=\"btn btn-success\">Details</a>"
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router])
    ], AdminBtnsComponent);
    return AdminBtnsComponent;
}());
exports.AdminBtnsComponent = AdminBtnsComponent;
//# sourceMappingURL=admin-btns.component.js.map