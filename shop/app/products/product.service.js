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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var ProductModel = (function () {
    function ProductModel(name, price, id) {
        this.name = name;
        this.price = price;
        if (id)
            this._id = id;
        else
            this._id = ProductModel.nextId++;
    }
    Object.defineProperty(ProductModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    ProductModel.prototype.getImgUrl = function () {
        return "app/shared/img/product/" + this.name + ".jpg";
    };
    ProductModel.nextId = 1;
    return ProductModel;
}());
exports.ProductModel = ProductModel;
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.baseUrl = 'http://mrjson.com/data/5787328efd12d79c2ab2dddc/product/';
    }
    ProductService.prototype.query = function () {
        var prmProducts = this.http.get(this.baseUrl + 'list.json')
            .toPromise()
            .then(function (res) {
            var jsonProducts = res.json();
            return jsonProducts.map(function (jsonProduct) {
                return new ProductModel(jsonProduct.name, jsonProduct.price, jsonProduct.id);
            });
        });
        prmProducts.catch(function (err) {
            console.log('Problem talking to server');
        });
        return prmProducts;
    };
    ProductService.prototype.get = function (id) {
        var prmProduct = this.http.get(this.baseUrl + id + '.json')
            .toPromise()
            .then(function (res) {
            var jsonProduct = res.json();
            return new ProductModel(jsonProduct.name, jsonProduct.price, jsonProduct.id);
        });
        prmProduct.catch(function (err) {
            console.log('Problem talking to server');
        });
        return prmProduct;
    };
    ProductService.prototype.remove = function (id) {
        var _this = this;
        var prmProduct = this.http.delete(this.baseUrl + id + '.json')
            .toPromise()
            .then(function (res) {
            return _this.query();
        });
        prmProduct.catch(function (err) {
            console.log('Problem talking to server', err);
        });
        return prmProduct;
    };
    ProductService.prototype.save = function (productData, id) {
        var response;
        var prmProduct;
        if (id) {
            var url = this.baseUrl + id + '.json';
            response = this.http.put(url, productData);
        }
        else {
            var url = this.baseUrl + 'item.json';
            response = this.http.post(url, productData);
        }
        prmProduct = response.toPromise()
            .then(function (res) {
            var jsonProduct = res.json();
            return new ProductModel(jsonProduct.name, jsonProduct.price, jsonProduct.id);
        });
        prmProduct.catch(function (err) {
            console.log('Problem talking to server', err);
        });
        return prmProduct;
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map