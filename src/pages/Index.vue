<template>
  <q-page class="flex column" :class="bgClass">
    <div class="col q-pt-lg q-px-md">
      <q-input
        v-model="search"
        placeholder="Search"
        dark
        borderless
        @keyup.enter="getWeatheBySearch"
        >
        <template v-slot:before>
          <q-icon 
          @click="getLocation"
          name="my_location" />
        </template>

        <template v-slot:append>
          <q-btn round dense flat icon="search"   @click="getWeatheBySearch" />
        </template>
      </q-input>
    </div>
    <template v-if="weatherData">

      <div class="col text-white text-center">
        <div class="text-h4 text-weight-light">
          {{weatherData.name}}
        </div>
        <div class="text-h6 text-weight-light">
          {{weatherData.weather[0].main}}
        </div>
        <div class="text-h1 text-weight-thin q-my-lg relative-position">
          <span>{{Math.round(weatherData.main.temp)}}</span>
          <span class="text-h4 degree relative-position">&deg;C</span>
        
        </div>
      </div>

      <div class="col text-center">
        <img :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`" alt="Icon">
      </div>
    </template>

    <template v-else>
      <div class="col column text-white text-center">
        <div class="col text-h2 text-weight-thin">
          Quasar <br> Weather
        </div>
        <q-btn class="col" flat  @click="getLocation">
          <q-icon left size="3em" name="my_location" />
          <div>Find My Location</div>
        </q-btn>
      </div>

    </template>
    <q-dialog v-model="showDialog">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Error</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section>
            Please enter a valid city name
          </q-card-section>
        </q-card>
      </q-dialog>


    <div class="col skyline">
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PageIndex',
  data() {
    return {
      search: '',
      weatherData: null,
      lat: null,
      lon: null,
      apikey: 'f5d9b81ed866181c8d18d50301c16eae',
      baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
      showDialog: false,
    }
  },
  computed: {
    bgClass() {
      if(this.weatherData) {
        if(this.weatherData.weather[0].icon.endsWith('n')) {
          return 'bg-night';
        } else {
          return 'bg-day';
        }
      }
    }
  },
  methods: {
    getLocation() {
      this.$q.loading.show();
        navigator.geolocation.getCurrentPosition((position) => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.getWetherByCoord();
        });
     },
     getWetherByCoord() {
      this.$q.loading.show();
       const url=`${this.baseUrl}?lat=${this.lat}&lon=${this.lon}&appid=${this.apikey}&units=metric`;
        this.$axios(url).then((response) => {
          console.log(response);
          this.weatherData = response.data;
          this.$q.loading.hide();
        });
     },
     getWeatheBySearch() {
      if(this.search) { 
        this.$q.loading.show();
        const url=`${this.baseUrl}?q=${this.search}&appid=${this.apikey}&units=metric`;
          this.$axios(url).then((response) => {
            console.log(response);
            this.weatherData = response.data;
            this.$q.loading.hide();
          }, error=> {
            this.$q.loading.hide();
            this.showDialog = true;
            
          });
      }
     }
  },
  
}
</script>

<style lang="scss" scoped>
.q-page {
    background: linear-gradient(to bottom, #136a8a, #267871);
    &.bg-night {
      background: linear-gradient(to bottom, #232526, #414345);
    }
    &.bg-day {
      background: linear-gradient(to bottom, #00b4db, #0083b0);
    }
}
.degree {
  top: -44px
}
.skyline {
  flex: 0 0 60px;
  background: url('../assets/skyline.png');
  background-size: contain;
  background-position: center bottom;
}
</style>
