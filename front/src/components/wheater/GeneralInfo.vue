<template>
    <div class="currentlyInfoContainer">
        <div class="infoHeader">
            <label class="title">wind: </label>
            <label>{{currently.windSpeed}} mph</label>
            <label class="title">humidity: </label>
            <label>{{currently.humidity}} %</label>
            <label class="title">dewPt: </label>
            <label>{{currently.dewPoint}} °</label>
            <label class="title">uvIndex: </label>
            <label>{{currently.uvIndex}}</label>
            <label class="title">visibility: </label>
            <label>{{currently.visibility}} mi</label>
            <label class="title">pressure: </label>
            <label>{{currently.pressure}} mb</label>
        </div>
        <div class="weatherContent">
            <div class="weatherImage">
                <img class="image" src="@/assets/cloudAndSun.png" alt="weather">
            </div>
            <div class="weatherInfo">
                <div class="temperaturePanel">
                    <label class="title temperatureLabel">{{currently.temperature}}°F </label>
                    <label class="title temperatureLabel">{{currently.summary}}</label> 
                </div>
                <div class="temperaturePanel">
                    <label class="title">feel like: </label>
                    <label>{{currently.apparentTemperature}}°F </label>
                    <label class="title">low:</label>
                    <label>{{lowest}}°F</label>
                    <label class="title">high: </label>
                    <label>{{highest}}°F</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'GeneralInfo',
    computed: {
        ...mapState(['currently','lowest','highest'])
    }
}
</script>

<style scoped>
    .currentlyInfoContainer{
        padding-bottom: 1ex;
    }
    .infoHeader{
        background-color: rgba(238,238,238,.35);
        padding: 1ex 0;
        height: 3ex;
    }
    .infoHeader label {
        vertical-align: sub;
    }
    .temperaturePanel{
        text-align: left;
        margin: auto;
    }
    .temperatureLabel{
        font-size: 3ex;
    }
    .title{
        font-weight: bold;
        margin: 1vh;
    }
    .image{
        width: 15%;
        float: right;
    }
    .weatherContent{
        padding: 1ex;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .weatherImage{
        width: 45%;
    }
    .weatherInfo{
        width: 55%;
    }
</style>