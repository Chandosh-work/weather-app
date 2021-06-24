<template>
 <div>

<!-- @click='addMarker($event)' -->

      <gmap-map
      ref="gmap"
      :center="center"
      :zoom="7"
      style="width:100%;  height: calc(100vh - 70px);" 
    >
      
      <gmap-marker
        :key="index"
        v-for="(marker, index) in markers"
        :position="marker.position"
        @click="toggleInfoWindow(marker,index)"
        :draggable="true" 
        @dragend="updateCoordinates($event, index);"
        >
      </gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>

    </gmap-map>

  
  <!-- <div v-if="markers[0]" id="InfoContent" class="hideTemplate">
    <q-card class="info-card">
      <q-card-section>
        <div class="text-h6">Weather Details</div>
      </q-card-section>
      <q-separator>
      </q-separator>
      <q-card-section class="q-mt-sm flex column justify-center text-center">
        <div class="text-h6">{{markers[0].name}}</div>
        <div class="text-h5 text-weight-bold relative-position q-mt-sm">
        <span>{{markers[0].temperature}}</span>
        <span class="degree relative-position">&deg;C</span>
        </div>
        <img class="weather-icon" :src="markers[0].icon" alt="Icon">
        <div clas="text-h6">{{markers[0].skyState}}</div>
      </q-card-section>
    </q-card>
  </div> -->

  </div>
</template>

<script>
export default {
  name: 'GoogleMap',
   data() {
      return {
        //a default center for the map

        weatherData: null,
        apikey: process.env.WEATHER_API_KEY,
        baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
        center: {},
        map: null,
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        markers: [],
      };
    },
    mounted() {
      this.geolocate();
      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new google.maps.LatLngBounds()
        for (let m of this.markers) {
          bounds.extend(m.position)
        }
        map.fitBounds(bounds);
      });
    },
    methods: {
      geolocate() {
          navigator.geolocation.getCurrentPosition(position => {
              this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
               this.getWetherByCoord(this.center);
          });
      },
      toggleInfoWindow(marker, idx, onDrop=false) {
        this.infoWindowPos = marker.position;
        this.infoContent = this.getInfoWindowContent(marker);
        

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx && !onDrop) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },


      updateCoordinates(location, index) {
        let coordinate = {lat :location.latLng.lat() , lng: location.latLng.lng() };
        this.getWetherByCoord(coordinate, index, true);
      },

      getWetherByCoord(coordinate, index=null, onDrop=false) {
        this.$q.loading.show();
        const url=`${this.baseUrl}?lat=${coordinate.lat}&lon=${coordinate.lng}&appid=${this.apikey}&units=metric`;
          this.$axios(url).then((response) => {
          
            this.weatherData = response.data;
            let marker = {
              name: (this.weatherData.name && this.weatherData.name!== '') ? this.weatherData.name : 'Location Unknown' ,
              position: coordinate, 
              temperature: Math.round(this.weatherData.main.temp),
              skyState: this.weatherData.weather[0].main,
              icon: `http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
            }
            this.markers = [];
            this.markers.push(marker);
            if(onDrop) {
              this.toggleInfoWindow(marker, 0, onDrop);
            } else {
              this.toggleInfoWindow(marker, 0);
            }
            this.$q.loading.hide();
          });
      },

      getInfoWindowContent: function (marker) {

        let content = `<q-card class="info-card">
                          <q-card-section>
                            <div class="text-h6">Weather Details</div>
                          </q-card-section>
                          <q-separator>
                          </q-separator>
                          <q-card-section class="q-mt-sm flex column justify-center text-center">
                                <div class="text-h6">${marker.name}</div>
                                <div class="text-h5 text-weight-bold relative-position q-mt-sm">
                                  <span>${marker.temperature}</span>
                                  <span class="degree relative-position">&deg;C</span>
                                </div>
                                <img class="weather-icon" src="${marker.icon}" alt="Icon">
                                <div clas="text-h6">${marker.skyState}</div>
                          </q-card-section>
                        </q-card>`
        return content;

      },
    }

};
</script>

<style lang="scss" scoped>
 .info-card {
    width: 100%;
    max-width: 250px;
    min-width: 200px;
}
.degree {
    font-size: 13px; 
    top: -14px;
}
.weather-icon {
    height: 80px;
    width: 80px;
    position: relative;
    margin: 0 auto;
}
// .hideTemplate {
//   display: none;
// }
</style>
