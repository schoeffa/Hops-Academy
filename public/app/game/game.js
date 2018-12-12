"use strict";
const game = {
    template: `<section class="game-wrapper">
    <stats time-left="$ctrl.timeLeft" user="$ctrl.user" round-num="$ctrl.roundNum"></stats>
    <section class="right-pane">
    <beer-list water-inventory="$ctrl.waterInventory" timer-id="$ctrl.timerId" countdown="$ctrl.countdown()" round-num="$ctrl.roundNum" show-correct="$ctrl.showCorrect" show-mobile-pick="$ctrl.showMobilePick" ng-show="$ctrl.showMobilePick" show-pick="$ctrl.showPick" current-beers="$ctrl.currentBeers"></beer-list>
    <trivia timer-id="$ctrl.timerId" id="trivia-window" round-num="$ctrl.roundNum" show-pick="$ctrl.showPick" evaluate="$ctrl.evaluate()" show-correct="$ctrl.showCorrect" show-wrong="$ctrl.showWrong" new-round="$ctrl.newRound()" current-question="$ctrl.currentQuestion"></trivia>
    </section>
    </section>`,
    controller: ["TriviaService", function (TriviaService) {
        const vm = this;
        vm.user = TriviaService.getUser();
        vm.roundNum = 1;
        vm.showCorrect = false;
        vm.showWrong = false;
        vm.showPick = true;
        vm.showMobilePick = true;
        vm.timeLeft = 15;
        vm.timerId;
        vm.waterInventory = 1;
        // Gets 3 random beers from TriviaService
        vm.currentBeers = TriviaService.getBeer();
        vm.currentBeers.push({
            name: "Water",
            abv: `${-6 * vm.user.tolerance}`,
            image: "images/bottled-water.png",
            style: {category: {name: "Cool, refreshing H2O"}}
        })
        // Function called to run Timer. Displays "Out of Time" overlay when time runs out.
        vm.countdown = () => {
            if (vm.timeLeft === -1) {
                clearTimeout(vm.timerId);
                document.getElementById("timeOverlay").style.display = "flex";
            } else {
                document.getElementById("time").innerText = vm.timeLeft;
                vm.timeLeft--;
            }
        };
        // Initializes beginning round state for all variables i.e. hides and showes appropriate overlays, resets timer, gets 3 new beers, adds animations according to round
        vm.newRound = () => {
            vm.roundNum++;
            document.querySelector(".timer").style.zIndex =  "0";
            vm.timeLeft = 15;
            document.getElementById("time").innerText = vm.timeLeft;
            vm.search();
            vm.currentBeers = TriviaService.getBeer();
            if (vm.waterInventory > 0) {
                vm.currentBeers.push({
                    name: "Water",
                    abv: `${-6 * vm.user.tolerance}`,
                    image: "images/bottled-water.png",
                    style: {category: {name: "Cool, refreshing H2O"}}
                });
            }
            vm.showCorrect = false;
            vm.showMobilePick = true;
            vm.showTime = false;
            TriviaService.removeAnimation(vm.roundNum);
        }
        // Function to get current question from Trivia Service
        vm.search = () => {
            TriviaService.getTrivia(vm.user.difficulty).then((result) => {
                vm.currentQuestion = result;
            })
        }
        // Initial call to search function to serve up first round question
        vm.search();
    }]
};

angular
    .module("HopsAcademy")
    .component("game", game);