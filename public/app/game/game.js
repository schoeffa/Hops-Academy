"use strict";
const game = {
    template: `<section class="game-wrapper"><stats></stats><section class="right-pane"><beer-list></beer-list><trivia></trivia></section></section>`,
    controller: [function() {
        const vm = this;
    }]
};

angular
    .module("HopsAcademy")
    .component("game", game);