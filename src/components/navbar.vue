<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a 
        v-for="button in buttons" 
        v-on:click="changeGroup(buttons.indexOf(button))"
        class="navbar-item">
          {{button}}
      </a>
    </div>
    <div class="navbar-item">
          <toggle-button @change="switchLocation()"
          id="gpsmod"
          :sync="false"
          :value="false"
          :width="100"
          :height="30"
          :color="{checked: '#32cd32', unchecked: '#5daaec'}"
          :labels="{checked: 'GPS actif', unchecked: 'GPS éteint'}"
        />
    </div>
    <div class="navbar-item">
        <a v-if="GPS==false" class="navbar-item">Entrez une adresse</a>
        <a v-else class="navbar-item">Vous êtes géolocalisé</a>
    </div>
      
  </div>
</nav>

</template>

<script>
// import { serverBus } from '../main.js';
document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {

        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }

});

export default {
    data(){
        return{
            buttons:[
              'Transport',
              'Santé',
              'Enfance',
              'Quotidien'
            ],
            group:0,
            GPS:false,
        }
    },
    methods:{
      changeGroup:function(number){
        this.group=number;
        serverBus.fire('changeGroup',this.group);
      },
      switchLocation(){
        this.GPS=!this.GPS;
        serverBus.fire('switchLocation',this.GPS);
      }
    },
    mounted(){
        serverBus.fire('changeGroup',this.group);
    }
}
</script>

<style>
.navbar:hover{
    filter: drop-shadow(4px 8px 4px #9b9b9b);
}

.navbar{
  	position:sticky!important;
	  position: -webkit-sticky!important;
}

</style>