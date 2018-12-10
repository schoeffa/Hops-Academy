"use strict";

function TriviaService($http, $location) {
    const self = this;

    self.setUser = (difficulty, tolerance) => {
        self.user = {
            difficulty: difficulty,
            tolerance: tolerance,
            drunkenness: 0
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

    self.shuffle = (array) => {
        for (let i = array.length - 1; i >= 0; i--) {

            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = array[randomIndex];

            array[randomIndex] = array[i];
            array[i] = itemAtIndex;
        }
        return array;
    }

    self.getBeer = () => {
        return $http({
            url: "/beer",
            method: "GET"
        }).then((result) => {
            self.beerList = result.data.data;
            self.beerList = self.shuffle(self.beerList);
            return [self.beerList[0], self.beerList[1], self.beerList[2]];
        });
    }
    // First question//
    self.getTrivia = (difficulty) => {
        self.categoryList = [12, 14, 16, 21, 23, 25, 27];
        self.category = self.categoryList[Math.floor(Math.random() * self.categoryList.length)];
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
                    .replace(/&aacute;/g, "\á")
                    .replace(/&Ocirc;/g, "\Ô")
                    .replace(/&uacute;/g, "\ú")
                    .replace(/&egrave;/g, "\è")
                    .replace(/&szlig;/g, "\ß")
                    .replace(/&ecirc;/g, "\ê");

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
            self.question.answers = self.shuffle(self.question.answers);
            return self.question
        })
    }
    self.findCorrect = () => {
        console.log("I'm in the service")
        console.log(self.questions)
        // for (let i = 0; i <= self.question.answers.length; i++){
        //     if(self.question.answers.answer.eval[i] === true) {
        //         console.log(self.question.answers)
            // }
        }
    
    self.findKeyframesRule = (rule) => {
        var ss = document.styleSheets;
        for (let j = 0; j < ss[4].cssRules.length; j++) {
            if (ss[4].cssRules[j].name == rule) {
                return ss[4].cssRules[j];
            }
        }
    }

    self.removeAnimation = (round) => {
        switch (round) {
            case 3:
                document.querySelectorAll(".question")[0].classList.remove('round2');
                document.querySelectorAll(".answers")[0].classList.remove('round2');
                break;
            case 4:
                document.getElementById("distraction-pic").style.display = "none";
                break;
            case 5:
                document.querySelectorAll(".question")[0].classList.remove('round4');
                document.querySelectorAll(".answers")[0].classList.remove('round4');
                break;
        }
    }

    self.setUpCharacters = () => {
        let question = document.querySelectorAll(".question");
        console.log(question);
        for (let sentence of question) {
            let newContent = '';
            for (let i = 0; i < sentence.textContent.length; i++) {
                let substring = sentence.textContent.substr(i, 1);
                if (substring != " ") {
                    if (i % 2 === 0) {
                        newContent += '<span class="rotate">' + substring + '</span>';
                    } else {
                        newContent += '<span class="rotateccw">' + substring + '</span>';
                    }
                } else {
                    newContent += substring;
                }
            }
            sentence.innerHTML = newContent;
        }
        let answers = document.querySelectorAll(".answer");
        console.log(answers);
        for (let answer of answers) {
            let newContent = '';
            for (let i = 0; i < answer.textContent.length; i++) {
                let substring = answer.textContent.substr(i, 1);
                if (substring != " ") {
                    if (i % 2 === 0) {
                        newContent += '<span class="rotate">' + substring + '</span>';
                    } else {
                        newContent += '<span class="rotateccw">' + substring + '</span>';
                    }
                } else {
                    newContent += substring;
                }
            }
            answer.innerHTML = newContent;
        }
    }

    self.addAnimation = (round, drunkenness, question) => {
        // console.log(question);
        switch (round) {
            case 2:
                document.querySelectorAll(".question")[0].classList.add('round2');
                document.querySelectorAll(".answers")[0].classList.add('round2');
                let textShadow = '';
                for (let i = 1; i <= drunkenness; i++) {
                    if (i % 2 === 0) {
                        textShadow += `-${2.5 * i}px -${2.5 * i}px ${i}px rgba(0, 0, 0, ${(1-(1/i))/2}),`;
                    } else {
                        textShadow += `${2.5 * i}px ${2.5 * i}px ${i}px rgba(0, 0, 0, ${(1-(1/i))/2}),`;
                    }
                }
                textShadow = textShadow.substring(0, textShadow.length - 1);
                let xvision = self.findKeyframesRule("xvision");
                xvision.appendRule('0% {text-shadow: 0px 0px 0px rgba(0,0,0, 1);}');
                xvision.appendRule(`100% {text-shadow: ${textShadow};}`);
                break;
            case 3:
                let distract = self.findKeyframesRule("distract");
                document.getElementById("distraction-pic").style.display = "inline-block";
                document.getElementById("distraction-pic").style.animation = `distract 5s linear 1s infinite alternate`;
                distract.appendRule(`${100-(3 * drunkenness)}% {opacity: 1; z-index: 100;}`);
                distract.appendRule(`100% {opacity: 1; z-index: 100;}`);
                break;
            case 4:
                document.querySelectorAll(".question")[0].classList.add('round4');
                document.querySelectorAll(".answers")[0].classList.add('round4');
                let focus = self.findKeyframesRule("focus");
                focus.appendRule(`100% {filter: blur(${1.5 * drunkenness}px);}`);
                break;
            case 5:
                self.setUpCharacters();
                let rot = self.findKeyframesRule("rot");
                rot.appendRule(`from { transform: rotate(0deg) translate(-${drunkenness}px) rotate(0deg);}`);
                rot.appendRule(`to { transform: rotate(360deg) translate(-${drunkenness}px) rotate(-360deg);}`);

                let rotccw = self.findKeyframesRule("rotccw");
                rotccw.appendRule(`from { transform: rotate(0deg) translate(-${drunkenness}px) rotate(0deg);}`);
                rotccw.appendRule(`to { transform: rotate(-360deg) translate(-${drunkenness}px) rotate(360deg);}`);
                break;
        }
    }
}

angular
    .module("HopsAcademy")
    .service("TriviaService", TriviaService)