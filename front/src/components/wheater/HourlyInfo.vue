<template>
    <div class="hourlyInfoContainer">
        <div class="hourlyTitle">
            <label>{{hourly.summary}}</label>
        </div>
        <div class="hourlyPanel">
            <div v-for="(hour, i) in hourly.data" :key="i" class="hourlyData">
                <label>'</label>
                <div class="timeData">
                    <label>{{hour.time | getHourFromTimeStamp}}</label>
                </div>
                <div class="hourlyData">
                    <label> {{hour.temperature}}°F </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'HourlyInfo',

    computed: {
        ...mapState(['hourly'])
    },

    filters: {
        /**
         * return hour from time stamp
         */
        getHourFromTimeStamp: (value) => {
            var date = new Date(value * 1000);
            var hour = date.getHours();
            if( hour == 0){
                return "12 a.m.";
            }
            else if (hour == 12){
                return "12 p.m.";
            }
            else if( hour < 12){
                return hour + " a.m.";
            } else {
                return (hour % 12) + " p.m.";
            }
        }
    }
}
</script>

<style scoped>
    .hourlyInfoContainer {
        padding: 1ex;
    }
    .hourlyTitle {
        margin-bottom: 3ex;
        font-size: x-large;
    }
    .hourlyPanel{
        display: flex;
        width: 70%;
        margin-left: 15%;
        overflow-x: auto;
    }
    .hourlyPanel label {
        padding-left: 1ex;
    }
    .hourlyData{
        width: 10ex;
    }
    .timeData {
        font-weight: bold;
    }
</style>