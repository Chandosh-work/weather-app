<template>
  <div id="map" class="flex column"  style="width:100%;  height: calc(100vh - 70px);" ></div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader"
export default {
  // name: 'ComponentName',
  data () {
    return {
      myLatlng: { lat: 13.084, lng: 80.214 },
      weatherData: null,
      apikey: process.env.WEATHER_API_KEY,
      baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
      markers: [],
      contentString: '',
      mapLoader: Loader,
      map: null,
      googleMarker: null,
      infowindow: null,
    }
  }, 
  created() {
    this.geolocate();
  },
  methods: {
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.initMap();
        this.myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.getWetherByCoord(this.myLatlng);

      });
    },
    getWetherByCoord(coordinate, fromDrop=false) {
        this.$q.loading.show();
        const url=`${this.baseUrl}?lat=${coordinate.lat()}&lon=${coordinate.lng()}&appid=${this.apikey}&units=metric`;
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
            if(fromDrop) {
              this.infowindow.close();   
              // this.infowindow.open();   
            }
            this.$q.loading.hide();
            this.setMarker();
          });
    },     
    
    initMap(position) {
      const mapOptions = {
        zoom: 5,
        center: this.myLatlng
      }
      this.mapLoader = new Loader({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      });
      this.mapLoader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        this.googleMarker = new google.maps.Marker({
          position: this.myLatlng,
          map: this.map,
          draggable:true,
        });
        this.infowindow = new google.maps.InfoWindow({
          content: '',
        });
  
        this.googleMarker.addListener("click", () => {
          this.infowindow.open({
              anchor: this.googleMarker,
              map: this.map,
              position: this.myLatlng,
              shouldFocus: true,
            });
          });
        this.googleMarker.addListener("dragend", (event)=> {
          this.getWetherByCoord(event.latLng, true);
        });
      });
    },
    setMarker() {
      this.infowindow = new google.maps.InfoWindow({
        content: this.getContentString(this.markers[0]),
      });
      this.googleMarker.setMap(this.map);
      this.infowindow.open({
        anchor: this.googleMarker,
        map: this.map,
        position: this.myLatlng,
        shouldFocus: true,
      });
    },
    getContentString(marker) {
        let contentString = `<q-card class="info-card">
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
                        </q-card>`;          
      return contentString;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
