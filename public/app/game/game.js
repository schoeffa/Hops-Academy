"use strict";
const game = {
    template: `<section class="game-wrapper">
    <stats time-left="$ctrl.timeLeft" user="$ctrl.user" round-num="$ctrl.roundNum"></stats>
    <section class="right-pane">
    <beer-list timer-id="$ctrl.timerId" countdown="$ctrl.countdown()" round-num="$ctrl.roundNum" show-correct="$ctrl.showCorrect" show-mobile-pick="$ctrl.showMobilePick" ng-show="$ctrl.showMobilePick" show-pick="$ctrl.showPick" current-beers="$ctrl.currentBeers"></beer-list>
    <trivia timer-id="$ctrl.timerId" id="trivia-window" round-num="$ctrl.roundNum" show-time="$ctrl.showTime" show-pick="$ctrl.showPick" evaluate="$ctrl.evaluate()" show-correct="$ctrl.showCorrect" show-wrong="$ctrl.showWrong" new-round="$ctrl.newRound()" current-question="$ctrl.currentQuestion"></trivia>
    </section>
    </section>`,
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;
        vm.user = TriviaService.getUser();
        vm.roundNum = 1;
        vm.showCorrect = false;
        vm.showWrong = false;
        vm.showTime = false;
        vm.showPick = true;
        vm.showMobilePick = true;
        vm.timeLeft = 15;
        vm.timerId;

        vm.countdown = () => {
            if (vm.timeLeft === -1) {
                vm.showTime = true;
                clearTimeout(vm.timerId);
                document.getElementById("timeOverlay").style.display = "flex";
            } else {
                document.getElementById("time").innerText = vm.timeLeft;
                vm.timeLeft--;
            }
        };

        vm.newRound = () => {
            vm.roundNum++;
            document.querySelector(".timer").style.zIndex =  "0";
            vm.timeLeft = 15;
            document.getElementById("time").innerText = vm.timeLeft;
            vm.search();
            vm.beers();
            vm.showCorrect = false;
            vm.showMobilePick = true;
            vm.showTime = false;
            TriviaService.addAnimation(vm.roundNum, vm.user.drunkenness, vm.currentQuestion);
            TriviaService.removeAnimation(vm.roundNum);
        }

        vm.search = () => {
            TriviaService.getTrivia(vm.user.difficulty).then((result) => {
                vm.currentQuestion = result;
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