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
    left:30%!important;
    right:30%!important;
    z-index:1600 !important;
}

@media screen and (max-width: 800px) {
    .messageStack{
        position:absolute!important;
        top:45% !important;
        left:10%!important;
        right:10%!important;
        margin-left:auto!important;
        margin-right:auto!important;
        z-index:1600 !important;
    }
}

@media screen and (max-width: 400px) {
    .messageStack{
        position:absolute!important;
        top:45% !important;
        left:0.5%!important;
        z-index:1600 !important;
    }
}
</style>