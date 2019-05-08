<template>
	<div id="app">

    	<body>
			<navbar></navbar>
			<myMap></myMap>
			<selectpannel></selectpannel>
			<messageSystem></messageSystem>
			<infopannel></infopannel>
		</body>

	</div>
</template>

<script>
import navbar from "./components/navbar.vue";
import myMap from "./components/myMap.vue";
import selectpannel from "./components/selectpannel.vue";
import infopannel from "./components/infopannel.vue";
import { ToggleButton } from 'vue-js-toggle-button';
import messageSystem from "./components/messageSystem.vue";


import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage);

export default{
	components:{
		'navbar':navbar,
		'myMap':myMap,
		'selectpannel':selectpannel,
		'infopannel':infopannel,
		'VueFlashMessage':VueFlashMessage,
		'messageSystem':messageSystem,
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
  margin-top: 60px;
}
</style>
