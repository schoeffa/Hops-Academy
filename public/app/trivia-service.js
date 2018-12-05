"use strict";

function TriviaService($http, $location) {
    const self = this;
    
    self.setUser = (intelligence, tolerance) => {
        self.user = {
            intelligence: intelligence,
            tolerance: tolerance,
            drunkenness: 0,
            difficulty: "easy"
        }
        console.log(self.user);
    }
    self.newGame =() => {
        $location.path('/titleScreen');
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
            self.shuffleBeers = () => {
                for (let i = self.beerList.length - 1; i >= 0; i--) {

                    let randomIndex = Math.floor(Math.random() * (i + 1));
                    let itemAtIndex = self.beerList[randomIndex];

                    self.beerList[randomIndex] = self.beerList[i];
                    self.beerList[i] = itemAtIndex;
                }
                return self.beerList;
            }
            self.shuffleBeers();
            return [self.beerList[0], self.beerList[1], self.beerList[2]];
        });
    }
    // First question//
    self.getTrivia = (difficulty) => {
        return $http({
            method: "GET",
            url: `https://opentdb.com/api.php?amount=1&difficulty=${difficulty}&type=multiple`
        }).then((result) => {
            self.trivia = result.data.results["0"];
            self.fix = () => {
                replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö")
            }
            self.question = {
                question: self.trivia.question.replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö").replace(/&rsquo;/g, "\'").replace(/&shy;/g, "\-"),
                answers: [
                    {

                        answer: self.trivia.incorrect_answers[0].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö").replace(/&rsquo;/g, "\'").replace(/&shy;/g, "\-"), 
                        eval: false
                    },
                    {
                        answer: self.trivia.incorrect_answers[1].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö").replace(/&rsquo;/g, "\'").replace(/&shy;/g, "\-"), 
                        eval: false
                    },
                    {
                        answer: self.trivia.incorrect_answers[2].replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö").replace(/&rsquo;/g, "\'").replace(/&shy;/g, "\-"),
                        eval: false
                    },
                    {
                        answer: self.trivia.correct_answer.replace(/&quot;/g, "\"").replace(/&Delta;/g, "\∆").replace(/&amp;/g, "\&").replace(/&#039;/g, "\'").replace(/&eacute;/g, "\é").replace(/&Uuml;/g, "\ö").replace(/&rsquo;/g, "\'").replace(/&shy;/g, "\-"),
                        eval: true
                    }
                ]
            }
            self.shuffleAnswers = () => {
                for (let i = self.question.answers.length - 1; i >= 0; i--) {

                    let randomIndex = Math.floor(Math.random() * (i + 1));
                    let itemAtIndex = self.question.answers[randomIndex];

                    self.question.answers[randomIndex] = self.question.answers[i];
                    self.question.answers[i] = itemAtIndex;
                }
                return self.question.answers;
            }
            // self.cleanQuestion = self.question.question
            self.shuffleAnswers()
            return self.question
        })
    }

    self.nextRound = () => {
        
    }

}
angular
    .module("HopsAcademy")
    .service("TriviaService", TriviaService)