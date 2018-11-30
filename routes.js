"use strict";
const express = require("express");
const routes = express.Router();
const request = require("request")

routes.get("/beer", (req, res, next) => {
    request({
        uri: "http://sandbox-api.brewerydb.com/v2/beers/?key=8bf8bb00ab8eb3f416a0880fd96bcde6&randomCount=3",
    }).pipe(res);
    return res;
})

module.exports= routes;