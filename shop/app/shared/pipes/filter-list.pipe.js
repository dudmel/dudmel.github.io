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
var FilterByPipe = (function () {
    function FilterByPipe() {
    }
    FilterByPipe.prototype.transform = function (list, filter) {
        if (list) {
            return list.filter(function (item) {
                return item.name.toLowerCase()
                    .indexOf(filter.byName.toLowerCase()) === 0 &&
                    (!filter.byPrice || item.price === filter.byPrice);
            });
        }
        return null;
    };
    FilterByPipe = __decorate([
        core_1.Pipe({
            name: 'filterBy',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], FilterByPipe);
    return FilterByPipe;
}());
exports.FilterByPipe = FilterByPipe;
//# sourceMappingURL=filter-list.pipe.js.map