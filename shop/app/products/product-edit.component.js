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
var forms_1 = require('@angular/forms');
var product_service_1 = require('./product.service');
var ProductEditComponent = (function () {
    function ProductEditComponent(formBuilder, route, router, productService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.productService = productService;
    }
    ProductEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('this.route.params', this.route.params);
        this.prepareForm();
        this.route.params.subscribe(function (params) {
            var id = +params['id'];
            // This means EDIT mode
            if (id) {
                _this.productService.get(id)
                    .then(function (product) {
                    _this.productToEdit = product;
                    _this.frmProduct.controls['name'].updateValue(product.name);
                    _this.frmProduct.controls['price'].updateValue(product.price);
                });
            }
        });
    };
    ProductEditComponent.prototype.save = function () {
        var _this = this;
        if (this.productToEdit) {
            // updating a monster
            this.productService.save(this.frmProduct.value, this.productToEdit.id)
                .then(function () {
                _this.router.navigate(['/admin']);
            });
        }
        else {
            // a new monster
            console.log('Product Created', this.frmProduct.value);
            this.productService.save(this.frmProduct.value)
                .then(function (product) {
                _this.router.navigate(['/admin']);
            });
        }
    };
    ProductEditComponent.prototype.prepareForm = function () {
        this.frmProduct = this.formBuilder.group({
            name: ['',
                forms_1.Validators.compose([forms_1.Validators.required,
                    forms_1.Validators.minLength(3),
                    forms_1.Validators.maxLength(100)])],
            price: [0, forms_1.Validators.required]
        });
    };
    ProductEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            // selector: 'product-edit',
            templateUrl: 'product-edit.component.html',
            directives: [forms_1.REACTIVE_FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, product_service_1.ProductService])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=product-edit.component.js.map