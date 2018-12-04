"use strict";
const beerList = {
    templateUrl: "app/game/beer-list/beer-list.html",
    controller: ["TriviaService", function(TriviaService) {
        const vm= this;
        TriviaService.getBeer().then((result) => {
            for (let entry of result) {
                if (!entry.abv) {
                    entry.abv = 4.5;
                }
            }
            vm.currentBeers = result;
        });
        vm.beerSelect = (selectedBeer) => {
            TriviaService.updateDrunkenness(selectedBeer.abv);
            for (let i=0; i <=2; i++) {
                
                if (vm.currentBeers[i].id === selectedBeer.id) {
                    vm.currentBeers = vm.currentBeers.slice(i, i+1);
                    break;
                }
            }
        }
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);