"use strict";
const stats = {
    templateUrl: "app/game/stats/stats.html",
    controller: ["TriviaService", function(TriviaService) {
        const vm = this;
        vm.user = TriviaService.getUser();
        
    }]
}

angular 
    .module("HopsAcademy")
    .component("stats", stats);