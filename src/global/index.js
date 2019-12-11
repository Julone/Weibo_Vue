import Vue from 'vue'
import filter from './filter'
import components from './components'
import underscore from 'underscore'
import $m from './MyElementUI/Message'
import $c from './MyElementUI/Confirm'
Vue.use(filter);
Vue.use(components);
Vue.prototype.$message = $m;
Vue.prototype.$confirm = $c;

Vue.config.productionTip = false;

onGlobal('_',underscore);
///FUNCTION
function onGlobal(key,fun){
    window[key] = fun;
    Vue.prototype[key] = fun;
}