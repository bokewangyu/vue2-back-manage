<template>
  <section
    class="loading_container"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></section>
</template>
<script>
export default {
  name: "loading",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isLoading(val) {
      this.loading = val;
    }
  },
  
};
</script>
<style lang="less">
//水平、垂直居中
.loading_container {
  position: absolute;
  width: 100%;
  height: 100%;
 margin: 0 auto;
}
</style>
