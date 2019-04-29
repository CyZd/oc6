<template>
    <div>
        <div class="container is-fluid" id="map">
                    <!--map shows here-->
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            myMap,
            currentPos,
        }
    },
    methods:{
        initMap:function(){
            this.myMap=L.map('map').locate({setView: true, maxZoom: 16});
            L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                    // data origin
                    attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                    minZoom: 1,
                    maxZoom: 20
                }).addTo(myMap);
            L.control.scale().addTo(myMap);
            myMap.on('locationfound',onLocationFound);
            myMap.on('onLocationError',onLocationError)
        },
        onLocationFound:function(e){
            this.currentPos=e.latlng;

            L.marker(e.latlng).addTo(this.myMap);

        
            console.log("Position fixed");
            console.log(currentPos);
        },
        onLocationError:function(e){
            console.log("Localisation impossible");
        }
    },
    mounted:function(){
        initMap()
    }
}


</script>


<style>
#map{
    height: 600px;
    margin-top:80px;
}

#buttonPannel{
    margin-top:20px;
}

html{
    background-color: grey;
}
</style>