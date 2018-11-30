"use strict";
function showInfo() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                $element[0].children[2].style.display = "flex";
            });
        }
    }
}


angular.module("HopsAcademy").directive("showInfo", showInfo);