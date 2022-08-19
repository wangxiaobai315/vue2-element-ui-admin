<template>
  <div class="home">
    <Header></Header>
    <Count></Count>
  </div>
</template>
<script>
import Header from "../components/header.vue";
import Count from "../components/count.vue";
export default {
  name: "HomeView",
  data() {
    return {};
  },
  components: { Header, Count },
};
</script>
<style lang="less" scoped>
</style>
