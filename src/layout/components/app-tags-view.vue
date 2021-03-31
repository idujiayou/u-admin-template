<template>
  <div class="app-tags-views">
    <router-link
      class="app-tags-item"
      v-for="(tag, index) in visitedViews"
      :class="isActive(tag) ? 'active' : ''"
      :key="tag.path"
      :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
      @click.middle="visitedViews.length > 1 ? closeSelectedTag(tag) :''"
      @contextmenu.prevent="openMenu(tag,$event)">
      {{ tag.title }} 
      <CloseCircleOutlined 
        v-if="visitedViews.length > 1"
        class="close"
        @click.stop.prevent="closeTag(tag, index)"/>
    </router-link>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li @click="closeSelectedTag(selectedTag)">{{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags(selectedTag)">{{ $t('tagsView.closeOthers') }}</li>
      <!-- <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li> -->
    </ul>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { CloseCircleOutlined } from '@ant-design/icons-vue'

export default {
  components: {
    CloseCircleOutlined
  },
  data() {
    return {
      visible: false,
      left: 0,
      top: 0,
      selectedTag: {}
    }
  },
  computed: {
    ...mapState({
      visitedViews: state => state.appTags.visitedViews
    })
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    ...mapActions({
      delVisitedView: 'appTags/delVisitedView',
      clearVisitedView: 'appTags/clearVisitedView',
      delCachedView: 'appTags/delCachedView',
    }),
    isActive(item) {
      return item.path === this.$route.path
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeTag(tag, index) {
      let {
        $route,
        $router,
        visitedViews,
        delVisitedView
      } = this

      if(typeof index === 'undefined') {
        index = visitedViews.findIndex(v => {
          return v.path === tag.path
        })
      }

      if(tag.path === $route.path) {
        let i = index - 1
        $router.push(visitedViews[ i >= 0 ? i : (index + 1)])
      }
      delVisitedView(tag)
    },
    refreshSelectedTag(tag) {
      let {delCachedView} = this
      delCachedView(tag).then(ret => {
        const { fullPath } = tag

        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(tag) {
     this.closeTag(tag)
    },
    closeOthersTags(tag) {
      this.clearVisitedView()
      this.$router.push(tag)
    },
    closeAllTags() {
      this.clearVisitedView()
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="less" scoped>
  .app-tags-views {
    line-height: 26px;

    .app-tags-item {
      border: 1px solid #eee;
      padding: 0 10px;
      display: inline-block;
      margin-right: 5px;
      font-size: 12px;
      color: #333;

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
      }
    }
  }
</style>

