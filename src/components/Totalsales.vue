<template>
  <div class="mychart" ref="charts"></div>
</template>

<script>
import { getCurrentInstance, inject, onMounted, reactive } from 'vue';

export default {
  name: 'totalssales',
  setup() {
    let currentIstance = '';
    let echarts = inject('echarts');
    let axios = inject('axios');

    let data = reactive({
      totalsdata: {},
    });
    let xdata = reactive({
      title: [],
    });
    let ydata = reactive({
      num: [],
    });

    let getTotals = async () => {
      let res = await axios({ url: '/one/data' });
      data.totalsdata = res.data.chartData.chartData;
    };
    let setData = () => {
      xdata.title = data.totalsdata.map((v) => v.title);
      ydata.num = data.totalsdata.map((v) => v.num);
    };

    onMounted(() => {
      currentIstance = getCurrentInstance();

      getTotals().then(() => {
        setData();
        let charts = echarts.init(currentIstance.ctx.$refs.charts);
        charts.setOption({
          title: {
            text: '销售总量',
            top: '2%',
            left: 'center',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              textShadowBlur: 10,
              textShadowColor: '#33dddd',
            },
          },
          xAxis: {
            type: 'value',
          },
          yAxis: {
            data: xdata.title,
            type: 'category',
          },
          grid: {
            left: '1%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              data: ydata.num,
              type: 'bar',
              barWidth: 20, //设置宽度
              legendHoverLink: true,
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 20, 20, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0,
                      color: '#4169E1',
                    },
                    {
                      offset: 0.5,
                      color: '#6495ED',
                    },
                    {
                      offset: 1,
                      color: '#87CEEB',
                    },
                  ]),
                },
              },
            },
          ],
        });
      });
    });
    return { getTotals, setData, data, xdata, ydata };
  },
};
</script>

<style lang="less" scoped>
.mychart {
  width: 100%;
  height: 100%;
}
</style>
