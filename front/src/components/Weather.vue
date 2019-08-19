<template>
    <div>
        <div class="inputsContainer">
            <input class="cityInput" type="text" v-model="city" placeholder="city">
            <img class="searchButton" src="@/assets/search.png" alt="search" @click="getCityWeather()">
        </div>
        <div>
            <GeneralInfo/>
            <HourlyInfo/>
            <DailyInfo/>
        </div>
    </div> 
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import GeneralInfo from './wheater/GeneralInfo.vue';
import HourlyInfo from './wheater/HourlyInfo.vue';
import DailyInfo from './wheater/DailyInfo.vue';

export default {
    name: 'Weather',

    components: {
        GeneralInfo,
        HourlyInfo,
        DailyInfo
    },

    computed: {
        ...mapState(['axios']),

        city: {
            get: function(){ return this.$store.state.city; },
            set: function(value) { this.$store.state.city = value}
        },

        wheater: {
            get: function(){ return this.$store.state.wheater; },
            set: function(value) { this.$store.state.wheater = value}
        }
    },
    
    methods: {
        ...mapMutations(['setEspecificDataFromWeather']),

        /**
         * call the back end api to get weather data of the input city
         */
        getCityWeather(){
            this.axios({
                method: 'get',
                url: 'http://localhost:8088/api/wheater/' + this.city
            }).then( response => {
                this.wheater = response.data;
                this.setEspecificDataFromWeather();
            }).catch( error => {
                console.log(error);
            });
        }
    },
}
</script>

<style scoped>
    .cityInput{
        width: 40%;
        border: none;
        border-radius: 2ex;
        height: 3ex;
        text-align: center;
    }

    .inputsContainer{
        padding: 1ex;
        background-color: #eee;
    }

    .searchButton{
        vertical-align: middle;
        margin-left: 1ex;
    }
</style>