<template>
  <div class="chart">
    <div class="left">
      <ItemPage> <Totalsales /></ItemPage>
      <ItemPage> <Monthsales /></ItemPage>
    </div>
    <div class="center">
      <Citysales />
    </div>
    <div class="right">
      <ItemPage><Inventory /> </ItemPage>
      <ItemPage><Type /> </ItemPage>
    </div>
  </div>
</template>

<script>
import Monthsales from '../components/Monthsales.vue';
import Totalsales from '../components/Totalsales.vue';
import Citysales from '../components/Citysales.vue';
import Inventory from '../components/Inventory.vue';
import Type from '../components/Type.vue';
import ItemPage from '../components/ItemPage.vue';

export default {
  name: 'buttom',
  components: { Monthsales, Totalsales, Citysales, Inventory, Type, ItemPage },
};
</script>

<style lang="less" scoped>
.chart {
  // min-width: 1080px;
  // max-width: 2048px;
  display: flex;
  height: 90vh;
  // background-color: pink;
  .left,
  .right {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .center {
    flex: 5;
    border: 0.0525rem solid #4169e1;
    height: 9.78rem;
    margin: auto 0;
  }
}
</style>
