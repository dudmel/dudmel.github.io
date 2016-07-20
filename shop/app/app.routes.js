"use strict";
var core_1 = require('@angular/core');
var app_component_1 = require('./app.component');
var admin_component_1 = require('./admin/admin.component');
var shop_component_1 = require('./shop/shop.component');
var cart_component_1 = require('./shop/cart.component');
var product_edit_component_1 = require('./products/product-edit.component');
var product_details_component_1 = require('./products/product-details.component');
var router_1 = require('@angular/router');
var routes = [
    { path: '', component: app_component_1.AppComponent },
    { path: 'admin', component: admin_component_1.AdminComponent },
    { path: 'shop', component: shop_component_1.ShopComponent },
    { path: 'cart', component: cart_component_1.CartComponent },
    { path: 'product/edit', component: product_edit_component_1.ProductEditComponent },
    { path: 'product/edit/:id', component: product_edit_component_1.ProductEditComponent },
    { path: 'product/:id/:name', component: product_details_component_1.ProductDetailsComponent }
];
exports.ROUTER_PROVIDERS = [
    router_1.provideRouter(routes),
    { provide: core_1.PLATFORM_DIRECTIVES, useValue: router_1.ROUTER_DIRECTIVES, multi: true }
];
//# sourceMappingURL=app.routes.js.map