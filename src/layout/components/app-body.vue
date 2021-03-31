<template>
    <router-view v-slot="{ Component }">
      {{cachedViews}}111777
      <keep-alive :include="cachedViews" :max="maxTagCached">
        <component :is="Component" />
      </keep-alive>
    </router-view>
</template>
<script>
import { ref } from 'vue'
import {
  mapState
} from 'vuex'

export default {
  name: 'app-body',
  setup() {
    const maxTagCached = ref(20)

    return {
      maxTagCached
    }
  },
  computed: {
    ...mapState({
      cachedViews: state => state.appTags.cachedViews
    })
  }
}
</script>

