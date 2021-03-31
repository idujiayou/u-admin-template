import router from './router'
import store from './store'
const ignoreList = [
  'redirect'
]

router.beforeEach(async (to, from, next) => {
  next()
})
router.afterEach((from) => {
  if(!ignoreList.includes(from.name)) {
    store.dispatch('appTags/addVisitedView', from)
    document.title = (from.meta && from.meta.title) || ''
  }
  
})