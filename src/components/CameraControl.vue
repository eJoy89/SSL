<template>
    <div>
      <video ref="videoElement" style="transform: scaleX(-1);" autoplay></video>
      <button @click="startCamera">카메라 시작</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'; 
  
  export default {
    name: "CameraControl",
    setup() {
      const videoElement = ref(null);
  
      const startCamera = () => {
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
              if (videoElement.value) {
                videoElement.value.srcObject = stream;
              }
            })
            .catch(function(error) {
              console.log("카메라 접근에 실패했습니다:", error);
            });
        } else {
          console.error("브라우저가 카메라 기능을 지원하지 않습니다.");
        }
      };
  
      return {
        videoElement,
        startCamera
      };
    }
  };
  </script>
  
  <style>
  </style>
  