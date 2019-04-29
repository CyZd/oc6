<template>
<div v-for="item in items" class="container is-fluid"> 
    <nav class="level is-mobile">
        <div class="level-item has-text-centered">
            <div>
            <p class="heading"></p>
            <p class="title">3,456</p>
            </div>
        </div>
    </nav>
</div>
    
</template>

<script>
export default {
    mounted(){
        serverBus.listen('treatResult',(data)=>{
            
        })
    },
    methods:{
        
    },
    data(){
        return{
            items:null,
        }
    },
}
</script>