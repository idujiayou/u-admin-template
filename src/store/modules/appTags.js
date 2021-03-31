import userState from './user'
const state = {
  visitedViews: [],
  cachedViews: []
}

function setTagsStorge(state) {
  let name = userState.state.name

  try{
    if(name) {
      let arr = []
      state.visitedViews.forEach(({fullPath, path, name, meta, query, parmas}) => {
        arr.push({
          fullPath, path, name, 
          meta: {...meta},
           query, parmas
        })
      })
      sessionStorage.setItem(name + '-tags', JSON.stringify(arr))
    }
  }catch(err) {
    console.log(err)
  }
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    state.visitedViews.push(view)
    setTagsStorge(state)
  },
  DEL_VISITED_VIEW: (state, index) => {
    state.visitedViews.splice(index, 1)
    setTagsStorge(state)
  },
  CLEAR_VISITED_VIEW: (state) => {
    state.visitedViews.splice(0, state.visitedViews.length)
    setTagsStorge(state)
  },
  ADD_CACHED_VIEW: (state, view) => {
    state.cachedViews.push(view.name)
  },
  CLEAR_CACHED_VIEW: (state) => {
    state.cachedViews.splice(0, state.cachedViews.length)
  },
  DEL_CACHED_VIEW: (state, index) => {
    state.cachedViews.splice(index, 1)
  }
}

const actions = {
  addVisitedView ({ commit, state, dispatch }, view) {
    if (!view.meta.title || state.visitedViews.some(v => v.path === view.path)) return
    //该路由只展示一个标签页
    const add = Object.assign({}, view, {
      title: view.meta.title
    })
    commit('ADD_VISITED_VIEW', add)
    dispatch('addCachedView', add)
  },
  addAllVisitedView ({dispatch}, views) {
    views.forEach(item => {
      dispatch('addVisitedView', item)
      dispatch('addCachedView', item)
    })
  },
  clearVisitedView({ commit, dispatch }) {
    commit('CLEAR_VISITED_VIEW')
    dispatch('clearCachedView')
  },
  delVisitedView({ commit, state, dispatch }, view) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        commit('DEL_VISITED_VIEW', i)
        break
      }
    }
    dispatch('delCachedView', view)

  },
  delCachedView({ commit, state }, view) {
    for (const [i, v] of state.cachedViews.entries()) {
      if (v === view.name) {
        commit('DEL_CACHED_VIEW', i)
        return Promise.resolve(view)
      }
    }
  },
  clearCachedView({ commit }) {
    commit('CLEAR_CACHED_VIEW')
  },
  addCachedView({commit}, view) {
    commit('ADD_CACHED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}