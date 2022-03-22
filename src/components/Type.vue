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
      xdata: {},
      ydata: {},
    });

    let getType = async () => {
      let res = await axios({ url: '/four/data' });
      Data.xdata = res.data.chartFour.chartData.day;
      Data.ydata = res.data.chartFour.chartData.num;
    };

    onMounted(() => {
      currentIstance = getCurrentInstance();
      getType().then(() => {
        let charts = echarts.init(currentIstance.ctx.$refs.charts);
        charts.setOption({
          title: {
            text: '产品类别',
            top: '2%',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              textShadowBlur: 10,
              textShadowColor: '#33dddd',
            },
          },
          legend: {
            top: '10%',
            left: 'center',
            data: ['服饰', '日化', '家电', '数码', '家居'],
          },
          tooltip: {
            trigger: 'item',
          },
          xAxis: {
            type: 'category',
            data: Data.xdata,
          },
          yAxis: { type: 'value' },
          grid: {
            left: '1%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: '日化',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: Data.ydata.Chemicals,
            },
            {
              name: '服饰',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: Data.ydata.Clothes,
            },
            {
              name: '家电',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: Data.ydata.Electrical,
            },
            {
              name: '数码',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: Data.ydata.digit,
            },
            {
              name: '家居',
              type: 'bar',
              stack: 'total',
              label: {
                show: true,
              },
              emphasis: {
                focus: 'series',
              },
              data: Data.ydata.gear,
            },
          ],
        });
      });
    });
    return { getType, Data };
  },
};
</script>

<style scoped lang="less">
.mychart {
  width: 100%;
  height: 100%;
}
</style>
