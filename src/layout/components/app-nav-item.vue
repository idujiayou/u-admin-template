<template>
  <a-sub-menu 
    v-if="item.children && item.children.length"
    :key="item.path" >
    <template v-slot:title>
      <span>{{item.meta.title}}</span>
    </template>
    <appNavItem 
      v-for="route in item.children" 
      :key="route.path"
      :item="route"/>
  </a-sub-menu>
  <a-menu-item v-else :key="item.path">
    <router-link :to="item" />
    {{item.meta.title}}
  </a-menu-item>
</template>
<script>
export default {
  props: {
    item: Object
  },
  components: {
  }
}
</script>
