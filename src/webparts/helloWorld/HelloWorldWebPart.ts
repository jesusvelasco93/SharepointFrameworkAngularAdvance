import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import { SPComponentLoader } from '@microsoft/sp-loader';

import * as angular from 'angular';
import './Angular/app';

export default class HelloWorldWebPart extends BaseClientSideWebPart<{url}>{
  private scope;

  constructor(){
    super();
    SPComponentLoader.loadCss('https://localhost:4321/src/webparts/helloWorld/CSS/style.css');
    //SPComponentLoader.loadScript('https://code.jquery.com/jquery-3.2.1.min.js');
  }

  public render(): void {
      let self = this;

      if (this.renderedOnce === false) {
        this.domElement.innerHTML = `<div ng-app="App">APP
                                      <div ng-controller="HomeController as general">
                                        <p class="cursive">{{general.url}}</p>
                                        <div id="prueba"></div>
                                      </div>
                                    </div>`;
      }
      angular.element(function () {
        self.scope = angular.element(document.querySelector('div[ng-controller="HomeController as general"]')).scope();
        self.changeProperty("url", self.properties.url);
      });
  };
  
  protected onPropertyPaneFieldChanged(fieldValue, oldValue, newValue): void{
    if (fieldValue === "url") {
      this.changeProperty("url", newValue);
    }      
  };

  private changeProperty(field, value){
      this.scope.general[field] = value;
      this.scope.$apply();
  };

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Esta es la descipción del webpart"
          },
          groups: [
            {
              groupName: "Configuración de la petición",
              groupFields: [
                PropertyPaneTextField('url', {
                  label: "Url de la consulta"
                }),
                PropertyPaneTextField('Usuario', {
                  label: "Nombre del usuario a consultar"
                })
              ]
            }
          ]
        }
      ]
    };
  };
}
