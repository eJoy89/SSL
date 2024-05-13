<template>
    <div>
      <video ref="videoElement" style="transform: scaleX(-1);" autoplay></video>
      <button @click="startCamera">카메라 시작</button>
    </div>
  </template>
  
  <script>
import { ref, onMounted } from 'vue'; 
  
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

       
        // const loadScript = () => {
        //   const skScript = document.createElement("script");
        //   skScript.src = "https://pay-auth.sk-pay.co.kr/pages/js/v3/lib/crypto/encryptedUserAgent.js"
        //   // skScript.setAttribute("src", "https://pay-auth.sk-pay.co.kr/pages/js/v3/lib/crypto/encryptedUserAgent.js");
        //   document.head.appendChild(skScript);  
        //   console.log(skScript)

        // }

        // onMounted(() => {
        //   loadScript();
        // });
      };
      onMounted(() => {
        const script = document.createElement('script');
        script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
        script.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);

        script.onload = () => console.log('jQuery loaded successfully');
        script.onerror = () => console.error('Error loading jQuery');


        const loadScript = () => {
          const skScript = document.createElement("script");
          skScript.src = "https://pay-auth.sk-pay.co.kr/pages/js/v3/lib/crypto/encryptedUserAgent.js"
          // skScript.setAttribute("src", "https://pay-auth.sk-pay.co.kr/pages/js/v3/lib/crypto/encryptedUserAgent.js");
          document.head.appendChild(skScript);  
          console.log(skScript)

        }
        loadScript();

      });

  
      return {
        videoElement,
        startCamera
      };
    }
  };
  </script>
  
  <style>
  </style>
  