<template>
  <home-page />
</template>

<script>
import homePage from './views/homePage';
import { provide } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

//设置基准路径
axios.defaults.baseURL = 'http://localhost:8888';

export default {
  components: { homePage },
  setup() {
    provide('echarts', echarts);
    provide('axios', axios);
  },
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
