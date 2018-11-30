"use strict";
function TriviaService($http) {
   const self = this;

   // First question//


   self.getTrivia = (difficulty) => {
           return $http({
               method: "GET",
               url: `https://opentdb.com/api.php?amount=10&catagory=9-12&${difficulty}=easy&type=multiple`
           })
       }
   }
   


angular
   .module("HopsAcademy")
   .service("TriviaService", TriviaService)