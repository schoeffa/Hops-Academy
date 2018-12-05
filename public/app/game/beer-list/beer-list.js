"use strict";
const beerList = {
    templateUrl: "app/game/beer-list/beer-list.html",

    bindings: { currentBeers: "<", showPick: "=" , showCorrect: "=", showMobilePick: "="},
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;

        vm.beerSelect = (selectedBeer) => {
            TriviaService.updateDrunkenness(selectedBeer.abv);
            for (let i = 0; i <= 2; i++) {

                if (vm.currentBeers[i].id === selectedBeer.id) {
                    vm.currentBeers = vm.currentBeers.slice(i, i + 1);
                    break;
                }
            }

            vm.showCorrect = false;
            vm.showPick = false
            if (window.matchMedia("(max-width: 600px)").matches) {
                vm.showMobilePick = false;
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);