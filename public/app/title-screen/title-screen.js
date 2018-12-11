"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: ["$location", "TriviaService", function ($location, TriviaService) {
        const vm = this;
        vm.charArray = ["images/girl.png", "images/guy.png", "images/character3.png"];
        vm.charArray = TriviaService.shuffle(vm.charArray);
        vm.showInstructions = false;

        // Sets the selected character as current user and redirects to the game component
        vm.startGame = (intelligence, tolerance) => {
            TriviaService.setUser(intelligence, tolerance);
            $location.path("/game")
        }

        // Toggles display of instruction overlay
        vm.onShow = () => {
            vm.showInstructions = !vm.showInstructions;
        }

        // Makes call to BreweryDB API and populates beer array in TriviaService
        TriviaService.loadBeer()
    }]
}

angular
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);