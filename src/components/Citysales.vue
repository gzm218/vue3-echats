<template>
  <div class="mychart" ref="charts"></div>
</template>

<script>
import axios from 'axios';
import { getCurrentInstance, inject, onMounted, reactive } from 'vue';

export default {
  name: 'citysales',
  setup() {
    let currentIstance = '';
    let echarts = inject('echarts');

    let mapData = reactive({
      features: {},
    });

    let getMap = async () => {
      let res = await axios.get('http://localhost:8081/map/china.json');
      mapData.features = res.data;
    };

    onMounted(() => {
      currentIstance = getCurrentInstance();

      getMap().then(() => {
        let charts = echarts.init(currentIstance.ctx.$refs.charts);
        // 注册地图
        echarts.registerMap('chinaMpa', mapData.features);
        charts.setOption({
          geo: {
            map: 'chinaMpa',
            itemStyle: {
              areaColor: '#0099ff',
              borderColor: '00ffff',
              shaowColor: 'rgba(230,130,70,0.5)',
              // shadowBlur: 10,
              emphasis: {
                focus: 'self',
              },
            },
          },
          title: {
            text: '城市销量',
            top: '10%',
            left: '45%',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              textShadowBlur: 10,
              textShadowColor: '#33dddd',
            },
          },
          tooltip: {
            trigger: 'item',
          },
          visualMap: {
            tyep: 'continumous',
            min: 100,
            max: 5000,
            calculable: true,
            inRange: { color: ['#50a3ba', '#eac736', '#d94e5d'] },
            textStyle: {
              color: '#fff',
            },
          },
          series: [
            {
              type: 'scatter',
              itemStyle: {
                color: 'red',
              },
              coordinateSystem: 'geo',
              data: [
                { name: '北京', value: [116.46, 39.92, 4367] },
                { name: '上海', value: [121.48, 31.22, 8675] },
                { name: '深圳', value: [114.07, 22.62, 2461] },
                { name: '广州', value: [113.23, 23.16, 187] },
                { name: '西安', value: [108.45, 34, 3421] },
              ],
            },
          ],
        });
      });
    });
    return { getMap, mapData };
  },
};
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>
