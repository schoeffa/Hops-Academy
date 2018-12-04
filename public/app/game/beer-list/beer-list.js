"use strict";
const beerList = {
    templateUrl: "app/game/beer-list/beer-list.html",
    bindings: {currentBeers: "<"},
    controller: ["TriviaService", function(TriviaService) {
        const vm= this;

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