"use strict";
const beerList = {
    templateUrl: "beer-list.html",
    controller: [function() {
        const vm= this;
    }]
}

angular
    .module("HopsAcademy")
    .component("beerList", beerList);