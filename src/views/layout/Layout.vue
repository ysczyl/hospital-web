<template>
  <el-container>
    <el-header style="height: 40px;padding: 0 0px;"><navbar/></el-header>
    <el-header style="height: 40px;padding: 0 0px;">
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 20px">
        <el-tab-pane label=" 待审核 " name="first"><Audited/></el-tab-pane>
        <el-tab-pane label=" 已审核 " name="second"><Toaudited/></el-tab-pane>
      </el-tabs>
    </el-header>
    <el-container>
      <!--<el-aside width="200px"><sidebar class="sidebar-container"/></el-aside>-->
      <!--<el-main style="padding:10px 20px"><app-main/></el-main>-->
    </el-container>
  </el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import Audited from '../userManage/Audit/Audited'
import Toaudited from '../userManage/Audit/Toaudited'

// import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  data(){
    return{
      activeName: 'first'
    };
  },
  components: {
    Toaudited,
    Audited,
    Navbar,
    Sidebar,
    AppMain
  },
  // mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
