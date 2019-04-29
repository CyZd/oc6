<template>
    <toggle-button :value="false"
               color={{color}}
               sync="true"
               labels={{labels}}
               switch-color={{colors}}
               v-on:click="{{action}}"/>
</template>

<script>
export default{
    data(){

    },
    props:{
        color: String,
        labels: Object,
        switchColor: Object,
        action:Function
    }
}
</script>