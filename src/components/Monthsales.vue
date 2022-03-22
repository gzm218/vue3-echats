<template>
  <div class="mychart" ref="charts"></div>
</template>

<script>
import { getCurrentInstance, onMounted, inject, reactive } from 'vue';

export default {
  name: 'monthsales',
  setup() {
    let currentIstance = '';
    let echarts = inject('echarts');
    let axios = inject('axios');

    let monthData = reactive({
      data: {},
    });

    let getMonth = async () => {
      let res = await axios({ url: '/two/data' });
      monthData.data = res.data.chartTwo;
    };
    onMounted(() => {
      currentIstance = getCurrentInstance();
      getMonth().then(() => {
        let charts = echarts.init(currentIstance.ctx.$refs.charts);
        charts.setOption({
          title: {
            text: '产品月销',
            left: 'center',
            top: '2%',
            textStyle: {
              color: '#fff',
              fontSize: 20,
              textShadowBlur: 10,
              textShadowColor: '#33dddd',
            },
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            top: '10%',
            left: 'center',
            data: ['服饰', '日化', '家电', '数码', '家居'],
          },
          grid: {
            left: '1%',
            right: '6%',
            bottom: '3%',
            containLabel: true,
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {},
          //   },
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: monthData.data.chartData.day,
            nameTextStyle: {
              fontSize: 10,
            },
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '日化',
              type: 'line',
              //数据堆叠 同类型的数据需要匹配相同的stack值
              stack: 'Total',
              //开启平滑的过度
              smooth: true,
              data: monthData.data.chartData.num.Chemicals,
              //样式填充
              areaStyle: {},
              // 选中高亮状态
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: '服饰',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: monthData.data.chartData.num.Clothes,
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: '家电',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: monthData.data.chartData.num.Electrical,
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: '数码',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: monthData.data.chartData.num.digit,
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
            },
            {
              name: '家居',
              type: 'line',
              stack: 'Total',
              smooth: true,
              data: monthData.data.chartData.num.gear,
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
            },
          ],
        });
      });
    });
    return { getMonth, monthData };
  },
};
</script>

<style scoped lang="less">
.mychart {
  width: 100%;
  height: 100%;
}
</style>
