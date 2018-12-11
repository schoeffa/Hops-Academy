"use strict";
const beerList = {
    templateUrl: "app/game/beer-list/beer-list.html",

    bindings: { currentBeers: "<", showPick: "=" , showCorrect: "=", showMobilePick: "=", roundNum: "<", timerId: "=", countdown: "&"},
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;
        // Functionality that runs upon selection off beer from provided options
        vm.beerSelect = (selectedBeer) => {
            // Updates the users drunkenness based on abv of selected beer
            TriviaService.updateDrunkenness(selectedBeer.abv);
            // Resets array of displayed beers to only contain the selected option
            for (let i = 0; i <= 2; i++) {
                if (vm.currentBeers[i].id === selectedBeer.id) {
                    vm.currentBeers = vm.currentBeers.slice(i, i + 1);
                    break;
                }
            }
            // Hides corresponding overlays to effectively start trivia round
            vm.showCorrect = false;
            vm.showPick = false;
            // Starts the timer for current round
            vm.timerId = setInterval(vm.countdown, 1000);
            // Changes z-index of timer element so that it is not hidden behind the beer list component
            document.querySelector(".timer").style.zIndex =  "99";
            // Sets up html elements for round 5 animation
            if (vm.roundNum === 5) {
                TriviaService.setUpCharacters();
            }
            // Redisplays beer selection screen when on mobile 
            if (window.matchMedia("(max-width: 600px)").matches) {
                vm.showMobilePick = false;
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);