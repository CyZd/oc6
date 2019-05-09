<template>
<div>

        <div v-if="catOne.length!=0" class="container">
            <article class="message is-primary" :class="accordionClasses">
                <div class="message-header" @click="toggleAccordion">
                    <p>{{catOneName}}</p>
                </div>
                    <div v-for="item in catOne" class="message-body"
                    @mouseover="hoverAlert(item.options.uniqueId,true)" 
                    @mouseleave="hoverAlert(item.options.uniqueId,false)"
                    :class="{active: hover && itemRef==item.options.uniqueId}"
                    > 
                        <nav class="level" :class="accordionClasses">
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses">nom</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.first}}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses"> 
                                    <p class="heading" :class="accordionClasses">distance</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.fourth}} mètres de vous</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses"></p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.second}}</p>
                                </div>
                            </div>
                        </nav>
                    </div>

            </article>
        </div>

        <div v-if="catTwo.length!=0" class="container">
            <article class="message is-primary" :class="accordionClasses">
                <div class="message-header" @click="toggleAccordion">
                    <p>{{catTwoName}}</p>
                </div>
                    <div v-for="item in catTwo" class="message-body"
                    @mouseover="hoverAlert(item.options.uniqueId,true)" 
                    @mouseleave="hoverAlert(item.options.uniqueId,false)"
                    :class="{active: hover && itemRef==item.options.uniqueId}"
                    > 
                        <nav class="level" :class="accordionClasses">
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses">nom</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.first}}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses"> 
                                    <p class="heading" :class="accordionClasses">distance</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.fourth}} mètres de vous</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses"></p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.second}}</p>
                                </div>
                            </div>
                        </nav>
                    </div>

            </article>
        </div>

        <div v-if="catThree.length!=0" class="container">
            <article class="message is-primary" :class="accordionClasses">
                <div class="message-header" @click="toggleAccordion">
                    <p>{{catThreeName}}</p>
                </div>
                    <div v-for="item in catThree" class="message-body"
                    @mouseover="hoverAlert(item.options.uniqueId,true)" 
                    @mouseleave="hoverAlert(item.options.uniqueId,false)"
                    :class="{active: hover && itemRef==item.options.uniqueId}"
                    > 
                        <nav class="level" :class="accordionClasses">
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses">nom</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.first}}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses"> 
                                    <p class="heading" :class="accordionClasses">distance</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.fourth}} mètres de vous</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses"></p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.second}}</p>
                                </div>
                            </div>
                        </nav>
                    </div>

            </article>
        </div>

        <div v-if="catFour.length!=0" class="container">
            <article class="message is-primary" :class="accordionClasses">
                <div class="message-header" @click="toggleAccordion">
                    <p>{{catFourName}}</p>
                </div>
                    <div v-for="item in catFour" class="message-body"
                    @mouseover="hoverAlert(item.options.uniqueId,true)" 
                    @mouseleave="hoverAlert(item.options.uniqueId,false)"
                    :class="{active: hover && itemRef==item.options.uniqueId}"
                    > 
                        <nav class="level" :class="accordionClasses">
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses">nom</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.first}}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses"> 
                                    <p class="heading" :class="accordionClasses">distance</p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.fourth}} mètres de vous</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered" :class="accordionClasses">
                                <div :class="accordionClasses">
                                    <p class="heading" :class="accordionClasses"></p>
                                    <p class="subtitle" :class="accordionClasses">{{item.options.second}}</p>
                                </div>
                            </div>
                        </nav>
                    </div>

            </article>
        </div>
</div>

    
</template>

<script>


export default {
    mounted(){
        serverBus.listen('updatePannel',(results)=>{
            this.results=results;
            this.showGroupResults(this.group,this.results);
            this.getCatNames();
        });
        serverBus.listen('changeGroup',(group)=>{
            this.group=group;
            this.showGroupResults(this.group,this.results);
            this.getCatNames();
        });
    },
    methods:{
        showGroupResults:function(group,results){
            this.toShow=null;
            if(results!=null){
                switch(group){
                    case 0:
                        var filterTheme=results.filter(element=>element.options.theme=="Transport");
                        this.toShow=filterTheme.filter(element=>element.options.visible==true);
                        this.catOne=this.toShow.filter(element=>element.options.optionName=="Stations Velib");
                        this.catTwo=this.toShow.filter(element=>element.options.optionName=="Véhicules électriques");
                        this.catThree=this.toShow.filter(element=>element.options.optionName=="Stationnement");
                        this.catFour=this.toShow.filter(element=>element.options.optionName=="Bus RATP");
                        this.getCatNames();
                        break;
                    case 1:
                        var filterTheme=results.filter(element=>element.options.theme=="Santé");
                        this.toShow=filterTheme.filter(element=>element.options.visible==true);
                        this.catOne=this.toShow.filter(element=>element.options.optionName=="Médecins");
                        this.catTwo=this.toShow.filter(element=>element.options.optionName=="Pharmacies");
                        this.catThree=this.toShow.filter(element=>element.options.optionName=="Centres de soin");
                        this.getCatNames();
                        break;
                    case 2:
                        var filterTheme=results.filter(element=>element.options.theme=="Enfance");
                        this.toShow=filterTheme.filter(element=>element.options.visible==true);
                        this.catOne=this.toShow.filter(element=>element.options.optionName=="Crèches");
                        this.catTwo=this.toShow.filter(element=>element.options.optionName=="Ecoles");
                        this.getCatNames();
                        break;
                    case 3:
                        var filterTheme=results.filter(element=>element.options.theme=="Quotidien");
                        this.toShow=filterTheme.filter(element=>element.options.visible==true);
                        this.catOne=this.toShow.filter(element=>element.options.optionName=="Commerces");
                        this.catTwo=this.toShow.filter(element=>element.options.optionName=="Restaurants");
                        this.catThree=this.toShow.filter(element=>element.options.optionName=="Action sociale");
                        this.catFour=this.toShow.filter(element=>element.options.optionName=="Sport et Culture");
                        this.getCatNames();
                        break;
                }
            }

        },
        hoverAlert:function(uniqueId,boolean){
            this.hover=boolean;
            this.itemRef=uniqueId;
            serverBus.fire('hoverAlert',[uniqueId,boolean]);
        },
        toggleAccordion:function(){
            this.isOpen=!this.isOpen;
        },
        getCatNames:function(){
            this.catOne.length!=0 ? this.catOneName=this.catOne[0].options.optionName : null;
            this.catTwo.length!=0 ? this.catTwoName=this.catTwo[0].options.optionName : null;
            this.catThree.length!=0 ? this.catThreeName=this.catThree[0].options.optionName : null;
            this.catFour.length!=0 ? this.catFourName=this.catFour[0].options.optionName : null;
        }
    },
    data(){
        return{
            toShow:null,
            results:null,
            group:0,
            hover:false,
            itemRef:null,
            catOne:null,
            catOneName:null,
            catTwo:null,
            catTwoName:null,
            catThree:null,
            catThreeName:null,
            catFour:null,
            catFourName:null,
            isOpen:true,
        }
    },
    computed:{
        accordionClasses:function(){
            return{
                'is-closed':!this.isOpen,
                'is-primary':this.isOpen,
            };
        }
    }
}
</script>

<style>


.infopannel{
    border-style:solid;
    border-width:1px;
    margin:3px!important;
}

.message-body.active{
    background-color:hsl(171, 100%, 41%)!important;
}

.message-header{
    cursor: pointer;
}

.message-body{
    transition: 0.3s ease all;
}

.div{
    transition: 0.3s ease all;
}

.is-closed div.message-body .level div.level-item div p{
    max-height: 0!important;
    padding: 0!important;
}

.is-closed article.message{
    height: 0 !important;
}

.message.is-primary{
    padding:1px !important;
}

div.level-item.has-text-centered.is-closed{
    height: 0 !important;
    display:none;
}

.message-body{
    padding: 0!important;
}
</style>