"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: ["$location", "TriviaService", function ($location, TriviaService) {
        const vm = this;
        vm.charArray = ["images/girl.png", "images/guy.png", "images/character3.png"];
        vm.charArray = TriviaService.shuffle(vm.charArray);
        console.log(vm.charArray);
        vm.startGame = (intelligence, tolerance) => {
            TriviaService.setUser(intelligence, tolerance);
            $location.path("/game")
        }
        vm.showInstructions = false;

        vm.onShow = () => {
            if (vm.showInstructions === false) {
                vm.showInstructions = true;
            } else {
                vm.showInstructions = false;
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);