"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var getViewTrigger_1 = __importDefault(require("./getViewTrigger"));
var getClickTrigger_1 = __importDefault(require("./getClickTrigger"));
function useReport(reportInit) {
    var observeElems = reportInit.observeElems, onElemView = reportInit.onElemView, onElemClick = reportInit.onElemClick;
    var reportStates = [];
    var viewTrigger = getViewTrigger_1.default({ observeElems: observeElems, reportStates: reportStates, onElemView: onElemView });
    var clickTrigger = getClickTrigger_1.default({ observeElems: observeElems, reportStates: reportStates, onElemClick: onElemClick });
    /**
     * 获取初始化状态
     * @param elem 元素对象
     */
    var getInitState = function (elem) {
        var vid = elem.dataset.vid || 'unknow-vid';
        var vdata = elem.dataset.vdata || undefined;
        if (vdata && vdata.indexOf('{') !== -1) {
            try {
                vdata && (vdata = JSON.parse(vdata));
            }
            catch (e) {
                // console.log(e)
            }
        }
        return {
            vid: vid,
            vdata: vdata,
            hasView: false,
        };
    };
    /**
     * 增加监控元素曝光
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    var addViewMonitor = function (elem, reportState) {
        if (reportState.bindView || reportState.hasView) {
            return;
        }
        viewTrigger.addTrigger(elem, reportState);
    };
    /**
     * 移除元素曝光监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    var removeViewMonitor = function (elem, reportState) {
        if (!reportState.bindView) {
            return;
        }
        viewTrigger.removeTrigger(elem, reportState);
    };
    /**
     * 增加监控元素点击
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    var addClickMonitor = function (elem, reportState) {
        if (reportState.bindClick) {
            return;
        }
        clickTrigger.addTrigger(elem, reportState);
    };
    /**
     * 移除点击事件监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    var removeClickMonitor = function (elem, reportState) {
        if (!reportState.bindClick) {
            return;
        }
        clickTrigger.removeTrigger(elem, reportState);
    };
    /**
     * 记录变化
     * @param elem 当前变动元素
     * @param idx 变动序号
     * @param option 增加/删除
     */
    var onRecordChange = function (elem, idx, option) {
        if (option === types_1.RecordUpdateOption.ADD) {
            var state = getInitState(elem);
            reportStates.push(state);
            addViewMonitor(elem, state);
            addClickMonitor(elem, state);
        }
        else {
            var state = reportStates[idx];
            removeViewMonitor(elem, state);
            removeClickMonitor(elem, state);
            reportStates.splice(idx, 1);
        }
    };
    return onRecordChange;
}
exports.default = useReport;
