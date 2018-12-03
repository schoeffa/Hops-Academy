"use strict";
function showInfo() {
    return {
        restrict: "A",
        replace: false,
        link: function($scope, $element, $attrs) {
            $element.on("click", () => {
                console.log($element);
                console.log($scope);
                $element[0].children[1].children[1].style.display = "flex";
                for (let beer of $element[0].parentNode.children) {
                    // $scope.$destroy(beer);
                    beer.removeAttribute("show-info");
                }
            });
        }
    }
}


angular.module("HopsAcademy").directive("showInfo", showInfo);