(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[2],{"19df":function(t,e,a){"use strict";a("cd41")},"3ea5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"flex column"},[a("div",{staticClass:"row"},[a("q-btn",{staticClass:"row ",attrs:{flat:"",color:"white"},on:{click:t.goBack}},[a("q-icon",{attrs:{left:"",size:"3em",name:"arrow_back"}})],1),a("div",{staticClass:"row justify-center text-white text-h4  q-my-sm",attrs:{color:"white"}},[t._v(" Weather Map ")])],1),a("google-map-npm")],1)},o=[],i={components:{"google-map-npm":a("5c12").default,"google-map":a("6ba0").default},data(){return{}},methods:{goBack(){this.$router.go(-1)}}},s=i,r=(a("ec18"),a("2877")),l=a("9989"),c=a("9c40"),h=a("0016"),d=a("eebe"),p=a.n(d),g=Object(r["a"])(s,n,o,!1,null,"81848e6a",null);e["default"]=g.exports;p()(g,"components",{QPage:l["a"],QBtn:c["a"],QIcon:h["a"]})},"5c12":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("gmap-map",{ref:"gmap",staticStyle:{width:"100%",height:"calc(100vh - 70px)"},attrs:{center:t.center,zoom:7}},[t._l(t.markers,(function(e,n){return a("gmap-marker",{key:n,attrs:{position:e.position,draggable:!0},on:{click:function(a){return t.toggleInfoWindow(e,n)},dragend:function(e){return t.updateCoordinates(e,n)}}})})),a("gmap-info-window",{attrs:{options:t.infoOptions,position:t.infoWindowPos,opened:t.infoWinOpen},on:{closeclick:function(e){t.infoWinOpen=!1}}},[a("div",{domProps:{innerHTML:t._s(t.infoContent)}})])],2)],1)},o=[],i=(a("ddb0"),{name:"GoogleMap",data(){return{weatherData:null,apikey:"f5d9b81ed866181c8d18d50301c16eae",baseUrl:"https://api.openweathermap.org/data/2.5/weather",center:{},map:null,infoContent:"",infoWindowPos:{lat:0,lng:0},infoWinOpen:!1,currentMidx:null,infoOptions:{pixelOffset:{width:0,height:-35}},markers:[]}},mounted(){this.geolocate(),this.$refs.gmap.$mapPromise.then((t=>{const e=new google.maps.LatLngBounds;for(let a of this.markers)e.extend(a.position);t.fitBounds(e)}))},methods:{geolocate(){navigator.geolocation.getCurrentPosition((t=>{this.center={lat:t.coords.latitude,lng:t.coords.longitude},this.getWetherByCoord(this.center)}))},toggleInfoWindow(t,e,a=!1){this.infoWindowPos=t.position,this.infoContent=this.getInfoWindowContent(t),this.currentMidx!=e||a?(this.infoWinOpen=!0,this.currentMidx=e):this.infoWinOpen=!this.infoWinOpen},updateCoordinates(t,e){let a={lat:t.latLng.lat(),lng:t.latLng.lng()};this.getWetherByCoord(a,e,!0)},getWetherByCoord(t,e=null,a=!1){this.$q.loading.show();const n=`${this.baseUrl}?lat=${t.lat}&lon=${t.lng}&appid=${this.apikey}&units=metric`;this.$axios(n).then((e=>{this.weatherData=e.data;let n={name:this.weatherData.name&&""!==this.weatherData.name?this.weatherData.name:"Location Unknown",position:t,temperature:Math.round(this.weatherData.main.temp),skyState:this.weatherData.weather[0].main,icon:`http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`};this.markers=[],this.markers.push(n),a?this.toggleInfoWindow(n,0,a):this.toggleInfoWindow(n,0),this.$q.loading.hide()}))},getInfoWindowContent:function(t){let e=`<q-card class="info-card">\n                          <q-card-section>\n                            <div class="text-h6">Weather Details</div>\n                          </q-card-section>\n                          <q-separator>\n                          </q-separator>\n                          <q-card-section class="q-mt-sm flex column justify-center text-center">\n                                <div class="text-h6">${t.name}</div>\n                                <div class="text-h5 text-weight-bold relative-position q-mt-sm">\n                                  <span>${t.temperature}</span>\n                                  <span class="degree relative-position">&deg;C</span>\n                                </div>\n                                <img class="weather-icon" src="${t.icon}" alt="Icon">\n                                <div clas="text-h6">${t.skyState}</div>\n                          </q-card-section>\n                        </q-card>`;return e}}}),s=i,r=(a("19df"),a("2877")),l=a("f09f"),c=a("a370"),h=a("eb85"),d=a("eebe"),p=a.n(d),g=Object(r["a"])(s,n,o,!1,null,"ea685a18",null);e["default"]=g.exports;p()(g,"components",{QCard:l["a"],QCardSection:c["a"],QSeparator:h["a"]})},"6ba0":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"flex column",staticStyle:{width:"100%",height:"calc(100vh - 70px)"},attrs:{id:"map"}})},o=[],i=a("4272"),s={data(){return{myLatlng:{lat:13.084,lng:80.214},weatherData:null,apikey:"f5d9b81ed866181c8d18d50301c16eae",baseUrl:"https://api.openweathermap.org/data/2.5/weather",markers:[],contentString:"",mapLoader:i["a"],map:null,googleMarker:null,infowindow:null}},created(){this.geolocate()},methods:{geolocate(){navigator.geolocation.getCurrentPosition((t=>{this.initMap(),this.myLatlng=new google.maps.LatLng(t.coords.latitude,t.coords.longitude),this.getWetherByCoord(this.myLatlng)}))},getWetherByCoord(t,e=!1){this.$q.loading.show();const a=`${this.baseUrl}?lat=${t.lat()}&lon=${t.lng()}&appid=${this.apikey}&units=metric`;this.$axios(a).then((a=>{this.weatherData=a.data;let n={name:this.weatherData.name&&""!==this.weatherData.name?this.weatherData.name:"Location Unknown",position:t,temperature:Math.round(this.weatherData.main.temp),skyState:this.weatherData.weather[0].main,icon:`http://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`};this.markers=[],this.markers.push(n),e&&this.infowindow.close(),this.$q.loading.hide(),this.setMarker()}))},initMap(t){const e={zoom:5,center:this.myLatlng};this.mapLoader=new i["a"]({apiKey:"AIzaSyAVXAMKnE7_iMz-S76m2RA1zyTd8l0mbIU"}),this.mapLoader.load().then((()=>{this.map=new google.maps.Map(document.getElementById("map"),e),this.googleMarker=new google.maps.Marker({position:this.myLatlng,map:this.map,draggable:!0}),this.infowindow=new google.maps.InfoWindow({content:""}),this.googleMarker.addListener("click",(()=>{this.infowindow.open({anchor:this.googleMarker,map:this.map,position:this.myLatlng,shouldFocus:!0})})),this.googleMarker.addListener("dragend",(t=>{this.getWetherByCoord(t.latLng,!0)}))}))},setMarker(){this.infowindow=new google.maps.InfoWindow({content:this.getContentString(this.markers[0])}),this.googleMarker.setMap(this.map),this.infowindow.open({anchor:this.googleMarker,map:this.map,position:this.myLatlng,shouldFocus:!0})},getContentString(t){let e=`<q-card class="info-card">\n                          <q-card-section>\n                            <div class="text-h6">Weather Details</div>\n                          </q-card-section>\n                          <q-separator>\n                          </q-separator>\n                          <q-card-section class="q-mt-sm flex column justify-center text-center">\n                                <div class="text-h6">${t.name}</div>\n                                <div class="text-h5 text-weight-bold relative-position q-mt-sm">\n                                  <span>${t.temperature}</span>\n                                  <span class="degree relative-position">&deg;C</span>\n                                </div>\n                                <img class="weather-icon" src="${t.icon}" alt="Icon">\n                                <div clas="text-h6">${t.skyState}</div>\n                          </q-card-section>\n                        </q-card>`;return e}}},r=s,l=a("2877"),c=a("f09f"),h=a("a370"),d=a("eb85"),p=a("eebe"),g=a.n(p),m=Object(l["a"])(r,n,o,!1,null,"3e73c739",null);e["default"]=m.exports;g()(m,"components",{QCard:c["a"],QCardSection:h["a"],QSeparator:d["a"]})},"747f":function(t,e,a){},cd41:function(t,e,a){},ec18:function(t,e,a){"use strict";a("747f")}}]);