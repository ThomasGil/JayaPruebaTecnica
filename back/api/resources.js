const express = require('express');
const router = express.Router();
const apiHelper = require('./apiHelper');
const firebaseConnector = require('./firebaseConnector');

const wheaterEndPoint = 'https://api.darksky.net/forecast/88030114c5e47763a011a75e7a10c633/';
const coordinatesEndPoint = 'https://api.mapbox.com/geocoding/v5/mapbox.places/@@city@@.json?access_token=pk.eyJ1IjoidGhvbWFzZ2lsIiwiYSI6ImNqemcxeWE5dDBoZG0zY3E2aDhkZXEzb3IifQ.x0YgrZQ0NhO5lyHU9NrQHw';

/**
 * Api endPoint to be call when requesting weather data from a city
 */
router.get('/:city', async (request, response) => {
    var coordinates = await getCoordinates( request.params.city );
    if(!coordinates){
        response.sendStatus(400);
    }
    var latitude = coordinates.longitude;
    var longitude = coordinates.latitude;
    var weather = await getWeather(latitude, longitude);
    if(weather){
        var log = {
            city: request.params.city,
            ip: request.header('x-forwarded-for') || request.connection.remoteAddress,
            weather: weather
        }
        setLog(log);
        response.send(weather);
    } else {
        response.sendStatus(500);
    }
});

/**
 *  get weather data from a point on Earth with its coordinates
 * @param latitude latitude
 * @param longitude longitude
 */
async function getWeather(latitude, longitude){
    var url = wheaterEndPoint + latitude + ',' + longitude;
    var weather = await apiHelper.simpleGetRequest(url);
    return weather;
}

/**
 * get the coorditanes of a city based on its name
 * @param city city name
 */
async function getCoordinates(city){
    var url = coordinatesEndPoint.replace('@@city@@', city);
    var demographicInfo = await apiHelper.simpleGetRequest(url);
    if(demographicInfo){
        var coordinates = {};
        if(demographicInfo.features.length > 0){
            coordinates.latitude = demographicInfo.features[0].center[0];
            coordinates.longitude = demographicInfo.features[0].center[1];
            return coordinates;
        }
    }
    return null;
}

/**
 * save new log info in firebase database
 * @param {city, ip, wheater} log log info 
 */
function setLog(log){
    firebaseConnector.setNewLog(log);
}

module.exports = router;