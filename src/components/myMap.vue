<template>
    <div class="container is-fluid" id="myMap">
    </div>
</template>

<script>

// import { serverBus } from '../main.js';
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import VueFlashMessage from 'vue-flash-message';
import { OpenStreetMapProvider,GeoSearchControl } from 'leaflet-geosearch';


export default{
    mounted(){
        this.initMap();
        this.initLayers();
        this.getPos();
        this.launchAdress();
        serverBus.listen('changeCircleRange',(distance)=>{
            this.redrawCircleMap(distance);
        });
        serverBus.listen('showTransportAll',()=>{    
            
        });
        serverBus.listen('showTransportVelib',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'xy','name','capacity','dist','Transport','Stations Velib')
        });
        serverBus.listen('showTransportElectriccar',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=bornes-de-recharge-pour-vehicules-electriques&rows="+10+"&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','adresse_rue','tarif_general','dist','Transport','Bornes électriques')
        });
        serverBus.listen('showTransportParking',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=stationnement-voie-publique-emplacements&facet=regpri&facet=regpar&facet=typsta&facet=arrond&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','nomvoie','tar','dist','Transport','Stationnement')
        });
        serverBus.listen('showTransportMetro',()=>{    
            this.apiCall("https://dataratp.opendatasoft.com/api/records/1.0/search/?dataset=positions-geographiques-des-stations-du-reseau-ratp&facet=stop_name&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'stop_coordinates','stop_name','stop_desc','dist','Transport','Metro')
        });
        serverBus.listen('showMedicAll',()=>{    
            
        });
        serverBus.listen('showMedicMedecin',()=>{    
            this.apiCall("https://public.opendatasoft.com/api/records/1.0/search/?dataset=donnees-sur-les-medecins-accredites&facet=libelle_long_de_la_specialite_du_medecin&facet=date_d_accreditation_du_medecin&facet=nom_du_departement&facet=statut_d_exercice&facet=nom_region&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geom_x_y','nom_du_medecin','libelle_long_de_la_specialite_du_medecin','dist','Santé','Medecins')
        });
        serverBus.listen('showMedicPharmacies',()=>{    
            this.apiCall("https://data.iledefrance.fr/api/records/1.0/search/?dataset=carte-des-pharmacies-dile-de-france&facet=libdepartement&facet=commune&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'wgs84','rs','telephone','dist','Santé','Pharmacies')
        });
        serverBus.listen('showMedicCentresSante',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=consultations_des_centres_de_sante&facet=nom_de_lactivite&facet=specialite&facet=adresse_code_postal&facet=adresse_ville&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','c_rs','c_adresse','dist','Santé','Centres de soin')
        });
        serverBus.listen('showKidsAll',()=>{    
            
        });
        serverBus.listen('showKidsCreches',()=>{    
            this.apiCall("https://public.opendatasoft.com/api/records/1.0/search/?dataset=equipement-ponctuel-petite-enfance&facet=l_ep_maj&facet=l_ep_min&facet=c_suf1&facet=c_liaison&facet=l_voie&facet=b_public&facet=d_annee_cr&facet=lib_ql1&facet=val_qn1&facet=n_sq_ee&geofilter.distance="+this.currentPos.lat+'%2C'+this.currentPos.lng+'%2C'+1500,'geo_point_2d','l_ep_maj','','dist','Enfance','Crèches')
        });
        serverBus.listen('showKidsSchool',()=>{    
            this.apiCall("https://opendata.paris.fr/api/records/1.0/search/?dataset=etablissements-scolaires&rows=20&facet=id_projet&facet=arr_libelle&facet=arr_insee",'geo_point_2d','adresse','arr_libelle','dist','Enfance','Ecoles')
        });
        serverBus.listen('treatResult',(data)=>{
            var pointsTable=[];
            var filtered=[];
            for(var keys of data[0]){
                
                var newPoint=this.createPoint(keys.fields,data[1],data[2],data[3],data[4],data[5],data[6],data[7]);
                pointsTable.push(newPoint); 
            };
            
            filtered.push(pointsTable[0]);
            for(var i=1;i<pointsTable.length;i++){
                if(pointsTable[i].dist!=pointsTable[i-1].dist){
                    filtered.push(pointsTable[i]);
                }
            }
            
            
            // this.saveResult(data[5], Date.now(),pointsTable,data[6],data[7]);
            this.saveResult(data[5], Date.now(),filtered,data[6],data[7]);
            this.pushToLayer(this.globalResults,data[5],data[1],data[2],data[3],data[4],data[6],data[7]);
            serverBus.fire('updateMap',this.globalPoints);
            serverBus.fire('updatePannel',this.globalPoints);
        });
        serverBus.listen('updateMap',(table)=>{
            this.layerGroup.clearLayers();
            var update=table.filter(element=>element.options.visible==true);
            this.layerGroup=L.layerGroup(update).addTo(this.map);
        });
        serverBus.listen('changeGroup',(data)=>{
            console.log("location mode changed");
            this.locateChoice=data;
        });

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
            const myMap=L.map('myMap');
            myMap.locate({setView: true, maxZoom: 16});

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
                serverBus.fire('alertMessage',['Vous êtes localisé aux coordonnées: ', e.latlng]);
                L.marker(e.latlng).addTo(myMap);
            });
            myMap.on('onLocationError',function(e){
                serverBus.fire('alertMessage',['Nous ne pouvons pas vous localiser',]);
            });
            myMap.on('geosearch/showlocation', function(e){
                this.currentPos.lat=e.location.bounds[0][0];
                this.currentPos.lng=e.location.bounds[0][1];
                L.marker(this.currentPos).addTo(myMap);
                serverBus.fire('changeCircleRange',250);
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
            var requestAlreadyExist=this.checkResultExists(url);
            var pointsAlreadyDrawn=this.checkPointsDrawn(this.globalPoints,url);
            if(requestAlreadyExist && pointsAlreadyDrawn){
                console.log("point exists and drawn");
                this.switchData(this.globalPoints,url,false);
                this.updateMap(this.globalPoints);
                
            }else if(requestAlreadyExist){
                console.log("points exist but not shown")
                this.switchData(this.globalPoints,url,true);
                this.updateMap(this.globalPoints);
            }
            else{
                this.ajaxGet(url,function(response){
                    console.log("API responded");
                    //turn the response in a json object
                    var results=JSON.parse(response);
                    if(results.nhits==0){
                        serverBus.fire('alertMessage',['Aucun résultat pour la recherche: ',optionName]);
                        return;
                    }else{
                        serverBus.firePoints('treatResult',results.records,firstParam,secondParam,thirdParam,fourthParam,url,themeName,optionName);
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
        checkPointsDrawn(table,url){
            for(var items of table){
                if(items.options.request==url && items.options.visible==true){
                    return true;
                }
            }
        },
        switchData(table,url,boolChoice){
            for(var items of table){
                if(items.options.request == url){
                    items.options.visible=boolChoice;
                }
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
                serverBus.fire('alertMessage',['Erreur de connexion à l\'API: ', URLSearchParams]);
            });
            request.send(null);
        },
        saveResult(url,date,table,themeName,optionName){
            var queryResults={};
            queryResults.name=url;
            queryResults.themeName=themeName;
            queryResults.optionName=optionName;
            queryResults.date=date;
            queryResults.points=table;
            queryResults.layer=null;
            this.globalResults.push(queryResults);
        },
        pushToLayer(globalResults,url,firstParam,secondParam,thirdParam,fourthParam,fithParam,sixthParam){
            var result=this.findByName(this.globalResults,'name',url);
            for(var point of result.points){
                var uniqueId=Math.floor(Math.random()*1000000000);
                this.globalPoints.push(L.marker(point[firstParam],{request: url, first:point[secondParam],second:point[secondParam],third:point[thirdParam],fourth:point[fourthParam],uniqueId: uniqueId,visible:true, theme:point[fithParam],optionName:point[sixthParam]}).bindPopup(point[secondParam]+"<br>"+point[thirdParam]+"<br>"+point[fourthParam]));
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
        createPoint(data,firstParam,secondParam,thirdParam,fourthParam,fithParam,sixthParam,seventhParam){
            var newPoint={};
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
            if(data.hasOwnProperty(fithParam)){
                newPoint[fithParam]=data[fithParam]
            };
            newPoint[sixthParam]=sixthParam;
            newPoint[seventhParam]=seventhParam;

            // if(data.hasOwnProperty(fithParam)){
            //     newPoint[fithParam]=data[fithParam]
            // };
            // if(data.hasOwnProperty(sixthParam)){
            //     newPoint[sixthParam]=data[sixthParam]
            // };
            return newPoint;
        },
        launchAdress(){
            const searchControl=new GeoSearchControl({
                    provider:this.provider,
                    showMarker:false,
                    retainZoomLevel:true,
                    autoClose:true,
                    keepResult:true,
                    searchLabel: 'Entez une adresse',
                });
            this.map.addControl(searchControl);
        },
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
            locateChoice:'GPS',
            provider:new OpenStreetMapProvider()
        }
    },
    components:{
        LMap,
        LTileLayer,
        LMarker
    }
}

</script>

<style>
#myMap{
        height: 60vh;
        margin-top:80px;
    }

.leaflet-control-geosearch{
    background-color:white !important;
}
</style>

