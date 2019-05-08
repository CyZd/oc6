<template>
<div>
    <div class="container is-fluid">
        <label for="distance"><h3>Distance</h3></label>
        <input id="distSlider" v-on:click="getRangeValue" name="distance" class="slider is-fullwidth is-info" step="100" min="100" max="300" value="100" type="range">
        <label v-if="value==100">250 mètres</label>
        <label v-else-if="value==200">500 mètres</label>
        <label v-else-if="value==300">1 500 mètres</label>
    </div>
    <div class="field" v-show="group==0">
        <toggle-button @change="showTransportAll"
          id="transport-all"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showTransportVelib"
          id="velib"
          :value="false"
          :sync="true"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Bornes Vélib', unchecked: 'Bornes Vélib'}"
        />
        <toggle-button @change="showTransportElectriccar"
          id="electric"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Recharge V.E.', unchecked: 'Recharge V.E.'}"
        />
        <toggle-button @change="showTransportParking"
          id="parking"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Parking', unchecked: 'Parking'}"
        />
        <toggle-button @change="showTransportMetro"
          id="bus"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Bus RATP', unchecked: 'Bus RATP'}"
        />
    </div>
    <div class="field" v-show="group==1">
        <toggle-button @change="showMedicAll"
          id="medicAll"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showMedicMedecin"
          id="medic"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Médecins', unchecked: 'Médecins'}"
        />
        <toggle-button @change="showMedicPharmacies"
          id="pharma"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Pharmacies', unchecked: 'Pharmacies'}"
        />
        <toggle-button @change="showMedicCentresSante"
          id="medicCenter"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Centres de soin', unchecked: 'Centres de soin'}"
        />
    </div>
    <div class="field" v-show="group==2">
        <toggle-button @change="showKidsAll"
          id="kidsAll"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change="showKidsCreches"
          id="nursery"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Crèches', unchecked: 'Crèches'}"
        />
        <toggle-button @change="showKidsSchool"
          id="school"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Ecoles', unchecked: 'Ecoles'}"
        />
    </div>
    <div class="field" v-show="group==3">
        <toggle-button @change=""
          id="changed-font"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <toggle-button @change=""
          id="everyday"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Commerces', unchecked: 'Commerces'}"
        />
        <toggle-button @change=""
          id="restaurant"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Restaurants', unchecked: 'Restaurants'}"
        />
        <toggle-button @change=""
          id="social"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Action sociale', unchecked: 'Action sociale'}"
        />
          <toggle-button @change=""
          id="sportCulture"
          :value="false"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Sport et Culture', unchecked: 'Sport et Culture'}"
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
            group:0,
            distance:250,
            value:100,
            error:false,
            option:''
        }
    },
    created(){
        
    },
    mounted(){
        new bulmaSlider(document.getElementById('distSlider'));
        serverBus.listen('changeGroup',(group)=>{
            this.group=group;
        });
    },
    methods:{
        showTransportAll:function(){
            serverBus.fire('showTransportAll',);
        },
        showTransportVelib:function(){
            serverBus.fire('showTransportVelib');
        },
        showTransportElectriccar:function(){
            serverBus.fire('showTransportElectriccar');
        },
        showTransportParking:function(){
            serverBus.fire('showTransportParking');
        },
        showTransportMetro:function(){
            serverBus.fire('showTransportMetro');
        },
        showMedicAll:function(){
            serverBus.fire('showMedicAll');
        },
        showMedicMedecin:function(){
            serverBus.fire('showMedicMedecin');
        },
        showMedicPharmacies:function(){
            serverBus.fire('showMedicPharmacies');
        },
        showMedicCentresSante:function(){
            serverBus.fire('showMedicCentresSante');
        },
        showKidsAll:function(){
            serverBus.fire('showKidsAll');
        },
        showKidsCreches:function(){
            serverBus.fire('showKidsshowKidsCreches');
        },
        showKidsSchool:function(){
            serverBus.fire('showKidsSchool');
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

.vue-js-switch{
  margin:5px;
}

</style>