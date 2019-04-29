<template>
<div>
    <div class="container is-fluid">
        <label for="distance"><h3>Distance</h3></label>
        <input id="distSlider" v-on:click="getRangeValue" name="distance" class="slider is-fullwidth is-info" step="100" min="100" max="300" value="100" type="range">
        <label v-if="value==100">250 mètres</label>
        <label v-else-if="value==200">500 mètres</label>
        <label v-else-if="value==300">1 500 mètres</label>
    </div>
    <div class="field" v-if="group==0">
        <toggle-button @change="showTransportAll"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showTransportTwo"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Bornes Vélib', unchecked: 'Bornes Vélib'}"
        />
        <toggle-button @change="showTransportThree"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Recharge V.E.', unchecked: 'Recharge V.E.'}"
        />
    </div>
    <div class="field" v-else-if="group==1">
        <toggle-button @change="showMedicAll"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showMedicOne"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Médecins', unchecked: 'Médecins'}"
        />
        <toggle-button @change="showMedicTwo"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Pharmacies', unchecked: 'Pharmacies'}"
        />
    </div>
    <div class="field" v-else-if="group==2">
        <toggle-button @change="showKidsAll"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showKidsOne"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Crèches', unchecked: 'Crèches'}"
        />
        <toggle-button @change="showKidsTwo"
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Ecoles', unchecked: 'Ecoles'}"
        />
    </div>
</div>
</template>

<script>
// import { serverBus } from '../main.js';
import bulmaSlider from "../../node_modules/bulma-extensions/bulma-slider/dist/js/bulma-slider";

export default{
    data(){
        return{
            group:null,
            distance:250,
            value:100,
            error:false,
            option:''
        }
    },
    created(){
        serverBus.listen('changeGroup',(group)=>{
            this.group=group;
        });
    },
    mounted(){
        new bulmaSlider(document.getElementById('distSlider'));
    },
    methods:{
        showTransportAll:function(){
            serverBus.fire('showTransportAll',);
        },
        showTransportTwo:function(){
            serverBus.fire('showTransportTwo',this.distance);
        },
        showTransportThree:function(){
            serverBus.fire('showTransportThree',this.distance);
        },
        showMedicAll:function(){
            serverBus.fire('showMedicAll',this.distance);
        },
        showMedicOne:function(){
            serverBus.fire('showMedicOne',this.distance);
        },
        showMedicTwo:function(){
            serverBus.fire('showMedicTwo',this.distance);
        },
        showKidsAll:function(){
            serverBus.fire('showKidsAll',this.distance);
        },
        showKidsOne:function(){
            serverBus.fire('showKidsOne',this.distance);
        },
        showKidsTwo:function(){
            serverBus.fire('showKidsTwo',this.distance);
        },
        getRangeValue(){
            this.value=document.getElementById("distSlider").value; 
            if(this.value==100){
                this.distance=250;
            }else if(this.value==200){
                this.distance=500;
            }else if(this.value=300){
                this.distance=1500;
            }
            serverBus.fire('changeCircleRange',this.distance);
        }
    }
}
</script>

<style>
@import '../../node_modules/bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css';


</style>