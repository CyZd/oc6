<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation" id="barMain">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <img src="../assets/marker3.jpg" width="30" height="50" />
      </a>
        <toggle-button
          @change="switchLocation()"
          id="gpsmod"
          :sync="false"
          :value="false"
          :width="100"
          :height="30"
          :color="{ checked: '#32cd32', unchecked: '#5daaec' }"
          :labels="{ checked: 'GPS actif', unchecked: 'GPS éteint' }"
        />
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
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
          class="navbar-item"
        >
          {{ button }}
        </a>
      </div>
      <div class="navbar-item">

      </div>

    </div>
  </nav>
</template>

<script>
// import { serverBus } from '../main.js';
document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

export default {
  data() {
    return {
      buttons: ["Transport", "Santé", "Enfance", "Quotidien"],
      group: 0,
      GPS: false
    };
  },
  methods: {
    changeGroup: function(number) {
      this.group = number;
      serverBus.fire("changeGroup", this.group);
    },
    switchLocation() {
      this.GPS = !this.GPS;
      serverBus.fire("switchLocation", this.GPS);
    }
  },
  mounted() {
    serverBus.fire("changeGroup", this.group);
  }
};
</script>

<style>
/* .navbar:hover {
  filter: drop-shadow(4px 8px 4px #9b9b9b);
  background-color: transparent!important;
} */

.navbar{
  position: absolute !important;
  /* position: -webkit-sticky !important; */

}

nav:hover{
  filter: drop-shadow(4px 8px 4px #9b9b9b);
}

.navbar-menu{
  background-color: transparent!important;
  z-index:800!important;
}

.navbar-brand {
  width: 50px !important;
  height: 50px !important;
}

nav{
  z-index:1800!important;
  position: absolute !important;
}

.navbar-burger {
  position: absolute !important;
  top: 2% !important;
  right: 5% !important;
}

#gpsmod{
  left: 650%!important;
  top:15%!important;
}

@media screen and (max-width: 1090px) {
  .burger{
    display:none!important;
  }

  .navbar-item{
    display:none!important;
  }
}

@media screen and (max-width: 1300px) {
  #gpsmod{
    left: 800%!important;
    top:15%!important;
  }
}

@media screen and (max-width: 700px) {
  #gpsmod{
    left: 50%!important;

  }
}
</style>
