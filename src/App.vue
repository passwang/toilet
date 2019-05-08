<template>
  <div id="app">
    <transition name="slide">
     <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
}
</script>
<style>
html,body {
  line-height: 1;
  width: 100%;
  height: calc(100%);
}
#app{
  width: 100%;
  height: calc(100%);
}
</style>

