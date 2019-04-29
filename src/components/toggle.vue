<template>
<toggle-button :value="false"
               color="#82C7EB"
               :sync="true"
               :labels="true"/>

<toggle-button :value="false"
               color="#82C7EB"
               :sync="true"
               :labels="true"/>
</template>

<script>
import { ToggleButton } from 'vue-js-toggle-button'

Vue.component('ToggleButton', ToggleButton)
</script>

<style>

</style>