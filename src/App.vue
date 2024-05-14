<template>
  <div id="app">
    <CameraControl />
  </div>
  {{ JSON.stringify(testing) }}
  {{ testing }}
  <div>
    <div v-for="(list, index) in this.data" :key="list" :index="index">
      {{ list.country_eng_nm }}
    </div>
  </div>
</template>

<script>
import CameraControl from './components/CameraControl.vue';

export default {
  name: 'App',
  components: {
    CameraControl
  },
  data() {
    return {
      data: null,
      testing: { name: 'check', value: 'good' }
    }
  },
  mounted() {
    this.fetchData()
  },  
  methods: {
    async fetchData() {
      try {
        const response = await fetch('https://apis.data.go.kr/B260004/OverseasKorProvideService3/getKorProvideList3?serviceKey=jDDorJlGEy5KVTpmpQ%2ByZwmN5QwdCO%2B3sLo1RvCg9I8bwv1YIO3Oo%2BjXLG%2BeFaGq3IrOiUh5bNVgSsbLq3y%2BzQ%3D%3D&pageNo=1&numOfRows=20');
        const data = await response.json();
        this.data = data.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
};
</script>
