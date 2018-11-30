"use strict";
function TriviaService($http) {
    const self = this;
    self.getBeer = () => {
        return $http ({
            url: "/beer",
            method: "GET"
        }).then((result) => {   
            self.beerList = result.data.data;
            self.firstIndex = Math.floor(Math.random() * 50);
            self.secondIndex = Math.floor(Math.random()* 50);
            self.thirdIndex = Math.floor(Math.random()* 50);
            console.log(self.firstIndex, self.secondIndex, self.thirdIndex);
            return [self.beerList[self.firstIndex], self.beerList[self.secondIndex], self.beerList[self.thirdIndex]];
        });
    }
}

angular
    .module("HopsAcademy")
    .service("TriviaService", TriviaService)