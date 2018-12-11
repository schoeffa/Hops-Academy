"use strict";
const stats = {
    templateUrl: "app/game/stats/stats.html",
    bindings: {user: "<", roundNum: "<", timeLeft: "<"},
    controller: ["TriviaService", function(TriviaService) {
        const vm = this;
    }]
}

angular 
    .module("HopsAcademy")
    .component("stats", stats);