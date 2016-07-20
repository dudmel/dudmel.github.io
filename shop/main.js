"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_2 = require('@angular/core');
var _1 = require('./app/');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_routes_1 = require('./app/app.routes');
if (_1.environment.production) {
    core_2.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    forms_1.provideForms(),
    forms_1.disableDeprecatedForms(),
    app_routes_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy })
]);
//# sourceMappingURL=main.js.map