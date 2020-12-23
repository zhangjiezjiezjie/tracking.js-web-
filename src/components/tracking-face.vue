<template>
  <div class="testTrackingWrapper">

    <video id="video" width="340" height="300" preload autoplay loop muted></video>
    <canvas id="canvas" width="340" height="300"></canvas>
    <img :src="dataUrl">
    <div class="buttonWrapper">
      <button type="button" @click="submitPhoto">上传</button>
      <button type="button" name="button" @click="openCamera">拍照</button>
    </div>
  </div>
</template>

<script>
require('../assets/js/tracking-min');
require('../assets/js/face-min.js');
require('../assets/js/dat.gui.min.js')
require('../assets/js/stats.min')
export default {

  data () {
    return {
      dataUrl: ''
    }
  },
  methods: {
    openCamera () {
      var _this = this;
      var video = document.getElementById('video');
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      var tracker = new tracking.ObjectTracker('face');
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);

      this.trackerTask = tracking.track('#video', tracker, {camera: true});

      tracker.on('track', function (event) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        event.data.forEach(function (rect) {
          context.font = '11px Helvetica';
          context.fillText("已识别到人脸，请点击拍照", 100, 40);
          context.strokeStyle = '#a64ceb';
          context.strokeRect(rect.x, rect.y, rect.width, rect.height);

        });
      });

    },
    submitPhoto () {
      let _this = this
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      let video = document.getElementById('video')
      context.drawImage(video, 0, 0, 500, 400)
      let dataUrl = canvas.toDataURL('image/png');
      console.log(dataUrl)
      _this.dataUrl = dataUrl;
      canvas.toBlob((blob) => {
        console.log(blob, URL.createObjectURL(blob))
        // 此处写上传到后台的接口即可

      })
    }
  },
  mounted () {
    this.openCamera()
  },
  destroyed () {
    // 停止侦测
    this.trackerTask.stop()
    // 关闭摄像头
    this.trackerTask.closeCamera()
  }
}

</script>

<style scoped>
.testTrackingWrapper {
  height: 100vh;
  width: 100%;
  position: relative;
}

video, canvas {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.buttonWrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30%;
}
</style>






