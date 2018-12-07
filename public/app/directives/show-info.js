"use strict";
function showInfo() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                $element[0].children[1].children[1].style.display = "flex";
                $element["0"].style.pointerEvents = "none";
            });
        }
    }
}


angular.module("HopsAcademy").directive("showInfo", showInfo);