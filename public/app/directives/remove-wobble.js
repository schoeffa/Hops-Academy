"use strict";
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