import * as angular from 'angular';  
import HomeController from './HomeController';
import OtherController from './OtherController';  

const App = angular.module('App', []);

// todoapp.config(["$rootscope", function ($rootscope: angular.IRootScope) {
//  more code
// }]);


App.controller('HomeController', HomeController);
App.controller('OtherController', OtherController);