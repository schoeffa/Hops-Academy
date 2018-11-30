"use strict";
const trivia = {
   templateUrl: "/app/game/trivia/trivia.html",
   controller: ["TriviaService", function (TriviaService) {
       const vm = this;

       vm.user = {
           difficulty: "easy"
       }

       vm.search = () => {
           TriviaService.getTrivia(vm.user.difficulty).then((response) => {
               console.log(response);
               vm.listOfQuestions= response.data.results["0"];
               console.log(vm.listOfQuestions)
           })
       }


   }]
}

angular
   .module("HopsAcademy")
   .component("trivia", trivia)
