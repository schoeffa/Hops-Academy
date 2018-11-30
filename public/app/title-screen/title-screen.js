"use strict";
const titleScreen = {
    templateUrl: "title-screen.html",
    controller: [function() {
        const vm = this;
    }]
}

angular 
    .module("HopsAcademy")
    .component("titleScreen", titleScreen);