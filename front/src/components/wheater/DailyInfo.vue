<template>
    <div class="dailyInfoContainer">
        <div class="dailyTitle">
            <label for="">{{daily.summary}}</label>
        </div>
        <div v-for="(day,index) in daily.data" :key="index" class="dailyPanel">
            <div class="dayPanel">
                <img src="@/assets/weather.png" alt="clima" class="imageDayWeather">
                <label for=""> {{day.time | dayFromTimeStamp}} </label>
            </div>
            <div class="temperaturePanel">
                <label>
                    {{day.temperatureMin}}°F
                </label>
                <div class="temperatureBarContainer">
                    <div class="temperatureBar"></div>
                </div>
                <label>
                    {{day.temperatureMax}}°F
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'DailyInfo',

    computed: {
        ...mapState(['daily'])
    },

    methods: {

        /**
         * Set width of temperature bars to represent variability of temperature each day
         */
        updateTemperatureBarWidth() {
            if (this.daily.data.length > 0){
                var temperatureBars = document.getElementsByClassName('temperatureBar');
                var highest = this.daily.data[0].temperatureMax;
                var lowest = this.daily.data[0].temperatureMin;

                for( var i = 1, n = this.daily.data.length; i < n ; i++){
                    var dailyMin = this.daily.data[i].temperatureMin;
                    var dailyMax = this.daily.data[i].temperatureMax;
                    if(dailyMin < lowest){
                        lowest = dailyMin;
                    }
                    if(dailyMax > highest){
                        highest = dailyMax;
                    }
                }

                for( var i = 0, n = temperatureBars.length; i < n; i++){
                    var marginLeft = (this.daily.data[i].temperatureMin - lowest);
                    var marginRight = (highest - this.daily.data[i].temperatureMax);
                    temperatureBars[i].style.marginLeft = 'calc(' + marginLeft + '% + 5ex)';
                    temperatureBars[i].style.marginRight = 'calc(' + marginRight + '% + 5ex)';

                }
            }
        }
    },

    filters: {
        /**
         * return day name from timpestamp
         */
        dayFromTimeStamp: (value) => {
            var date = new Date(value * 1000);
            var day = date.getDay();
            switch (day) {
                case 0:
                    return 'Sun';
                case 1:
                    return 'Mon';
                case 2:
                    return 'Tue';
                case 3:
                    return 'Wed';
                case 4:
                    return 'Thu';
                case 5:
                    return 'Fri';
                case 6:
                    return 'Sat';
            }
        }
    },

    updated(){
        this.updateTemperatureBarWidth();
    }
}
</script>

<style scoped>
    .dailyInfoContainer{
        padding: 1ex;
    }
    .dailyTitle{
        margin-bottom: 1ex;
        font-size: x-large;
    }
    .dailyPanel{
        width: 50%;
        margin-left: 25%;
        display: flex;
    }

    .dayPanel{
        width: 15%;
        display: flex;
    }

    .dayPanel label {
        width: 50%;
        margin: auto;
        font-weight: bold;
    }
    .imageDayWeather {
        margin: auto;
        width: 2ex;
        vertical-align: middle;
    }
    .temperaturePanel{
        width: 85%;
        display: flex;
    }
    .temperaturePanel label {
        width: 10%;
        margin: auto;
    }
    .temperatureBarContainer {
        width: 100%;
        height: 4ex;
    }

    .temperatureBar{
        background-color: #333;
        height: 2ex;
        border-radius: 1ex;
        width: 60%;
        margin: 1ex;
    }
</style>