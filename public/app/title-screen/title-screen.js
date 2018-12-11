"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: ["$location", "TriviaService", function ($location, TriviaService) {
        const vm = this;
        vm.charArray = ["images/girl.png", "images/guy.png", "images/character3.png"];
        vm.charArray = TriviaService.shuffle(vm.charArray);
        vm.showInstructions = false;

        vm.startGame = (intelligence, tolerance) => {
            TriviaService.setUser(intelligence, tolerance);
            $location.path("/game")
        }

        vm.onShow = () => {
            if (vm.showInstructions === false) {
                vm.showInstructions = true;
            } else {
                vm.showInstructions = false;
            }
        }

        vm.beers = () => {
            TriviaService.loadBeer()
            // for (let entry of result) {
            //     if (!entry.abv) {
            //         entry.abv = 4.5;
            //     }
            // }
            // vm.currentBeers = result;
        };


        vm.beers();
    }]
}

angular
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);