"use strict";
const game = {
    template: `<section class="game-wrapper">
    <stats user="$ctrl.user" round-num="$ctrl.roundNum"></stats>
    <section class="right-pane">
    <beer-list show-pick="$ctrl.showPick" current-beers="$ctrl.currentBeers"></beer-list>
    <trivia round-num="$ctrl.roundNum" show-pick="$ctrl.showPick" evaluate="$ctrl.evaluate()" show-correct="$ctrl.showCorrect" show-wrong="$ctrl.showWrong" new-round="$ctrl.newRound()" current-question="$ctrl.currentQuestion"></trivia>
    </section>
    </section>`,
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;
        vm.user = TriviaService.getUser();
        vm.roundNum = 1;
        vm.showCorrect = false;
        vm.showWrong = false;
        vm.showPick = true;

        vm.newRound = () => {
            vm.roundNum++;
            vm.search();
            vm.beers();
            vm.showCorrect = false;
            vm.showPick = true;
        }

        vm.search = () => {
            TriviaService.getTrivia(vm.user.difficulty).then((result) => {
                vm.currentQuestion = result;
                console.log(vm.currentQuestion);

            })
        }

        vm.beers = () => {
            TriviaService.getBeer().then((result) => {
                for (let entry of result) {
                    if (!entry.abv) {
                        entry.abv = 4.5;
                    }
                }
                vm.currentBeers = result;
            });
        }



        vm.beers();
        vm.search();
    }]
};

angular
    .module("HopsAcademy")
    .component("game", game);