import * as angular from 'angular';

export default class OtherController{
    private usuarioLog: string;

    constructor(private $scope: angular.IScope, private $compile: angular.ICompile) {
        this.init();
        this.render();
        this.putListener();
    }
// ||'..user..'
    private init(): void {
        this.usuarioLog = "user";
    }
    public render(): void {
        var element = document.getElementById("other");
        element.innerHTML =`<p class="cursive">{{other.usuarioLog}}</p>
                            <div>otro</div>`;
        this.$compile(element)(this.$scope);
        console.log("userLog", this.usuarioLog);
    }
    public putListener(): void {
        let self=this;
        this.$scope.$on("loadUser", function(event, message) {
            self.usuarioLog = message.user;
            console.log(self.usuarioLog);
            // self.$scope.$digest();
        });
        this.$scope.$on("change", function(event, message) {
            console.log("Ha llegado ", message);
        });
    } 
}