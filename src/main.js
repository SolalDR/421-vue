// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Bourgeon from 'bourgeon'
import App from './App'
import VueSession from 'vue-session'
import Notification from './components/Notification'

Vue.use(VueSession)

Vue.use(Bourgeon, {
  locales: ['fr', 'en']
})

Vue.component('Notification', Notification)

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
