<template>
     <div class="page404">
          <img class="mb-2" src="http://127.0.0.1:83/img/background/404.png" alt="">
          <!-- <a href="javascript:history.go(-1);" class="returnTop">返回</a> -->
       <p> <Button text-color="yellow" @click='history.go(-1)' class="returnTop">返回</Button></p>

     </div>  
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        methods:{

        },

    }
</script>
<style>
     .page404{
        width: 100%;
        height: 100%;
        text-align: center;
        overflow: hidden;
    }
    .page404 img{
        width: 580px;
        height: 580px;
        margin-top: 200px;
    }
    @media screen and (max-width:375px){
        .page404 img{
        width: 300px;
        height: 300px;
        margin-top: 100px;

    }
}

@media screen and (min-width:375px) and (max-width:768px){
    .page404 img{
        width: 300px;
        height: 350px;
        margin-top: 200px;
    }
}

@media screen and (min-width:768px) and (max-width:1200px){
    .page404 img{
        width: 580px;
        height: 580px;
        margin-top: 200px;
    }
}


</style>
<body>

</style>