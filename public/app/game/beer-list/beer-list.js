"use strict";
const beerList = {
    templateUrl: "app/game/beer-list/beer-list.html",
    controller: ["TriviaService", function(TriviaService) {
        const vm= this;
        TriviaService.getBeer().then((result) => {
            vm.currentBeers = result;
        });
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);