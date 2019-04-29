<template>
    <div class="container is-fluid" id="myMap">
    </div>
</template>

<script>

// import { serverBus } from '../main.js';
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import VueFlashMessage from 'vue-flash-message';

export default{
    mounted(){
        this.initMap();
        this.initLayers();
        this.getPos();
        serverBus.listen('changeCircleRange',(distance)=>{
            this.redrawCircleMap(distance);
        });
        serverBus.listen('showTransportAll',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'xy','name','capacity','dist','Transport','Tout les transport'),
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=bornes-de-recharge-pour-vehicules-electriques&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','adresse_rue','tarif_general','dist','Transport','Tout les transport')
        });
        serverBus.listen('showTransportTwo',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'xy','name','capacity','dist','Transport','Stations Velib')
        });
        serverBus.listen('showTransportThree',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=bornes-de-recharge-pour-vehicules-electriques&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','adresse_rue','tarif_general','dist','Transport','Bornes électriques')
        });
        serverBus.listen('noResult',(optionName)=>{
            this.messageAlert(optionName);
        });
        serverBus.listen('treatResult',(data)=>{
            console.log(data);
            var pointsTable=[];
            for(var keys of data[0]){
                var newPoint=this.createPoint(keys.fields,data[1],data[2],data[3],data[4],data[5]);
                pointsTable.push(newPoint); 
            };

            // data.forEach(element => {
            //     console.log(element);
            //     var newPoint=this.createPoint(element.fields,firstParam,secondParam,thirdParam,fourthParam);
            //     pointsTable.push(newPoint);
            // });
            this.saveResult(data[5], Date.now(),pointsTable);
            this.pushToLayer(this.globalResults,data[5],data[1],data[2],data[3],data[4]);
            serverBus.fire('updateMap',this.globalPoints);
        });
        serverBus.listen('updateMap',(table)=>{
            this.layerGroup.clearLayers();
            var update=table.filter(element=>element.options.visible==true);
            this.layerGroup=L.layerGroup(update).addTo(this.map);
        })

    },
    created(){
        serverBus.listen('copyingMap',(myMap)=>{
            this.myMap=myMap;
        });
        serverBus.listen('changeCircleRange',(distance)=>{
            this.redrawCircleMap(distance);
        });
    },
    methods:{
        initMap(){
            let lat = 51.505, long = -0.03;

            const myMap=L.map('myMap').locate({setView: true, maxZoom: 16});
            //myMap.dragging.disable();
            //myMap.touchZoom.disable();
            //myMap.doubleClickZoom.disable();
            //myMap.scrollWheelZoom.disable();
            //myMap.boxZoom.disable();
            //myMap.keyboard.disable();
            //if (map.tap) map.tap.disable();
            
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                        // data origin
                        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                        minZoom: 1,
                        maxZoom: 20
                    }).addTo(myMap);
            L.control.scale().addTo(myMap);
            myMap.on('locationfound',function(e){
                this.currentPos=e.latlng;
                console.log("Position fixed");
                serverBus.fire('locationFound',e.latlng);
                serverBus.fire('copyingMap',myMap);
                serverBus.fire('changeCircleRange',250);
                console.log(this.currentPos);
                L.marker(e.latlng).addTo(myMap);
            });
            myMap.on('onLocationError',function(e){
                console.log("Localisation impossible");
            });
            this.map=myMap;
        },
        getPos(){
            serverBus.listen('locationFound',(coordinates)=>{
            this.currentPos=coordinates;
            });
        },
        initLayers(){
            this.layerGroup=L.layerGroup();
            this.circleGroup=L.layerGroup();
        },
        apiCall(url,firstParam,secondParam,thirdParam,fourthParam,themeName,optionName){
            var tempTable=null;
            var requestAlreadyExist=this.checkResultExists(url);
            if(requestAlreadyExist){
                switchData(this.globalPoints,url);
                updateMap(this.globalPoints);
            }else{
                console.log('calling API');
                this.ajaxGet(url,function(response){
                    console.log("API responded");
                    //turn the response in a json object
                    var results=JSON.parse(response);
                    if(results.nhits==0){
                        console.log("no result found for "+url);
                        serverBus.fire('noResult',optionName);
                        return;
                    }else{
                        serverBus.firePoints('treatResult',results.records,firstParam,secondParam,thirdParam,fourthParam,url);
                    }                                  
                })
                
            }
        },
        checkResultExists(url,position){
            var result=this.findByName(this.globalResults,'name',url);
            if(result==null){
                console.log("request never made.");
                return false;
            }else if(((Date.now()-result.date)/1000)/3600>6){
                console.log("request is too old.");
                return false;
            }else{
                console.log("request already made.");
                return true;
            }
        },
        findByName(array, key,value){
            for (var i=0;i<array.length;i++){
                if(array[i][key]==value){
                    return array[i];
                }
            }
            return null;
        },
        ajaxGet(url, callback){
            var request= new XMLHttpRequest();
            request.open('GET',url);
            request.addEventListener("load",function(){
                if(request.status >= 200 && request.status<400){
                    callback(request.responseText);
                }else{
                    console.error(request.status+" "+request.statusText+" "+url);
                }
            });
            request.addEventListener("error",function(){
                console.error("Erreur de connexion à cette adresse:" +URLSearchParams);
            });
            request.send(null);
        },
        saveResult(url,date,table){
            var queryResults={};
            queryResults.name=url;
            queryResults.date=date;
            queryResults.points=table;
            queryResults.layer=null;
            this.globalResults.push(queryResults);
        },
        pushToLayer(globalResults,url,firstParam,secondParam,thirdParam,fourthParam){
            var result=this.findByName(this.globalResults,'name',url);
            for(var point of result.points){
                this.globalPoints.push(L.marker(point[firstParam],{uniqueID: url, visible:true}).bindPopup(point[secondParam]+"<br>"+point[thirdParam]+"<br>"+point[fourthParam]));
            }
        },
        updateMap(table){
            this.layerGroup.clearLayers();
            var update=table.filter(element=>element.options.visible==true);
            this.layerGroup=L.layerGroup(update).addTo(this.myMap);
        },
        redrawCircleMap:function(distance){
            this.circleGroup.clearLayers();
            var newCircle=L.circle(this.currentPos,distance);
            this.circleGroup=L.layerGroup([newCircle]).addTo(this.myMap);
            this.myMap.fitBounds(newCircle.getBounds());
        },
        messageAlert(optionName){
            this.flashError('Pas de résultat pour cette recherche :'+optionName);
        },
        createPoint(data,firstParam,secondParam,thirdParam,fourthParam){
            var newPoint={};
            console.log(data);
            if(data.hasOwnProperty(firstParam)){
                newPoint[firstParam]=data[firstParam]
            };
            if(data.hasOwnProperty(secondParam)){
                newPoint[secondParam]=data[secondParam]
            };
            if(data.hasOwnProperty(thirdParam)){
                newPoint[thirdParam]=data[thirdParam]
            };
            if(data.hasOwnProperty(fourthParam)){
                newPoint[fourthParam]=data[fourthParam]
            };
            return newPoint;
        }
    },
    data(){
        return{
            globalResults:[],
            globalPoints:[],
            map:null,
            layerGroup:null,
            circleGroup:null,
            distance:null,
            currentPos:1,
        }
    },
    components:{
        LMap,
        LTileLayer,
        LMarker,
        VueFlashMessage
    }
}

</script>

<style>
#myMap{
        height: 60vh;
        margin-top:80px;
    }
</style>

