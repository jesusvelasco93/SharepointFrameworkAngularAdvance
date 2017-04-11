import {
  BaseClientSideWebPart,
  IPropertyPaneTextFieldProps,
} from '@microsoft/sp-webpart-base';

import * as angular from 'angular';

export default class HomeController implements IPropertyPaneTextFieldProps{
    private static $inject: string[] = ['$scope', '$compile', '$http'];
    private fieldHome: string;
    private url: string;
    private properties: IPropertyPaneTextFieldProps;

    constructor(private $scope: angular.IScope, private $compile: angular.ICompile, private $http: angular.IHttpService) {
        this.init();
    }

    private init(): void {
        let self = this;
        let activeRequest = false;

        this.fieldHome = "Initial value";
        this.render();

        this.$scope.prueba = function(){
            activeRequest = true;

           self.$http({
                method: 'GET',
                url: self.url
                }).then(function successCallback(response) {
                    console.log("OK", response);
                    self.$scope.$broadcast("loadUser", {message: "mensaje", user:response.data.AccountName});
                    activeRequest = false;
                    // response.d.AccountName;
                }, function errorCallback(response) {
                    activeRequest = false;
                    console.error('error', response);
                });
        };
        this.$scope.$watch('general.fieldHome', function(newValue, oldValue){
            if (!(oldValue === "Initial value" && newValue === "Initial value")){
                self.$scope.$broadcast("change", {message: "mensaje", user:newValue});
                // self.$scope.$emit("Emit", "mensaje" + newValue);
                //console.log("Cambio", newValue, oldValue);
            }
        });
    }

    private render(): void {
        let element = document.getElementById("prueba");
        element.innerHTML = `<input ng-model="general.fieldHome">{{general.fieldHome}}
                             <button type="button" ng-click="prueba()">Prueba</button>
                                <div ng-controller="OtherController as ojther">
                                    <div id="other"></div>
                                </div>`;
        this.$compile(element)(this.$scope);
    }
}