(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!**************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/app.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/navbar/navbar.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/navbar/navbar.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n    <ul id=\"navbar\">\n        <li *ngFor=\"let tab of tabs\">\n            <a [className]=\"isCurrent(tab)\"\n               (click)=\"tabOnClick(tab)\">\n                {{tab.desc}}\n            </a>\n        </li>\n    </ul>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/queue/queue-element/queue-element.component.html":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/queue/queue-element/queue-element.component.html ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>queue-element works!</p>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/queue/queue.component.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/queue/queue.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ul id=\"queue\">\n    <li *ngFor=\"let user of elements\" [ngClass]=\"getClassList(user)\" (click)=\"userOnClick(user)\">\n        <img [src]=\"images + user.img\" alt=\"X\">\n        <h2> {{user.nickname}}</h2>\n        <p> {{user.bio}} </p>\n<!--        <a class=\\\"profile\\\" href=\\\"#\\\" [show]=\"isSelected\">VAI AL PROFILO</a>-->\n    </li>\n</ul>\n\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/components/season/season.component.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/season/season.component.html ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>season works!</p>\n"

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _components_queue_queue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/queue/queue.component */ "./src/app/components/queue/queue.component.ts");
/* harmony import */ var _components_season_season_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/season/season.component */ "./src/app/components/season/season.component.ts");





var routes = [
    {
        path: '',
        redirectTo: 'queue',
        pathMatch: 'full',
    },
    {
        path: 'queue',
        component: _components_queue_queue_component__WEBPACK_IMPORTED_MODULE_3__["QueueComponent"],
    },
    {
        path: 'season',
        component: _components_season_season_component__WEBPACK_IMPORTED_MODULE_4__["SeasonComponent"],
    },
    {
        path: '**',
        redirectTo: 'queue',
        pathMatch: 'full',
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'fe-ng';
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _components_queue_queue_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/queue/queue.component */ "./src/app/components/queue/queue.component.ts");
/* harmony import */ var _components_queue_queue_element_queue_element_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/queue/queue-element/queue-element.component */ "./src/app/components/queue/queue-element/queue-element.component.ts");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "./src/app/components/navbar/navbar.component.ts");
/* harmony import */ var _components_season_season_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/season/season.component */ "./src/app/components/season/season.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _components_queue_queue_component__WEBPACK_IMPORTED_MODULE_5__["QueueComponent"],
                _components_queue_queue_element_queue_element_component__WEBPACK_IMPORTED_MODULE_6__["QueueElementComponent"],
                _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_7__["NavbarComponent"],
                _components_season_season_component__WEBPACK_IMPORTED_MODULE_8__["SeasonComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_9__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/navbar/navbar.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@media only screen and (max-width: 499px) {\r\n\r\n    li {\r\n        list-style-type: none;\r\n    }\r\n\r\n    #navbar {\r\n        position: fixed;\r\n        width: 100%;\r\n        top: 0;\r\n        margin-top: 0;\r\n        overflow: hidden;\r\n        background-color: #333;\r\n    }\r\n\r\n    #navbar li {\r\n        float: left;\r\n    }\r\n\r\n    #navbar li * {\r\n        display: block;\r\n        color: white;\r\n        padding: 14px 20px;\r\n        text-align: center;\r\n        text-decoration: none;\r\n    }\r\n\r\n    #navbar li a:hover {\r\n        color: white;\r\n        text-decoration: none;\r\n        background-color: rgb(0, 117, 195);\r\n    }\r\n\r\n    .current {\r\n        color: black !important;\r\n        background-color: whitesmoke;\r\n    }\r\n\r\n    .current:hover {\r\n        color: white !important;\r\n        text-decoration: none;\r\n        background-color: rgb(0, 117, 195);\r\n    }\r\n}\r\n\r\n@media only screen and (min-width: 500px) {\r\n\r\n    li {\r\n        list-style-type: none;\r\n    }\r\n\r\n    #navbar {\r\n        position: fixed;\r\n        display: block;\r\n        width: 100%;\r\n        top: 0;\r\n        margin: 0;\r\n        padding-right: 50px;\r\n        overflow: hidden;\r\n        background-color: #333;\r\n    }\r\n\r\n    #navbar li {\r\n        cursor: pointer;\r\n        float: left;\r\n    }\r\n\r\n    #navbar li * {\r\n        display: block;\r\n        color: white;\r\n        padding: 14px 16px;\r\n        text-align: center;\r\n        text-decoration: none;\r\n    }\r\n\r\n    #navbar li a:hover {\r\n        color: white;\r\n        text-decoration: none;\r\n        background-color: rgb(0, 117, 195);\r\n    }\r\n\r\n    .current {\r\n        color: black !important;\r\n        background-color: whitesmoke;\r\n    }\r\n\r\n    .current:hover {\r\n        color: white !important;\r\n        text-decoration: none;\r\n        background-color: rgb(0, 117, 195);\r\n    }\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0lBRUk7UUFDSSxxQkFBcUI7SUFDekI7O0lBRUE7UUFDSSxlQUFlO1FBQ2YsV0FBVztRQUNYLE1BQU07UUFDTixhQUFhO1FBQ2IsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtJQUMxQjs7SUFFQTtRQUNJLFdBQVc7SUFDZjs7SUFFQTtRQUNJLGNBQWM7UUFDZCxZQUFZO1FBQ1osa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixxQkFBcUI7SUFDekI7O0lBRUE7UUFDSSxZQUFZO1FBQ1oscUJBQXFCO1FBQ3JCLGtDQUFrQztJQUN0Qzs7SUFFQTtRQUNJLHVCQUF1QjtRQUN2Qiw0QkFBNEI7SUFDaEM7O0lBRUE7UUFDSSx1QkFBdUI7UUFDdkIscUJBQXFCO1FBQ3JCLGtDQUFrQztJQUN0QztBQUNKOztBQUVBOztJQUVJO1FBQ0kscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0ksZUFBZTtRQUNmLGNBQWM7UUFDZCxXQUFXO1FBQ1gsTUFBTTtRQUNOLFNBQVM7UUFDVCxtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLHNCQUFzQjtJQUMxQjs7SUFFQTtRQUNJLGVBQWU7UUFDZixXQUFXO0lBQ2Y7O0lBRUE7UUFDSSxjQUFjO1FBQ2QsWUFBWTtRQUNaLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0ksWUFBWTtRQUNaLHFCQUFxQjtRQUNyQixrQ0FBa0M7SUFDdEM7O0lBRUE7UUFDSSx1QkFBdUI7UUFDdkIsNEJBQTRCO0lBQ2hDOztJQUVBO1FBQ0ksdUJBQXVCO1FBQ3ZCLHFCQUFxQjtRQUNyQixrQ0FBa0M7SUFDdEM7O0FBRUoiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNDk5cHgpIHtcclxuXHJcbiAgICBsaSB7XHJcbiAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgfVxyXG5cclxuICAgICNuYXZiYXIge1xyXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICB0b3A6IDA7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcclxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XHJcbiAgICB9XHJcblxyXG4gICAgI25hdmJhciBsaSB7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgI25hdmJhciBsaSAqIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgcGFkZGluZzogMTRweCAyMHB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgI25hdmJhciBsaSBhOmhvdmVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAxMTcsIDE5NSk7XHJcbiAgICB9XHJcblxyXG4gICAgLmN1cnJlbnQge1xyXG4gICAgICAgIGNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICB9XHJcblxyXG4gICAgLmN1cnJlbnQ6aG92ZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMTE3LCAxOTUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDUwMHB4KSB7XHJcblxyXG4gICAgbGkge1xyXG4gICAgICAgIGxpc3Qtc3R5bGUtdHlwZTogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAjbmF2YmFyIHtcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICBwYWRkaW5nLXJpZ2h0OiA1MHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcclxuICAgIH1cclxuXHJcbiAgICAjbmF2YmFyIGxpIHtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICB9XHJcblxyXG4gICAgI25hdmJhciBsaSAqIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgcGFkZGluZzogMTRweCAxNnB4O1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICB9XHJcblxyXG4gICAgI25hdmJhciBsaSBhOmhvdmVyIHtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAxMTcsIDE5NSk7XHJcbiAgICB9XHJcblxyXG4gICAgLmN1cnJlbnQge1xyXG4gICAgICAgIGNvbG9yOiBibGFjayAhaW1wb3J0YW50O1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XHJcbiAgICB9XHJcblxyXG4gICAgLmN1cnJlbnQ6aG92ZXIge1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMTE3LCAxOTUpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/components/navbar/navbar.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ts_domain__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ts/domain */ "./src/app/ts/domain.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(router) {
        this.router = router;
        this.tabs = [
            new _ts_domain__WEBPACK_IMPORTED_MODULE_2__["TypeObject"]('1', 'Queue', 'queue'),
            new _ts_domain__WEBPACK_IMPORTED_MODULE_2__["TypeObject"]('2', 'Season', 'season'),
        ];
        this.current = this.tabs[0];
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.isCurrent = function (tab) {
        return this.current.id === tab.id ? 'current' : '';
    };
    NavbarComponent.prototype.tabOnClick = function (tab) {
        this.current = tab;
        this.router.navigate([tab.data]);
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    NavbarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(/*! raw-loader!./navbar.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/navbar/navbar.component.html"),
            styles: [__webpack_require__(/*! ./navbar.component.css */ "./src/app/components/navbar/navbar.component.css")]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "./src/app/components/queue/queue-element/queue-element.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/components/queue/queue-element/queue-element.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvcXVldWUvcXVldWUtZWxlbWVudC9xdWV1ZS1lbGVtZW50LmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "./src/app/components/queue/queue-element/queue-element.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/queue/queue-element/queue-element.component.ts ***!
  \***************************************************************************/
/*! exports provided: QueueElementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueElementComponent", function() { return QueueElementComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var QueueElementComponent = /** @class */ (function () {
    function QueueElementComponent() {
    }
    QueueElementComponent.prototype.ngOnInit = function () {
    };
    QueueElementComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queue-element',
            template: __webpack_require__(/*! raw-loader!./queue-element.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/queue/queue-element/queue-element.component.html"),
            styles: [__webpack_require__(/*! ./queue-element.component.css */ "./src/app/components/queue/queue-element/queue-element.component.css")]
        })
    ], QueueElementComponent);
    return QueueElementComponent;
}());



/***/ }),

/***/ "./src/app/components/queue/queue.component.css":
/*!******************************************************!*\
  !*** ./src/app/components/queue/queue.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/* MOBILE */\r\n\r\n@media only screen and (max-width: 799px) {\r\n\r\n    /* Lista */\r\n    #queue {\r\n        height: 100%;\r\n        padding-left: 0;\r\n        margin-top: 50px;\r\n    }\r\n\r\n    /* Riga */\r\n    #queue li {\r\n        padding: 5px 0 5px 0;\r\n        overflow: auto;\r\n        -webkit-transition: 1500ms;\r\n        transition: 1500ms;\r\n    }\r\n\r\n    #queue li:hover {\r\n        background: #eee;\r\n        cursor: pointer;\r\n    }\r\n\r\n    /* Foto */\r\n    #queue li img {\r\n        margin: 0 5px 0 5px;\r\n        max-height: 30px;\r\n        max-width: 30px;\r\n        float: left;\r\n        -webkit-transition: 500ms;\r\n        transition: 500ms;\r\n    }\r\n\r\n    /* Nome */\r\n    #queue li h2 {\r\n        vertical-align: top;\r\n        margin: 0 0 0 10px;\r\n        font-size: small;\r\n        -webkit-transition: 500ms;\r\n        transition: 500ms;\r\n    }\r\n\r\n    /* Bio */\r\n    #queue li p {\r\n        color: rgb(78, 78, 78);\r\n        margin: 0 0 0 5px;\r\n        font-size: x-small;\r\n        -webkit-transition: 500ms;\r\n        transition: 500ms;\r\n    }\r\n\r\n    /* Profile */\r\n    #queue li a {\r\n        float: right;\r\n        margin-right: 10px;\r\n        bottom: 10px;\r\n        opacity: 1;\r\n        -webkit-transition: 500ms;\r\n        transition: 500ms;\r\n        background: white;\r\n        padding: 4px 6px 4px 6px;\r\n        font-family: Arial, Helvetica, sans-serif;\r\n        font-size: small;\r\n        color: rgb(29, 29, 29);\r\n        border-radius: 7%;\r\n        border-style: outset;\r\n        border-color: white;\r\n        text-decoration: none;\r\n    }\r\n\r\n    #queue .highlighted {\r\n        background-color: #eee;\r\n    }\r\n\r\n    #queue .highlighted > img {\r\n        max-height: 70px;\r\n        max-width: 70px;\r\n    }\r\n\r\n    #queue .highlighted > h2 {\r\n        font-size: medium;\r\n        margin: 0 0 0 90px;\r\n    }\r\n\r\n    #queue .highlighted > p {\r\n        font-size: small;\r\n        margin: 4px 0 0 90px;\r\n        overflow: hidden;\r\n    }\r\n\r\n    /* Master */\r\n    .master {\r\n        background-color: #c8d6f0;\r\n    }\r\n\r\n    .master:hover {\r\n        background-color: #c8d6f0 !important;\r\n    }\r\n}\r\n\r\n/* DESKTOP */\r\n\r\n@media only screen and (min-width: 800px){\r\n\r\n    /* Lista */\r\n    #queue {\r\n        margin-top: 60px;\r\n    }\r\n\r\n    /* Riga */\r\n    #queue li {\r\n        padding: 20px 0 20px 0;\r\n        overflow: auto;\r\n    }\r\n\r\n    #queue li:hover {\r\n        background: #eee;\r\n        cursor: pointer;\r\n    }\r\n\r\n    /* Foto */\r\n    #queue li img {\r\n        float: left;\r\n        margin: 0 15px 0 15px;\r\n        height: auto;\r\n        width: 150px;\r\n    }\r\n\r\n    /* Nome*/\r\n    #queue li h2 {\r\n        margin: 10px 0 10px 0;\r\n    }\r\n\r\n    /* Bio */\r\n    #queue li p {\r\n        margin: 20px 70% 0 0;\r\n    }\r\n\r\n    .master {\r\n        background-color: #c8d6f0;\r\n    }\r\n\r\n    .master:hover {\r\n        background-color: #c8d6f0 !important;\r\n    }\r\n\r\n\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvY29tcG9uZW50cy9xdWV1ZS9xdWV1ZS5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVc7O0FBRVg7O0lBRUksVUFBVTtJQUNWO1FBQ0ksWUFBWTtRQUNaLGVBQWU7UUFDZixnQkFBZ0I7SUFDcEI7O0lBRUEsU0FBUztJQUNUO1FBQ0ksb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCwwQkFBa0I7UUFBbEIsa0JBQWtCO0lBQ3RCOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLGVBQWU7SUFDbkI7O0lBRUEsU0FBUztJQUNUO1FBQ0ksbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsV0FBVztRQUNYLHlCQUFpQjtRQUFqQixpQkFBaUI7SUFDckI7O0lBRUEsU0FBUztJQUNUO1FBQ0ksbUJBQW1CO1FBQ25CLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIseUJBQWlCO1FBQWpCLGlCQUFpQjtJQUNyQjs7SUFFQSxRQUFRO0lBQ1I7UUFDSSxzQkFBc0I7UUFDdEIsaUJBQWlCO1FBQ2pCLGtCQUFrQjtRQUNsQix5QkFBaUI7UUFBakIsaUJBQWlCO0lBQ3JCOztJQUVBLFlBQVk7SUFDWjtRQUNJLFlBQVk7UUFDWixrQkFBa0I7UUFDbEIsWUFBWTtRQUNaLFVBQVU7UUFDVix5QkFBaUI7UUFBakIsaUJBQWlCO1FBQ2pCLGlCQUFpQjtRQUNqQix3QkFBd0I7UUFDeEIseUNBQXlDO1FBQ3pDLGdCQUFnQjtRQUNoQixzQkFBc0I7UUFDdEIsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIscUJBQXFCO0lBQ3pCOztJQUVBO1FBQ0ksc0JBQXNCO0lBQzFCOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLGVBQWU7SUFDbkI7O0lBRUE7UUFDSSxpQkFBaUI7UUFDakIsa0JBQWtCO0lBQ3RCOztJQUVBO1FBQ0ksZ0JBQWdCO1FBQ2hCLG9CQUFvQjtRQUNwQixnQkFBZ0I7SUFDcEI7O0lBRUEsV0FBVztJQUNYO1FBQ0kseUJBQXlCO0lBQzdCOztJQUVBO1FBQ0ksb0NBQW9DO0lBQ3hDO0FBQ0o7O0FBRUEsWUFBWTs7QUFFWjs7SUFFSSxVQUFVO0lBQ1Y7UUFDSSxnQkFBZ0I7SUFDcEI7O0lBRUEsU0FBUztJQUNUO1FBQ0ksc0JBQXNCO1FBQ3RCLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxnQkFBZ0I7UUFDaEIsZUFBZTtJQUNuQjs7SUFFQSxTQUFTO0lBQ1Q7UUFDSSxXQUFXO1FBQ1gscUJBQXFCO1FBQ3JCLFlBQVk7UUFDWixZQUFZO0lBQ2hCOztJQUVBLFFBQVE7SUFDUjtRQUNJLHFCQUFxQjtJQUN6Qjs7SUFFQSxRQUFRO0lBQ1I7UUFDSSxvQkFBb0I7SUFDeEI7O0lBRUE7UUFDSSx5QkFBeUI7SUFDN0I7O0lBRUE7UUFDSSxvQ0FBb0M7SUFDeEM7OztBQUdKIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9xdWV1ZS9xdWV1ZS5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTU9CSUxFICovXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc5OXB4KSB7XHJcblxyXG4gICAgLyogTGlzdGEgKi9cclxuICAgICNxdWV1ZSB7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMDtcclxuICAgICAgICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFJpZ2EgKi9cclxuICAgICNxdWV1ZSBsaSB7XHJcbiAgICAgICAgcGFkZGluZzogNXB4IDAgNXB4IDA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICAgICAgdHJhbnNpdGlvbjogMTUwMG1zO1xyXG4gICAgfVxyXG5cclxuICAgICNxdWV1ZSBsaTpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2VlZTtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyogRm90byAqL1xyXG4gICAgI3F1ZXVlIGxpIGltZyB7XHJcbiAgICAgICAgbWFyZ2luOiAwIDVweCAwIDVweDtcclxuICAgICAgICBtYXgtaGVpZ2h0OiAzMHB4O1xyXG4gICAgICAgIG1heC13aWR0aDogMzBweDtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICB0cmFuc2l0aW9uOiA1MDBtcztcclxuICAgIH1cclxuXHJcbiAgICAvKiBOb21lICovXHJcbiAgICAjcXVldWUgbGkgaDIge1xyXG4gICAgICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMCAxMHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogNTAwbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyogQmlvICovXHJcbiAgICAjcXVldWUgbGkgcCB7XHJcbiAgICAgICAgY29sb3I6IHJnYig3OCwgNzgsIDc4KTtcclxuICAgICAgICBtYXJnaW46IDAgMCAwIDVweDtcclxuICAgICAgICBmb250LXNpemU6IHgtc21hbGw7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogNTAwbXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyogUHJvZmlsZSAqL1xyXG4gICAgI3F1ZXVlIGxpIGEge1xyXG4gICAgICAgIGZsb2F0OiByaWdodDtcclxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgYm90dG9tOiAxMHB4O1xyXG4gICAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgICAgdHJhbnNpdGlvbjogNTAwbXM7XHJcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgICAgICAgcGFkZGluZzogNHB4IDZweCA0cHggNnB4O1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICAgICAgY29sb3I6IHJnYigyOSwgMjksIDI5KTtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA3JTtcclxuICAgICAgICBib3JkZXItc3R5bGU6IG91dHNldDtcclxuICAgICAgICBib3JkZXItY29sb3I6IHdoaXRlO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIH1cclxuXHJcbiAgICAjcXVldWUgLmhpZ2hsaWdodGVkIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xyXG4gICAgfVxyXG5cclxuICAgICNxdWV1ZSAuaGlnaGxpZ2h0ZWQgPiBpbWcge1xyXG4gICAgICAgIG1heC1oZWlnaHQ6IDcwcHg7XHJcbiAgICAgICAgbWF4LXdpZHRoOiA3MHB4O1xyXG4gICAgfVxyXG5cclxuICAgICNxdWV1ZSAuaGlnaGxpZ2h0ZWQgPiBoMiB7XHJcbiAgICAgICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICAgICAgbWFyZ2luOiAwIDAgMCA5MHB4O1xyXG4gICAgfVxyXG5cclxuICAgICNxdWV1ZSAuaGlnaGxpZ2h0ZWQgPiBwIHtcclxuICAgICAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgICAgIG1hcmdpbjogNHB4IDAgMCA5MHB4O1xyXG4gICAgICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICB9XHJcblxyXG4gICAgLyogTWFzdGVyICovXHJcbiAgICAubWFzdGVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYzhkNmYwO1xyXG4gICAgfVxyXG5cclxuICAgIC5tYXN0ZXI6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjOGQ2ZjAgIWltcG9ydGFudDtcclxuICAgIH1cclxufVxyXG5cclxuLyogREVTS1RPUCAqL1xyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA4MDBweCl7XHJcblxyXG4gICAgLyogTGlzdGEgKi9cclxuICAgICNxdWV1ZSB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogNjBweDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBSaWdhICovXHJcbiAgICAjcXVldWUgbGkge1xyXG4gICAgICAgIHBhZGRpbmc6IDIwcHggMCAyMHB4IDA7XHJcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICB9XHJcblxyXG4gICAgI3F1ZXVlIGxpOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjZWVlO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvKiBGb3RvICovXHJcbiAgICAjcXVldWUgbGkgaW1nIHtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICBtYXJnaW46IDAgMTVweCAwIDE1cHg7XHJcbiAgICAgICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgICAgIHdpZHRoOiAxNTBweDtcclxuICAgIH1cclxuXHJcbiAgICAvKiBOb21lKi9cclxuICAgICNxdWV1ZSBsaSBoMiB7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4IDAgMTBweCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIEJpbyAqL1xyXG4gICAgI3F1ZXVlIGxpIHAge1xyXG4gICAgICAgIG1hcmdpbjogMjBweCA3MCUgMCAwO1xyXG4gICAgfVxyXG5cclxuICAgIC5tYXN0ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNjOGQ2ZjA7XHJcbiAgICB9XHJcblxyXG4gICAgLm1hc3Rlcjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2M4ZDZmMCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/components/queue/queue.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/queue/queue.component.ts ***!
  \*****************************************************/
/*! exports provided: QueueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QueueComponent", function() { return QueueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_niccolgur_manager_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/niccolgur-manager.service */ "./src/app/services/niccolgur-manager.service.ts");
/* harmony import */ var _ts_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ts/endpoints */ "./src/app/ts/endpoints.ts");




var QueueComponent = /** @class */ (function () {
    function QueueComponent(niccolgurManager) {
        this.niccolgurManager = niccolgurManager;
        this.elements = [];
        this.images = _ts_endpoints__WEBPACK_IMPORTED_MODULE_3__["images"];
    }
    QueueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.niccolgurManager.getUsers()
            .then(function (users) {
            _this.elements = users;
            _this.master = _this.elements[0];
            _this.selected = _this.elements[0];
        }, function (err) {
            _this.error = err;
        });
    };
    QueueComponent.prototype.getClassList = function (user) {
        var ret = [];
        if (this.master.id === user.id) {
            ret.push('master');
        }
        if (this.selected.id === user.id) {
            ret.push('highlighted');
        } // TODO css opacity 0 ??
        return ret;
    };
    QueueComponent.prototype.userOnClick = function (user) {
        console.log(user);
        this.selected = user;
    };
    QueueComponent.ctorParameters = function () { return [
        { type: _services_niccolgur_manager_service__WEBPACK_IMPORTED_MODULE_2__["NiccolgurManagerService"] }
    ]; };
    QueueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-queue',
            template: __webpack_require__(/*! raw-loader!./queue.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/queue/queue.component.html"),
            styles: [__webpack_require__(/*! ./queue.component.css */ "./src/app/components/queue/queue.component.css")]
        })
    ], QueueComponent);
    return QueueComponent;
}());



/***/ }),

/***/ "./src/app/components/season/season.component.css":
/*!********************************************************!*\
  !*** ./src/app/components/season/season.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvc2Vhc29uL3NlYXNvbi5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/components/season/season.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/components/season/season.component.ts ***!
  \*******************************************************/
/*! exports provided: SeasonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeasonComponent", function() { return SeasonComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SeasonComponent = /** @class */ (function () {
    function SeasonComponent() {
    }
    SeasonComponent.prototype.ngOnInit = function () {
    };
    SeasonComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-season',
            template: __webpack_require__(/*! raw-loader!./season.component.html */ "./node_modules/raw-loader/index.js!./src/app/components/season/season.component.html"),
            styles: [__webpack_require__(/*! ./season.component.css */ "./src/app/components/season/season.component.css")]
        })
    ], SeasonComponent);
    return SeasonComponent;
}());



/***/ }),

/***/ "./src/app/services/niccolgur-manager.service.ts":
/*!*******************************************************!*\
  !*** ./src/app/services/niccolgur-manager.service.ts ***!
  \*******************************************************/
/*! exports provided: NiccolgurManagerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NiccolgurManagerService", function() { return NiccolgurManagerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _niccolgur_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./niccolgur.service */ "./src/app/services/niccolgur.service.ts");



var NiccolgurManagerService = /** @class */ (function () {
    function NiccolgurManagerService(niccolgurService) {
        this.niccolgurService = niccolgurService;
    }
    NiccolgurManagerService.prototype.getUsers = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var queue, users;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.niccolgurService.getQueue().toPromise()];
                    case 1:
                        queue = _a.sent();
                        return [4 /*yield*/, this.niccolgurService.getUsers().toPromise()];
                    case 2:
                        users = _a.sent();
                        return [2 /*return*/, queue.map(function (u) {
                                return users.find(function (el) { return el.id === u; });
                            })];
                }
            });
        });
    };
    NiccolgurManagerService.ctorParameters = function () { return [
        { type: _niccolgur_service__WEBPACK_IMPORTED_MODULE_2__["NiccolgurService"] }
    ]; };
    NiccolgurManagerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], NiccolgurManagerService);
    return NiccolgurManagerService;
}());



/***/ }),

/***/ "./src/app/services/niccolgur.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/niccolgur.service.ts ***!
  \***********************************************/
/*! exports provided: NiccolgurService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NiccolgurService", function() { return NiccolgurService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ts_endpoints__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ts/endpoints */ "./src/app/ts/endpoints.ts");




var NiccolgurService = /** @class */ (function () {
    function NiccolgurService(http) {
        this.http = http;
    }
    NiccolgurService.prototype.getQueue = function () {
        // const params = new HttpParams().set('api_key', NiccolgurService.apiKey);
        return this.http.get(_ts_endpoints__WEBPACK_IMPORTED_MODULE_3__["queue"]);
    };
    NiccolgurService.prototype.getUsers = function () {
        return this.http.get(_ts_endpoints__WEBPACK_IMPORTED_MODULE_3__["users"]);
    };
    NiccolgurService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    NiccolgurService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], NiccolgurService);
    return NiccolgurService;
}());



/***/ }),

/***/ "./src/app/ts/domain.ts":
/*!******************************!*\
  !*** ./src/app/ts/domain.ts ***!
  \******************************/
/*! exports provided: TypeObject, User */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TypeObject", function() { return TypeObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
var TypeObject = /** @class */ (function () {
    function TypeObject(id, desc, data) {
        this.id = id;
        this.desc = desc;
        this.data = data;
    }
    TypeObject.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: String }
    ]; };
    return TypeObject;
}());

var User = /** @class */ (function () {
    function User(id, nickname, img, bio) {
        this.id = id;
        this.nickname = nickname;
        this.img = img;
        this.bio = bio;
    }
    User.ctorParameters = function () { return [
        { type: String },
        { type: String },
        { type: String },
        { type: String }
    ]; };
    return User;
}());



/***/ }),

/***/ "./src/app/ts/endpoints.ts":
/*!*********************************!*\
  !*** ./src/app/ts/endpoints.ts ***!
  \*********************************/
/*! exports provided: apiKey, queue, users, season, images */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiKey", function() { return apiKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queue", function() { return queue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "users", function() { return users; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "season", function() { return season; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "images", function() { return images; });
var apiKey = '8dd0d0ce432b75b532e9fb563fa8fded';
var queue = 'https://guglielmofelici.github.io/niccolgur/data/queue.json';
var users = 'https://guglielmofelici.github.io/niccolgur/data/users.json';
var season = 'https://guglielmofelici.github.io/niccolgur/data/season.json';
var images = 'https://guglielmofelici.github.io/niccolgur/data/images/';


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\Guglielmo\niccolgur-web\fe-ng\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map