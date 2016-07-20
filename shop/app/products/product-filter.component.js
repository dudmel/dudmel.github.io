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
var ProductFilterComponent = (function () {
    function ProductFilterComponent() {
        this.filterChange = new core_1.EventEmitter();
        this.filter = { byName: '', byPrice: '' };
    }
    ProductFilterComponent.prototype.ngOnInit = function () { };
    ProductFilterComponent.prototype.filterChanged = function () {
        this.filterChange.emit(this.filter);
    };
    ProductFilterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'product-filter',
            outputs: ['filterChange'],
            template: "\n      <section>\n        <h3>Filter</h3>\n        By Name:  <input type=\"text\" [(ngModel)]=\"filter.byName\" (input)=\"filterChanged()\" />\n        By Price: <input type=\"number\" [(ngModel)]=\"filter.byPrice\" (input)=\"filterChanged()\" />\n      </section>\n\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ProductFilterComponent);
    return ProductFilterComponent;
}());
exports.ProductFilterComponent = ProductFilterComponent;
//# sourceMappingURL=product-filter.component.js.map