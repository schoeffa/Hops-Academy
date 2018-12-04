"use strict";
function showInfo() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                $element[0].children[1].children[1].style.display = "flex";
            //     console.log($element);
            //     let ident = $element[0].outerText;
            //     console.log($element[0].parentNode);
            //     for (let child of $element[0].parentNode.childNodes) {
            //         if (child.outerText != ident) {
            //             child.style.display = "none";
            //         }
            // }
            });
        }
    }
}


angular.module("HopsAcademy").directive("showInfo", showInfo);