"use strict";
// This directive removes the animation property for wobble when it finishes running so that it can be reapplied and run each round
function removeWobble() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("animationend", () => {
                $element[0].style.animation = "none";
            });
        }
    }
}


angular.module("HopsAcademy").directive("removeWobble", removeWobble);