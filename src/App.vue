<template>
  <div id="app" class="fillcontain">
    <loading :loading="loadingStatus"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
import loading from "@/components/common/loading";
import { createNamespacedHelpers } from "vuex";
const {
  mapGetters
} = createNamespacedHelpers("loading");

export default {
  name: "App",
  components: { loading },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      loadingStatus: "loadingStatus"
    })
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
@import "./style/common";
</style>