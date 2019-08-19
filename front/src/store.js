import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: "",

    currently: {
      wind: '',
      humidity: '',
      dewPt: '',
      uvIndex: '',
      visibility: '',
      pressure: ''
    },

    hourly: {
      data: []
    },

    daily: {
      data: []
    },

    lowest: 0,

    highest: 0,

    wheater: {},

    axios: Axios
  },

  mutations: {

    /**
     * Set weather data values to store specifc variables
     * @param {} state 
     */
    setEspecificDataFromWeather( state ){
      state.currently = state.wheater.currently;
      state.hourly = state.wheater.hourly;
      state.daily = state.wheater.daily;

      var hourlyData = state.hourly.data;
      var lowest = 0;
      var highest = 0;
      if(hourlyData.length > 0){
        lowest = hourlyData[0].temperature;
        highest = hourlyData[0].temperature;
        for( var i = 1, n = hourlyData.length; i < n; i++){
          if(hourlyData[i].temperature > highest){
            highest = hourlyData[i].temperature;
          }
          if(hourlyData[i].temperature < lowest){
            lowest = hourlyData[i].temperature;
          }
        }
      }
      state.lowest = lowest;
      state.highest = highest;
    }
  },

  actions: {
  }
})
