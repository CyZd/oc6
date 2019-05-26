import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import store from "./store/store";
import "./registerServiceWorker";
import { ToggleButton } from "vue-js-toggle-button";
import VueFlashMessage from "vue-flash-message";


Vue.use(VueFlashMessage);

Vue.use(Vuex);

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

//import toggle plugin
Vue.component("ToggleButton", ToggleButton);

//require main sass manifest file
require("./assets/sass/main.scss");

//creating main bus event
// export const serverBus = new Vue();

window.serverBus = new class {
  constructor() {
    this.vue = new Vue();
  }

  fire(event, data = null) {
    this.vue.$emit(event, data);
  }

  listen(event, callback) {
    this.vue.$on(event, callback);
  }

  firePoints(
    event,
    data,
    firstParam,
    secondParam,
    thirdParam,
    fourthParam,
    url,
    themeName,
    optionName
  ) {
    this.vue.$emit(event, [
      data,
      firstParam,
      secondParam,
      thirdParam,
      fourthParam,
      url,
      themeName,
      optionName
    ]);
  }
}();

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
