<template>
  <div id="app">
    <body v-bind:class="colorGroup[group]">
      <navbar></navbar>
      <messageSystem></messageSystem>
      <myMap></myMap>
      <selectpannel></selectpannel>
      <infopannel></infopannel>
    </body>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import myMap from "./components/myMap.vue";
import selectpannel from "./components/selectpannel.vue";
import infopannel from "./components/infopannel.vue";
import { ToggleButton } from "vue-js-toggle-button";
import messageSystem from "./components/messageSystem.vue";
import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";

import Vue from "vue";

import VueFlashMessage from "vue-flash-message";
Vue.use(VueFlashMessage);

Vue.component("BadgerAccordion", BadgerAccordion);
Vue.component("BadgerAccordionItem", BadgerAccordionItem);

export default {
  components: {
    navbar: navbar,
    myMap: myMap,
    selectpannel: selectpannel,
    infopannel: infopannel,
    VueFlashMessage: VueFlashMessage,
    messageSystem: messageSystem
  },
  mounted(){
    serverBus.listen("changeGroup", group => {
      this.group = group;
    });
  },
  data(){
    return{
      group:0,
      colorGroup:[
        'blue',
        'green',
        'violet',
        'red',
      ],

    }
  }
};
</script>

<style lang="scss">

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height:100vh !important;
}

body{
  height:100vh !important;
  background-image: linear-gradient(135deg, white 14%, rgba(255,255,255,0))!important;
}

.navbar, .field, #sliderContainer,dl,dt,.geosearch{
  -webkit-transition: all 0.4s ease!important;
  -moz-transition: all 0.4s ease!important;
  -ms-transition: all 0.4s ease!important;
  -o-transition: all 0.4s ease!important;
}

.navbar {
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0;
  background-color: transparent!important;
}

.blue, .green, .violet, .red{
  transition: all .4s ease-in!important;
  -webkit-transition: all .4s ease-in!important;
  -moz-transition: all .4s ease-in!important;
  -o-transition: all .4s ease!important;
  background-size: cover!important;
}

.blue{
  background-color: rgba(33,180,226,1)!important;
}

.green{
  background-color: rgba(111,214,73,1)!important;
}

.violet{
  background-color: rgba(194,0,188,1)!important;
}

.red{
  background-color: rgba(240,47,23,1)!important;
}
</style>
