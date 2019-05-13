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
          :value="this.transportAll"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonTransport">
          <toggle-button @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==1">
        <toggle-button @change="showMedicAll"
          id="transport-all"
          :value="this.medicAll"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonMedic">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==2">
        <toggle-button @change="showKidsAll"
          id="transport-all"
          :value="this.kidsAll"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonKids">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==3">
        <toggle-button @change="showEverydayAll"
          id="transport-all"
          :value="this.everydayAll"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonEveryday">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#BE3D62"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
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
            option:'',
            transportAll:false,
            medicAll:false,
            kidsAll:false,
            everydayAll:false,
            buttonTransport:[
              {category:'Transport',name:'Stations Velib',value:false,color:'#BE3D62',labels:'Bornes Vélib',method:'showTransportVelib'},
              {category:'Transport',name:'Véhicules électriques',value:false,color:'#BE3D62',labels:'Recharge V.E.',method:'showTransportElectriccar'},
              {category:'Transport',name:'Stationnement',value:false,color:'#BE3D62',labels:'Parking',method:'showTransportParking'},
              {category:'Transport',name:'Bus RATP',value:false,color:'#BE3D62',labels:'Bus RATP',method:'showTransportMetro'},
            ],
            buttonMedic:[
              {category:'Santé',name:'Medecins',value:false,color:'#BE3D62',labels:'Médecins'},
              {category:'Santé',name:'Pharmacies',value:false,color:'#BE3D62',labels:'Pharmacies'},
              {category:'Santé',name:'Centres de soin',value:false,color:'#BE3D62',labels:'Centres de soin'},
            ],
            buttonKids:[
              {category:'Enfance',name:'Crèches',value:false,color:'#BE3D62',labels:'Crèches'},
              {category:'Enfance',name:'Ecoles',value:false,color:'#BE3D62',labels:'Ecoles'},
            ],
            buttonEveryday:[
              {category:'Quotidien',name:'Commerces',value:false,color:'#BE3D62',labels:'Commerces'},
              {category:'Quotidien',name:'Restaurants',value:false,color:'#BE3D62',labels:'Restaurants'},
              {category:'Quotidien',name:'Action Sociale',value:false,color:'#BE3D62',labels:'Action sociale'},
              {category:'Quotidien',name:'Sport Culture',value:false,color:'#BE3D62',labels:'Sport et Culture'},
            ],
        }
    },
    created(){
        
    },
    mounted(){
        new bulmaSlider(document.getElementById('distSlider'));
        serverBus.listen('changeGroup',(group)=>{
            this.group=group;
        });
        serverBus.listen('buttonOff',(data)=>{
          switch(data[0]){
            case 'Transport':
              for(var items of this.buttonTransport){
                if(items.name==data[1]){
                  items.value=false;
                  this.transportAll=false;
                }
              }
              break;
            case 'Santé':
              for(var items of this.buttonMedic){
                if(items.name==data[1]){
                  items.value=false;
                  this.medicAll=false;
                }
              }
              break;
            case 'Enfance':
              for(var items of this.buttonKids){
                if(items.name==data[1]){
                  items.value=false;
                  this.kidsAll=false;
                }
              }
              break;
            case 'Quotidien':
              for(var items of this.buttonEveryday){
                if(items.name==data[1]){
                  items.value=false;
                  this.everydayAll=false;
                }
              }
              break;
          }
            
        });
    },
    methods:{
        switchButton:function(item){
            item.value=!item.value;
            serverBus.fire(item.method);
        },
        forceSwitchButton:function(item,bool){
            item.value=bool;
        },
        showTransportAll:function(){
            if(!this.transportAll){
              this.transportAll=true;
              for(var item of this.buttonTransport){
                this.forceSwitchButton(item,true);
                serverBus.fire(item.method);
              }
            }else{
              this.transportAll=false;
              for(var item of this.buttonTransport){
                item.value=false;
              }
            }
        },
        showMedicAll:function(){
            if(!this.medicAll){
              this.medicAll=true;
              for(var item of this.buttonMedic){
                this.forceSwitchButton(item,true);
                serverBus.fire(item.method);
              }
            }else{
              this.medicAll=false;
              for(var item of this.buttonMedic){
                item.value=false;
              }
            }
        },
        showKidsAll:function(){
            if(!this.kidsAll){
              this.kidsAll=true;
              for(var item of this.buttonKids){
                this.forceSwitchButton(item,true);
                serverBus.fire(item.method);
              }
            }else{
              this.kidsAll=false;
              for(var item of this.buttonKids){
                item.value=false;
              }
            }
        },
        showEverydayAll:function(){
            if(!this.everydayAll){
              this.everydayAll=true;
              for(var item of this.buttonEveryday){
                this.forceSwitchButton(item,true);
                serverBus.fire(item.method);
              }
            }else{
              this.everydayAll=false;
              for(var item of this.buttonEveryday){
                item.value=false;
              }
            }
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