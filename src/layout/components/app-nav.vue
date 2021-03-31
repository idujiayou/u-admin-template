<template>
  <a-menu theme="dark"  mode="inline" :selectedKeys="[$route.path]">
    <appNavItem 
      v-for="route in navs" 
      :key="route.path"
      :item="route"/>
  </a-menu>
</template>
<script>
import appNavItem from './app-nav-item'
import router from '@/router'

export default {
  components: {
    appNavItem
  },
  data() {
    return {
      navs: router.options.routes[0].children
    }
  }
}
</script>
