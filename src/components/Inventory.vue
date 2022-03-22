<template>
  <div class="mychart" ref="charts"></div>
</template>

<script>
import { getCurrentInstance, inject, onMounted, reactive } from 'vue';

export default {
  name: 'monthsales',
  setup() {
    let currentIstance = '';
    let echarts = inject('echarts');
    let axios = inject('axios');

    let Data = reactive({
      chartData: [],
    });

    let getInventor = async () => {
      let res = await axios({ url: '/three/data' });
      Data.chartData = res.data.chartThree.chartData;
    };

    onMounted(() => {
      currentIstance = getCurrentInstance();
      let charts = echarts.init(currentIstance.ctx.$refs.charts);
      getInventor().then(() => {
        let charts = echarts.init(currentIstance.ctx.$refs.charts);
        charts.setOption({
          title: {
            text: '库存统计',
            top: '2%',
            left: 'center',
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
          legend: {
            top: 'bottom',
            left: 'center',
            width: 'auto',
            itemWidth: 18,
          },
          grid: {
            // left: '1%',
            // right: '6%',
            // bottom: '3%',
            // containLabel: true,
            top: '1%',
          },
          series: [
            {
              type: 'pie',
              radius: [10, 100],
              center: ['50%', '50%'],
              data: Data.chartData,
              label: {
                position: 'outside',
              },
              labelLine: {
                length: 0,
              },
              roseType: 'area',
              itemStyle: {
                borderRadius: 35,
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        });
      });
    });
    return { getInventor, Data };
  },
};
</script>

<style scoped lang="less">
.mychart {
  width: 100%;
  height: 100%;
}
</style>
