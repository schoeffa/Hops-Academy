"use strict";
const titleScreen = {
    templateUrl: "app/title-screen/title-screen.html",
    controller: [function() {
        const vm = this;
    }]
}

angular 
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);