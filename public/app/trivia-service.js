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
    }

    self.newGame = () => {
        $location.path('/titleScreen');
    }
    self.updateDrunkenness = (abv) => {
        self.user.drunkenness = self.user.drunkenness + Math.round((Number(abv) / Number(self.user.tolerance)) + 1);
    }

    self.getUser = () => {
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
    self.categoryList = [12, 14, 16, 21, 23, 25, 27]
    self.category = self.categoryList[Math.floor(Math.random() * self.categoryList.length)]
    // First question//
    self.getTrivia = (difficulty) => {
        return $http({
            method: "GET",
            url: `https://opentdb.com/api.php?amount=1&category=${self.category}&difficulty=${difficulty}&type=multiple`
        }).then((result) => {
            self.trivia = result.data.results["0"];
            self.fix = (string) => {
                return string.replace(/&quot;/g, "\"")
                    .replace(/&Delta;/g, "\∆")
                    .replace(/&amp;/g, "\&")
                    .replace(/&#039;/g, "\'")
                    .replace(/&eacute;/g, "\é")
                    .replace(/&rsquo;/g, "\'")
                    .replace(/&shy;/g, "\-")
                    .replace(/&Uuml;/g, "\Ü")
                    .replace(/&ouml;/g, "\ö")
                    .replace(/&ntilde;/g, "\ñ")
                    .replace(/&aacute;/g, "\á");
            }
            self.question = {
                question: self.fix(self.trivia.question),
                answers: [{

                        answer: self.fix(self.trivia.incorrect_answers[0]),
                        eval: false
                    },
                    {
                        answer: self.fix(self.trivia.incorrect_answers[1]),
                        eval: false
                    },
                    {
                        answer: self.fix(self.trivia.incorrect_answers[2]),
                        eval: false
                    },
                    {
                        answer: self.fix(self.trivia.correct_answer),
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
            self.shuffleAnswers();
            return self.question
        })
    }

    self.findKeyframesRule = (rule) => {
        var ss = document.styleSheets;
        console.log(ss);
        for (let j = 0; j < ss[3].cssRules.length; j++) {
            if (ss[3].cssRules[j].name == rule) {
                return ss[3].cssRules[j];
            }
        }
    }

    self.removeAnimation = (round) => {
        switch (round) {
            case 3:
                document.querySelectorAll(".question")[0].classList.remove('round2');
                document.querySelectorAll(".answers")[0].classList.remove('round2');
            case 5:
                document.querySelectorAll(".question")[0].classList.remove('round4');
                document.querySelectorAll(".answers")[0].classList.remove('round4');
        }
    }

    self.addAnimation = (round, drunkenness) => {
        switch (round) {
            case 2:
                document.querySelectorAll(".question")[0].classList.add('round2');
                document.querySelectorAll(".answers")[0].classList.add('round2');
                let textShadow = '';
                for (let i = 1; i <= drunkenness; i++) {
                    if (i % 2 === 0) {
                        textShadow += `-${3 * i}px -${3*i}px ${i}px rgba(0, 0, 0, ${(1- (1/i))}),`;
                    } else {
                        textShadow += `${3*i}px ${3*i}px ${i}px rgba(0, 0, 0, ${(1-(1/i))}),`;
                    }
                }
                textShadow = textShadow.substring(0, textShadow.length - 1);
                let xvision = self.findKeyframesRule("xvision");
                xvision.appendRule('0% {text-shadow: 0px 0px 0px rgba(0,0,0, 1);}');
                xvision.appendRule(`100% {text-shadow: ${textShadow};}`);
                break;
            case 4:
                document.querySelectorAll(".question")[0].classList.add('round4');
                document.querySelectorAll(".answers")[0].classList.add('round4');
                let focus = self.findKeyframesRule("focus");
                focus.appendRule(`100% {filter: blur(${2.5 * drunkenness}px);}`);
                break;
        }
    }

}
angular
    .module("HopsAcademy")
    .service("TriviaService", TriviaService)