<template>
  <div class="mian">
    <Top />
    <Buttom />
  </div>
</template>

<script>
import Top from '../components/Top.vue';
import Buttom from '../components/Buttom';

export default {
  components: { Top, Buttom },
  name: 'homePage',
};
</script>

<style lang="less" scoped>
.mian {
  display: flex;
  flex-direction: column;
  background-color: #00bfff;
}
</style>
