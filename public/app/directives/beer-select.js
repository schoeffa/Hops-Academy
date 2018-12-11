"use strict";
// Functionality for events that happen on beer selection
function beerSelect() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                // Displays the extended info portion of selected beer
                $element[0].children[2].children[1].style.display = "flex";
                // Triggers the CSS Transition for the selected beer logo
                $element[0].children[1].classList.toggle("anim-logo-active");
                // Makes selected beer unclickable for remainder of round
                $element["0"].style.pointerEvents = "none";
                // Triggers the wobble animation on the Buzz number in the stats bar
                $element["0"].parentNode.parentNode.parentNode.childNodes[1].childNodes["0"].childNodes[7].childNodes[3].style.animation = "wobble .5s linear 6 alternate";
            });
        }
    }
}


angular.module("HopsAcademy").directive("beerSelect", beerSelect);