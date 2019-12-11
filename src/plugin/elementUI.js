import Vue from 'vue';
import ElementUI from 'element-ui';
import './../../theme/index.css';
import i18n from './../../locale'
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
