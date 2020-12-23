<template>
  <div class="testTracking">
    <video id="video" width="318" height="270" preload autoplay loop muted></video>
    <canvas id="canvas" width="318" height="270"></canvas>
    <img :src="dataUrl" alt="" id="img1">
    <div class="buttonDiv">
      <button type="button" @click="submit">上传照片</button>
      <button type="button" name="button" @click="openCamera">点击我拍照</button>
    </div>
  </div>
</template>

<script>
/*require('tracking/build/tracking-min.js')
require('tracking/build/data/face-min.js')
require('tracking/build/data/mouth-min.js')
require('tracking/examples/assets/stats.min.js')*/


require('../assets/js/tracking-min');
require('../assets/js/face-min.js');
require('../assets/js/dat.gui.min.js');
require('../assets/js/stats.min');

export default {
  name: 'testTracking',
  data () {
    return {
      dataUrl: '',
      lalala: null,
      x:0,
      y:0,
      h:0,
      w:0,
    }
  },
  mounted () {
    this.openCamera()
  },
  methods: {
    openCamera () {

      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      let vm = this;
      var imgData;

      var tracker = new tracking.ObjectTracker('face');
      this.lalala = tracker;
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      this.trackerTask = tracking.track('#video', tracker, {camera: true});

      tracker.on('track', function(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function(rect) {
          if(event.data.length >0){
            /*ontext.font = '11px Helvetica';
         context.fillText("已识别到人脸，请点击拍照", 100, 40);
         context.strokeStyle = '#a64ceb';
         context.strokeRect(rect.x, rect.y, rect.width, rect.height);*/

            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);

            vm.x=  rect.x;
            vm.y= rect.y;
            vm.w= rect.width ;
            vm.h=  rect.height ;
          }
        });
      });

    },
    submit () {
      let that = this
      let dd = {}
      /*this.lalala.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        event.data.forEach(function(rect) {
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          context.font = '11px Helvetica';
          context.fillStyle = "#fff";
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });
      });*/
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      let video = document.getElementById('video')

      setTimeout(function () {
        let w = dd.x + dd.width
        let y = dd.y + dd.height
        // context.drawImage(video, dd.x, dd.y, dd.width, dd.height)
        // context.drawImage(video, 88, 26, 176, 176)
        // context.drawImage(video, 0, 0, 176, 176)
        // context.drawImage(video, 0, 0, 500, 400)
        // context.drawImage(video, 0, 0, w, y)

        context.drawImage(video, (that.x + that.w), (that.y + that.h), (that.x + that.w), (that.y + that.h),(that.x), that.y,(that.w ), (that.h));
        let dataUrl = canvas.toDataURL('image/png');
        console.log(dataUrl)
        that.dataUrl = dataUrl;

        /*canvas.toBlob((blob) => {
               axios.post({faceUrl: URL.createObjectURL(blob)})
                 .then((res) => {
                   console.log('上传成功')
                 })
             })*/
      }, 1000)
    }
  }
  /*destroyed () {
    // 停止侦测
    this.trackerTask.stop()
    // 关闭摄像头
    this.trackerTask.closeCamera()
  }*/
}

</script>

<style lang="less" scoped>
.testTracking {
  height: 100vh;
  width: 100%;
  position: relative;

  > * {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }

  > img {
    bottom: 124px;
  }

  video, canvas {
    top: 0;
  }
 canvas{
   position: absolute;
   z-index: 22;
 }
  .buttonDiv {
    bottom: 10px;
  }
  #img1{
    position: absolute;
    z-index: 33;
  }
}

</style>



