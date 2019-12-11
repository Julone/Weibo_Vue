import ElementUI from 'element-ui'
import _ from 'underscore'
import './less.less'
var mb = ElementUI.MessageBox.confirm;
var mb2 = function(msg,title,obj){
    var pa = {
        center:true,
        customClass:'julone_confirm_class',
        // confirmButtonClass:'el-button--medium',
        // cancelButtonClass:'el-button--medium',
        // roundButton:true,
        ...obj,
    }
    return mb(msg,title,pa);
}
export default mb2;