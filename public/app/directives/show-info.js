"use strict";
function showInfo() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                $element[0].children[2].children[1].style.display = "flex";
                $element[0].children[1].classList.toggle("anim-logo-active");
                $element["0"].style.pointerEvents = "none";
                $element["0"].parentNode.parentNode.parentNode.childNodes[1].childNodes["0"].childNodes[7].childNodes[3].style.animation = "wobble .5s linear 6 alternate";
            });
        }
    }
}


angular.module("HopsAcademy").directive("showInfo", showInfo);