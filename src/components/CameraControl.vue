<template>
  <div>
    <video class="video-window" ref="videoElement" style="transform: scaleX(-1);" autoplay></video>
    <div>
      <button @click="startCamera">카메라 시작</button>
      <button @click="startRecording" :disabled="!isCameraOn || isRecording">녹화 시작</button>
      <button @click="stopRecording" :disabled="!isRecording">녹화 중지</button>
      <a ref="downloadLink" style="display: none;">Download</a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'; 

export default {
  name: "CameraControl",
  setup() {
    const videoElement = ref(null);
    const downloadLink = ref(null);
    const mediaRecorder = ref(null);
    const recordedChunks = ref([]);
    const isRecording = ref(false);
    const isCameraOn = ref(false);

    const startCamera = () => {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(function(stream) {
            isCameraOn.value = true;
            if (videoElement.value) {
              videoElement.value.srcObject = stream;
              mediaRecorder.value = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp8' // Ensure a supported MIME type
              });

              mediaRecorder.value.ondataavailable = function(event) {
                if (event.data.size > 0) {
                  recordedChunks.value.push(event.data);
                }
              };

              mediaRecorder.value.onstop = function() {
                const blob = new Blob(recordedChunks.value, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                if (downloadLink.value) {
                  downloadLink.value.href = url;
                  downloadLink.value.download = 'recording.webm';
                  downloadLink.value.style.display = 'block';
                }
              };
            }
          })
          .catch(function(error) {
            console.log("카메라 접근에 실패했습니다:", error);
          }); 
      } else {
        console.error("브라우저가 카메라 기능을 지원하지 않습니다.");
      }
    };

    const startRecording = () => {
      if (mediaRecorder.value && mediaRecorder.value.state !== "recording") {
        recordedChunks.value = [];
        mediaRecorder.value.start();
        isRecording.value = true;
      }
    };

    const stopRecording = () => {
      if (mediaRecorder.value && mediaRecorder.value.state === "recording") {
        mediaRecorder.value.stop();
        isRecording.value = false;
      }
    };

    onMounted(() => {
      const script = document.createElement('script');
      script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
      script.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);

      script.onload = () => console.log('jQuery loaded successfully');
      script.onerror = () => console.error('Error loading jQuery');
    });

    return {
      videoElement,
      downloadLink,
      startCamera,
      startRecording,
      stopRecording,
      isRecording,
      isCameraOn
    };
  }
};
</script>

<style scoped>
.video-window {
  border: 1px solid black;
}
button {
  border: 1px solid black;
  background: none;
}
a {
  display: block;
  margin-top: 10px;
}
</style>
