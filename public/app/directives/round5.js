"use strict";

function round5() {
    return {
        restrict: "A",
        replace: false,
        link: function ($scope, $element, $attrs) {
            // if ($ctrl.roundNum === 5) {
                // TriviaService.setUpCharacters();
                let newContent = '';
                for (let i = 0; i < $element[0].textContent.length; i++) {
                    let substring = $element[0].textContent.substr(i, 1);
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
                $element[0].innerHTML = newContent;
            // }
        }
    }
}


angular.module("HopsAcademy").directive("round5", round5);