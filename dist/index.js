"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var useObserve_1 = __importDefault(require("./useObserve"));
var useRecord_1 = __importDefault(require("./useRecord"));
var useReport_1 = __importDefault(require("./useReport"));
/**
 * 自动上报打点的方法
 * @param options AutoViewInit
 * - onElemView 曝光上报
 * - onElemClick 点击上报
 * - ignores 判断不监听的元素的方法
 * - rootElement 监听变化的根节点
 */
function init(options) {
    var record = useRecord_1.default({
        ignores: options.ignores || (function (elem) { return getComputedStyle(elem).getPropertyValue('visibility') === 'hidden'; })
    });
    var observe = useObserve_1.default({
        observeElem: options.rootElement || document.body,
        onElemAdd: record.recordElemAdd,
        onElemRemove: record.recordElemRemove
    });
    var reportListener = useReport_1.default({
        observeElems: record.aliveElems,
        onElemView: options.onElemView,
        onElemClick: options.onElemClick
    });
    record.updateElemListener(reportListener, types_1.RecordUpdateOption.ADD);
}
exports.default = init;
