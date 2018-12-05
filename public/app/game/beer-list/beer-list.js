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
            console.log(window.matchMedia("(max-width: 600px)"));
            if (window.matchMedia("(max-width: 600px)").matches) {
                vm.showMobilePick = false;
                console.log(vm.showMobilePick);
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);