"use strict";

function TriviaService($http) {
    const self = this;
    self.setUser = (intelligence, tolerance) => {
        self.user = {
            intelligence: intelligence,
            tolerance: tolerance,
            drunkenness: 0
        }
        console.log(self.user);
    }

    self.updateDrunkenness = (abv) => {
        self.user.drunkenness = self.user.drunkenness + Math.round((Number(abv)/Number(self.user.tolerance)) +1);
    }

    self.getUser= () => {
        return self.user;
    }

    self.getBeer = () => {
        return $http({
            url: "/beer",
            method: "GET"
        }).then((result) => {
            self.beerList = result.data.data;
            self.firstIndex = Math.floor(Math.random() * 50);
            self.secondIndex = Math.floor(Math.random() * 50);
            self.thirdIndex = Math.floor(Math.random() * 50);
            return [self.beerList[self.firstIndex], self.beerList[self.secondIndex], self.beerList[self.thirdIndex]];
        });
    }


    // First question//
    self.getTrivia = (difficulty) => {
        self.category = [9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
        self.random = self.category[Math.floor(Math.random() * self.category.length)];
        console.log(self.random);
        return $http({
            method: "GET",
            url: `https://opentdb.com/api.php?amount=1&category=${self.random}&difficulty=${difficulty}&type=multiple`
        }).then((result) => {
            self.trivia = result.data.results["0"];
            self.question = {
                question: self.trivia.question.replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'"),
                answers: [
                    {

                        answer: self.trivia.incorrect_answers[0].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'"), 
                        eval: false
                    },
                    {
                        answer: self.trivia.incorrect_answers[1].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'"), 
                        eval: false
                    },
                    {
                        answer: self.trivia.incorrect_answers[2].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'"),
                        eval: false
                    },
                    {
                        answer: self.trivia.correct_answer.replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'"),
                        eval: true
                    }
                ]
            }
            // self.cleanQuestion = self.question.question
            self.shuffleAnswers = () => {
                for (let i = self.question.answers.length - 1; i >= 0; i--) {

                    let randomIndex = Math.floor(Math.random() * (i + 1));
                    let itemAtIndex = self.question.answers[randomIndex];

                    self.question.answers[randomIndex] = self.question.answers[i];
                    self.question.answers[i] = itemAtIndex;
                }
                return self.question.answers;
            }
            self.shuffleAnswers();
            
            return self.question
        })
    }

}
angular
    .module("HopsAcademy")
    .service("TriviaService", TriviaService)