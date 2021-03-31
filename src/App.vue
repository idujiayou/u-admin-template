<template>
  <a-config-provider :locale="locale" :getPopupContainer="getPopupContainer">
    <router-view/>
  </a-config-provider>
</template>

<script>
  import { resolveComponent } from 'vue'

  import { inject } from 'vue'
 
  export default {
    setup() {
      let locale = inject('locale') || {}
      return {
        locale
      }
    },
    methods: {
      getPopupContainer(el, dialogContext) {
        if (dialogContext) {
          return dialogContext.getDialogWrap();
        } else {
          if(el && el.classList.contains('ant-menu-submenu-title')) {
            return el.parentNode 
          }
          return document.body;
        }
      }
    }
  }
</script>

<style lang="less">
  @import '~@/style/index.less';
</style>
