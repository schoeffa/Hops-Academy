"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: ["$location", function($location) {
        const vm = this;
        vm.startGame = () => {
            $location.path("/beerList")
        }
    }]
}

angular 
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);