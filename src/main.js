import Vue from 'vue'
import App from './App'
import "../static/weui/weui.wxss"

import WXrequest from './utils/wx-request'
Vue.prototype.$httpWX = WXrequest
import api from './utils/interface'
Vue.prototype.$api = api;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: [
      'pages/already/main',
      'pages/counter/main',
      'pages/firstBinding/main',
      'pages/importPage/main',
      'pages/login/main',
      'pages/my/main',
      'pages/reducible/main',
      'pages/reservations/main',
      'pages/userAccredit/main',
      'pages/versionType/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '爱家学车',
      navigationBarTextStyle: 'black'
    }
  }
}
