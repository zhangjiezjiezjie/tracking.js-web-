<template>
  <div class="demo-frame ">
    <div class="demo-container">
      <video id="video" width="320" height="240" preload autoplay loop muted></video>
      <canvas id="canvas" width="320" height="240"></canvas>
      <canvas id="canvas3"></canvas >
      <img id="face-img"/>
<!--      <img id="face-img-short"/>-->
      <div class="buttonDiv">
        <button type="button" @click="submit">上传照片</button>
        <button type="button" name="button" @click="openCamera">点击我拍照</button>
      </div>
    </div>
  </div>
</template>

<script>
  require('../assets/js/tracking-min');
  require('../assets/js/face-min.js');
  require('../assets/js/dat.gui.min.js');
  require('../assets/js/stats.min');

 export default{

   data(){
     return{

     }
   },

   methods:{
     openCamera(){
       var video = document.getElementById('video' );
       var canvas = document.getElementById( 'canvas'); //画带人脸带边框
       var context = canvas.getContext('2d' );
       var canvas3 = document.getElementById( 'canvas3' );//显示在video和canvas1、 canvas2之上
       canvas3.width=$(".demo- container").width();
       canvas3.height=$(".demo- container").height();
       var context3 = canvas3.getContext('2d');
       var tLoop=0;
       var tLoop2=0;
       var dw= 0
       var dh= 0;
       var dVal= 0;
       var pw = $(".demo-container").width();
       var ph = $(".demo-container").height();
       var imgData;
       $("#face-img").hide();
       $("#face-img-short" ).hide();
       var tracker = new tracking.ObjectTracker('face' );
       tracker.setEdgesDensity(0.1); //设置边缘密度
       tracker.setInitialScale(4); //设置初始比例
       tracker.setStepSize(1.1);//设置步长
       tracking.track(' #video', tracker, {camera: true});

       tracker.on( 'track' , function(event){
         context.clearRect(0, 0, canvas.width, canvas.height);
         event.data.forEach(function(rect){
           // if(event.data.length>0){
               context.drawImage(document.querySelector("#video"),0 ,0, video.width, video.height);
               var canvas2=document.createElement('canvas'); //不显示
               canvas2.width=rect.width + 20;
               canvas2.height=rect.height + 20 ;
               var context2 = canvas2.getContext('2d');
               context2.drawImage(canvas ,(rect.x-10) ,(rect.y-10) ,(rect.width+20) , (rect. height+20), 0 , 0, (rect .width+20), (rect. height+20));
               imgData = canvas2.toDataURL();
              console.log('imgData===============',imgData);
               $("#face-img-short").width (rect.width) ;
               $("#face-img-short").height(rect.height);
               // $("#face-img-short").attr('src', imgData);
            // }

         context.strokeStyle = ' #C5E0B5';
         context.strokeRect((rect.x-10), (rect.y-10), (rect.width+20), (rect.height+20));
         if((ph/pw) < (240/320)){
           dh= 240*pw/320;
           dVal=(dh-ph)/2;
           context3.drawImage(canvas, 0, -dVal, pw, dh);
         } else{
           dw = 320 * ph / 240;
           dVal = (dw - pw) / 2;
           context3.drawImage(canvas, -dVal, 0, dw, ph);
         }
           imgData = canvas3.toDataURL();
           $("#face-img" ).attr('src', imgData);
           tLoop=1;
           tLoop2=1;

           if((ph/pw) < (240/320)){
             dh= 240*pw/320;
             dVal=(dh-ph)/2;
             if(tLoop2 == '1'){
               tLoop2 = 0
             } else {
               context3.drawImage(canvas, 0, -dVal, pw, dh);
             }
           } else{
             dw = 320 * ph / 240;
             dVal = (dw - pw) / 2;
             if(tLoop2 == '1'){
               tLoop2 = 0
             } else {
               context3.drawImage(canvas, -dVal, 0, dw, ph);
             }
           }

       })
    })

       var interval = setInterval(function(){
         if(tLoop=="1") {
           document.getElementById('video').srcObject.getTracks()[0].stop();
           tracker.removeAllListeners('track');
           clearInterval(interval);
           $(" #face-img").show();
           setTimeout(function () {
             if ($(" #face-img-short").eq(0).attr('src')) {
               var base64 = $(" #face- img-short").eq(0).attr('src').slice(22);
               setTimeout(facePayAjax, 1000 * 0.5);
               $("#face- img-short").hide();
             } else {
               setTimeout(function () {
                 alert("检测人脸失败，请点击人脸登陆，重新检测");
               }, 1000 * 0.4);
             }
           }, 1000 * 1);
         }
       }, 1000*3.5);
   },

   submit() {

   }
 },



 }


</script>

<style>
  .demo-frame {
    height: 100%;
    width: 100%;
    padding: 0 0 0.22rem 0;
  }
  .demo-container{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #video,canvas,#face-img{
    position: absolute;
    top: 0;
    left: 0;
  }
  #video{
    z-index: 10;
  }
  #canvas{
    z-index: 101;
  }
  #canvas3{
    z-index: 102;
  }
  #face-img{
    width: 100%;
    height: 100%;
    z-index: 103;
  }
  #face-img-short{
    z-index: -1;
  }
  .buttonDiv {
    bottom: 10px;
  }
</style>
