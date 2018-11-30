"use strict";
const trivia = {
    templateUrl: "trivia.html",
    controller: [function() {
        const vm = this;
    }]
}

angular
    .module("HopsAcademy")
    .component("trivia", trivia)