<template>
<div>
    <div v-for="item in messageStack" class="notification is-primary">
        {{item.message}}{{item.info}}
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            messageStack:[],
        }
    },
    created(){
        
    },
    mounted(){
        serverBus.listen('alertMessage',(data)=>{
            var newMessage={};
            newMessage.message=data[0];
            newMessage.info=data[1];
            this.messageStack.push(newMessage);
            setTimeout(() => {
                this.messageStack.shift();
            }, 800);
        });
    },
    methods:{

    }
}
</script>

<style>

</style>