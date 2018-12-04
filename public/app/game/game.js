"use strict";
const game = {
    template: `<section class="game-wrapper"><stats user="$ctrl.user"></stats><section class="right-pane"><beer-list></beer-list><trivia></trivia></section></section>`,
    controller: ["TriviaService", function(TriviaService) {
        const vm = this;
        vm.user = TriviaService.getUser();
    }]
};

angular
    .module("HopsAcademy")
    .component("game", game);