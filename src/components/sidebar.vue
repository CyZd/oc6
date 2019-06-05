<template>
    <nav class="panel is-offset-10" id="sidebar">
        <!-- <p class="panel-heading"> -->
            <img src="../assets/marker3.jpg" width="30" height="50" />
        <!-- </p> -->
        <div class="panel-block">
        </div>
        <!-- <p class="panel-tabs">
            <a class="is-active">all</a>
            <a>public</a>
            <a>private</a>
            <a>sources</a>
            <a>forks</a>
        </p> -->
        <a
          v-for="button in buttons"
          v-on:click="changeGroup(buttons.indexOf(button))"
          class="panel-block is-active"
        >
          <p class="subtitle is-4">{{ button }}</p>
        </a>
    </nav>
</template>

<script>
export default {
  data() {
    return {
      buttons: ["Transport", "Santé", "Enfance", "Quotidien"],
      group: 0,
    };
  },
  methods: {
    changeGroup: function(number) {
      this.group = number;
      serverBus.fire("changeGroup", this.group);
    },
  },
  //check is the following fuunction doesn't reset interface a second time
  mounted() {
    serverBus.fire("changeGroup", this.group);
  }
}
</script>

<style>
#sidebar{
  width:5%!important;
  height:99%;
  background-color:white;
  position:absolute!important;
  top:0;
}

.panel>img{
  margin-top:8px;
}

#sidebar>.panel-block>p{
  transform:scale(0.1);
  opacity:0;
}

.panel-block{
  border-bottom:0px!important;
}

#sidebar:hover{
  transition: all .4s ease-in!important;
  -webkit-transition: all .4s ease-in!important;
  -moz-transition: all .4s ease-in!important;
  -o-transition: all .4s ease!important;
  width:20%!important;
}

#sidebar:hover *{
  transition: opacity .5s ease-in!important;
  opacity:1!important;
  transform:scale(1)!important;
}

@media screen and (min-width: 1090px) {
  #sidebar, #sidebar * {
    display:none!important;

  }
}
</style>

