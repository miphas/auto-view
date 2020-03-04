"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClickTrigger(clickTriggerInit) {
    var onElemClick = clickTriggerInit.onElemClick;
    /**
     * 增加点击触发上报
     * @param elem 绑定元素
     * @param reportState 上报状态
     */
    var addTrigger = function (elem, reportState) {
        var vid = reportState.vid, vdata = reportState.vdata;
        reportState.bindClick = function (ev) {
            // * 会触发父级元素的click 同样也会上报
            return onElemClick(vid, vdata);
        };
        elem.addEventListener('click', reportState.bindClick);
    };
    /**
     * 移除点击触发上报
     * @param elem 绑定元素
     * @param reportState 上报状态
     */
    var removeTrigger = function (elem, reportState) {
        var bindClick = reportState.bindClick;
        if (bindClick) {
            elem.removeEventListener('click', bindClick);
        }
    };
    return {
        addTrigger: addTrigger,
        removeTrigger: removeTrigger
    };
}
exports.default = getClickTrigger;
