angular
    .module("HopsAcademy", ["ngRoute"])
    .config(["$routeProvider", ($routeProvider) => {
        $routeProvider 
            .when("/titleScreen", {
                template: "<title-screen></title-screen"
            })
            .when("/games", {
                template: "<game></game>"
            })
            .when("/beerList", {
                template: "<beer-list></beer-list>"
            })
            .when("/", {
                template: "<title-screen></title-screen>"
            })
    }])
