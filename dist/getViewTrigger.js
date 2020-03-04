"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function getViewTrigger(viewTriggerInit) {
    var observeElems = viewTriggerInit.observeElems, reportStates = viewTriggerInit.reportStates, onElemView = viewTriggerInit.onElemView;
    var supportObserve = (typeof IntersectionObserver !== 'undefined');
    var documentObserve;
    /**
     * 观测节点回调
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    var observeCb = function (entries, observer) {
        var interEntries = utils_1.filter(entries, function (item) { return item.isIntersecting; });
        utils_1.each(interEntries, function (entry) {
            var elemIdx = utils_1.find(observeElems, entry.target);
            if (elemIdx === -1) {
                return;
            }
            var reportState = reportStates[elemIdx];
            onElemView(reportState.vid, reportState.vdata);
            reportState.hasView = true;
            documentObserve.unobserve(entry.target);
            reportState.bindView = null;
        });
    };
    /**
     * 增加曝光触发上报
     * @param elem 打点元素
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    var addTrigger = function (elem, reportState) {
        if (supportObserve) {
            documentObserve = documentObserve || new IntersectionObserver(observeCb);
            documentObserve.observe(elem);
            reportState.bindView = documentObserve;
        }
        else {
            reportState.hasView = true;
            onElemView(reportState.vid, reportState.vdata);
        }
    };
    /**
     * 删除曝光触发上报
     * @param elem 打点元素
     * @param reportState 上报状态
     */
    var removeTrigger = function (elem, reportState) {
        if (reportState.bindView) {
            reportState.bindView.unobserve(elem);
            reportState.bindView = null;
        }
    };
    return {
        addTrigger: addTrigger,
        removeTrigger: removeTrigger
    };
}
exports.default = getViewTrigger;
