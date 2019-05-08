<template>
<div>
        <div v-for="item in toShow" class="container is-fluid infopannel"> 
            <nav class="level is-mobile" 
            @mouseover="hoverAlert(item.options.uniqueId,true)" 
            @mouseleave="hoverAlert(item.options.uniqueId,false)"
            :class="{active: hover && itemRef==item.options.uniqueId}">
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading">nom</p>
                    <p class="subtitle">{{item.options.first}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading">distance</p>
                    <p class="subtitle">{{item.options.fourth}} mètres de vous</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                    <p class="heading"></p>
                    <p class="subtitle">{{item.options.second}}</p>
                    </div>
                </div>
            </nav>
        </div>

            <!-- <div v-for="item in items" class="dropdown container is-fluid">
            <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" :aria-controls="item.options.fourth">
                    <span>{{item.options.fourth}}</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
            </div>
            <div class="dropdown-menu" :id="item.options.fourth" role="menu">
                <div class="dropdown-content">
                    <nav class="level is-mobile">
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="heading">nom</p>
                            <p class="subtitle">{{item.options.first}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="heading">distance</p>
                            <p class="subtitle">{{item.options.fourth}}</p>
                            </div>
                        </div>
                        <div class="level-item has-text-centered">
                            <div>
                            <p class="heading"></p>
                            <p class="subtitle">{{item.options.second}}</p>
                            </div>
                        </div>
                    </nav>
                </div>
            </div> 
        </div> -->
</div>

    
</template>

<script>
export default {
    mounted(){
        serverBus.listen('updatePannel',(results)=>{
            this.results=results;
            this.showGroupResults(this.group,this.results);
        });
        serverBus.listen('changeGroup',(group)=>{
            this.group=group;
            this.showGroupResults(this.group,this.results);
        });

    },
    methods:{
        showGroupResults:function(group,results){
            this.toShow=null;
            switch(group){
                case 0:
                    var filterTheme=results.filter(element=>element.options.theme=="Transport");
                    this.toShow=filterTheme.filter(element=>element.options.visible==true);
                    break;
                case 1:
                    var filterTheme=results.filter(element=>element.options.theme=="Santé");
                    this.toShow=filterTheme.filter(element=>element.options.visible==true);
                    break;
                case 2:
                    var filterTheme=results.filter(element=>element.options.theme=="Enfance");
                    this.toShow=filterTheme.filter(element=>element.options.visible==true);
                    break;
                case 3:
                    var filterTheme=results.filter(element=>element.options.theme=="Quotidien");
                    this.toShow=filterTheme.filter(element=>element.options.visible==true);
                    break;
            }
        },
        hoverAlert:function(uniqueId,boolean){
            this.hover=boolean;
            this.itemRef=uniqueId;
            serverBus.fire('hoverAlert',uniqueId);
        }
    },
    data(){
        return{
            toShow:null,
            results:null,
            group:0,
            hover:false,
            itemRef:null,
        }
    },
}
</script>

<style>
.infopannel{
    border-style:solid;
    border-width:1px;
    margin:3px!important;
}

.level.active{
    background-color:green!important;
}
</style>