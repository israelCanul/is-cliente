import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Mgr from './services/SecurityService'

router.beforeEach(async (to, from, next) => {
  var user = new Mgr()
  var userValid = await user.getUser()
  if (userValid.signedIn) {
    store.commit('user/SET_USER', userValid.user) // se setea el usuario si esta logeado
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userValid.signedIn) {
      next({
        path: '/login'
      })
    } else {
      // CUNA VEZ ESTE VALIDADO QUE ESTYA LOGEADO
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
