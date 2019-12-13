<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta.title" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align="start">
      <img :src="require('img/'+adminInfo.avatar)" class="avator" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { signout } from "@/api/getData";
import { baseImgPath } from "@/config/env";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers("login");

export default {
  data() {
    return {
      baseImgPath
    };
  },
  created() {
    // if (!this.adminInfo.id) {
    // 	this.getAdminData()
    // }
  },
  computed: {
    ...mapState({ adminInfo: "adminInfo", userInfo: "userInfo" })
  },
  methods: {
    ...mapActions(["getAdminData", "remove_user"]),
    async handleCommand(command) {
      if (command == "home") {
        this.$router.push("/manage");
      } else if (command == "signout") {
        this.remove_user()
          .then(() => {
            if (!this.userInfo) {
              this.$router.push("/");
            } else {
              throw new Error(this.userInfo);
            }
          })
          .catch(err => {
			   console.log(err)
		  });
        // const res = await signout()
        // if (res.data.status == 1) {
        // 	this.$message({
        //         type: 'success',
        //         message: '退出成功'
        // 	});
        // 	this.remove_user();
        //     this.$router.push('/');
        // }else{
        // 	this.$message({
        //         type: 'error',
        //         message: res.message
        //     });
        // }
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
