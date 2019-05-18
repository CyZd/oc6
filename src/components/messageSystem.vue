<template>
<div>
    <div class="messageStack">
        <div v-for="item in messageStack" class="notification is-info">
            {{item.message}}{{item.info}}
        </div>
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
            }, 1200);
        });
    },
    methods:{

    }
}
</script>

<style>
.messageStack{
    position:absolute!important;
    top:45% !important;
    left:30%;
    z-index:1600 !important;
}
</style>