<template>
<div>
    <div class="container is-fluid" id="sliderContainer">
        <label for="distance"><h3>Distance</h3></label>
        <input id="distSlider" v-on:click="getRangeValue" name="distance" class="slider is-fullwidth is-info is-medium is-circle" step="100" min="100" max="300" value="100" type="range">
        <label v-if="value==100">250 mètres</label>
        <label v-else-if="value==200">500 mètres</label>
        <label v-else-if="value==300">1 500 mètres</label>
    </div>

    <div class="field" v-show="group==0">
          <toggle-button @change="showTransportAll"
          id="switchTransport"
          :sync="true"
          :value="this.transportAll"
          :width="120"
          :height="40"
          color="#f5c421"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonTransport">
          <toggle-button @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#f5c421"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==1">
        <toggle-button @change="showMedicAll"
          id="switchMedic"
          :sync="true"
          :value="this.medicAll"
          :width="120"
          :height="40"
          color="#32cd32"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonMedic">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#32cd32"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==2">
        <toggle-button @change="showKidsAll"
          id="switchKids"
          :sync="true"
          :value="this.kidsAll"
          :width="120"
          :height="40"
          color="#f60cd2"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonKids">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="true"
          :value="item.value"
          :width="120"
          :height="40"
          color="#f60cd2"
          :labels="{checked: item.labels, unchecked: item.labels}"
          />
        </span>
    </div>

    <div class="field" v-show="group==3">
        <toggle-button @change="showEverydayAll"
          id="switchEvery"
          :sync="true"
          :value="this.everydayAll"
          :width="120"
          :height="40"
          color="#f60c34"
          :labels="{checked: 'Tout masquer', unchecked: 'Tout afficher'}"
        />
        <span v-for="(item,i) in buttonEveryday">
          <toggle-button  @change="switchButton(item)"
          :id="item.name"
          :sync="false"
          :value="item.value"
          :width="120"
          :height="40"
          color="#f60c34"
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
              // {category:'Santé',name:'Medecins',value:false,color:'#BE3D62',labels:'Médecins',method:'showMedicMedecin'},
              {category:'Santé',name:'Pharmacies',value:false,color:'#BE3D62',labels:'Pharmacies',method:'showMedicPharmacies'},
              {category:'Santé',name:'Centres de soin',value:false,color:'#BE3D62',labels:'Centres de soin',method:'showMedicCentresSante'},
            ],
            buttonKids:[
              {category:'Enfance',name:'Crèches',value:false,color:'#BE3D62',labels:'Crèches',method:'showKidsCreches'},
              {category:'Enfance',name:'Ecoles',value:false,color:'#BE3D62',labels:'Ecoles',method:'showKidsSchool'},
            ],
            buttonEveryday:[
              {category:'Quotidien',name:'Commerces',value:false,color:'#BE3D62',labels:'Commerces',method:'showCommerce'},
              {category:'Quotidien',name:'Restaurants',value:false,color:'#BE3D62',labels:'Restaurants',method:'showRestaurant'},
              {category:'Quotidien',name:'Action Sociale',value:false,color:'#BE3D62',labels:'Action sociale',method:'showSocialAction'},
              {category:'Quotidien',name:'Sport',value:false,color:'#BE3D62',labels:'Sport',method:'showSport'},
              {category:'Quotidien',name:'Culture',value:false,color:'#BE3D62',labels:'Où sortir?',method:'showCulture'},
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
                }
              }
              break;
            case 'Santé':
              for(var items of this.buttonMedic){
                if(items.name==data[1]){
                  items.value=false;
                }
              }
              break;
            case 'Enfance':
              for(var items of this.buttonKids){
                if(items.name==data[1]){
                  items.value=false;
                }
              }
              break;
            case 'Quotidien':
              for(var items of this.buttonEveryday){
                if(items.name==data[1]){
                  items.value=false;
                }
              }
              break;
          }
            
        });
        serverBus.listen('setToZero',()=>{
          this.setToZero();
        })
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
            }
            else{
              this.transportAll=false;
              for(var item of this.buttonTransport){
                this.forceSwitchButton(item,false);
                item.value=false;
                serverBus.fire(item.method);
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
                this.forceSwitchButton(item,false);
                item.value=false;
                serverBus.fire(item.method);
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
                this.forceSwitchButton(item,false);
                item.value=false;
                serverBus.fire(item.method);
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
                this.forceSwitchButton(item,false);
                item.value=false;
                serverBus.fire(item.method);
              }
            }
        },
        setToZero(){
          this.transportAll=false;
          this.medicAll=false;
          this.kidsAll=false;
          this.everydayAll=false;
          for(var item of this.buttonTransport){
                this.forceSwitchButton(item,false);
                item.value=false;
          }
          for(var item of this.buttonMedic){
                this.forceSwitchButton(item,false);
                item.value=false;
          }
          for(var item of this.buttonKids){
                this.forceSwitchButton(item,false);
                item.value=false;
          }
          for(var item of this.buttonEveryday){
                this.forceSwitchButton(item,false);
                item.value=false;
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

#distSlider{
  width:80%;
  margin-left:auto;
  margin-right:auto;
}

.field{
  filter: drop-shadow(3px 1px 4px #9b9b9b);
}

#sliderContainer:hover{
  filter: drop-shadow(15px 9px 9px #9b9b9b);
}

@media screen and (max-width: 640px) {
    .span{
        height: 30px!important;
        width: 100px!important;
    }

}

@media screen and (max-width: 400px) {
    body{
      width:90%!important;
      margin-left: auto!important;
      margin-right: auto!important;
    }

}

@media screen and (max-width: 300px) {
    body{
      /* width:70%!important; */
      margin-left:auto!important;
      margin-right:auto!important;
      left:2%!important;
      right:2%!important;
    }
}

@media screen and (max-width: 250px) {
    body{
      width:80%!important;
      left: 0!important;
      margin-left:1%!important;
      margin-right:1%!important;

    }
}
</style>