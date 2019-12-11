import ElementUI from 'element-ui'
import './Message.less';
import _ from 'underscore'
var eMessage = ElementUI.Message;
var myToast = function (msg, type='info') {
    var obj = {
        offset: 55,
        center: true,
        customClass: 'julone_message_class',
        type: type,
        duration: 2000
    }
    var temp = _.isObject(msg) ? msg : ({ message: msg })
    var result = Object.assign(obj,temp)
    return eMessage(result)
}

var type = ['success', 'info', 'warning', 'error'];
for (let t of type) {
    myToast[t] = function (msg) {
        var temp = _.isObject(msg) ? msg : ({ message: msg })
        myToast(temp, t)
    }
}
myToast.close = eMessage.close;
myToast.closeAll = eMessage.closeAll;

export default myToast;