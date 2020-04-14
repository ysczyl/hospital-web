<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    if (sessionStorage.getItem('Router')) {
      this.$router.replace(sessionStorage.getItem('Router'))
    }
  }
  //,
  // watch:{
  //   '$route' (to, from) {
  //     console.log("*****************************************************")
  //     console.log(from,to)
  //     next({ path: to.fullPath })
  //   }
  // }
}
</script>
