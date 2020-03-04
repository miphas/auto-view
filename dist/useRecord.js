"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var utils_1 = require("./utils");
function useRecord(options) {
    var ignores = options.ignores;
    var aliveElems = [];
    var listeners = [];
    /**
     * 测试待检测元素是否在数组中
     * @param elem 待检测元素
     */
    var checkElemInAlive = function (elem) { return utils_1.some(aliveElems, function (item) { return item === elem; }); };
    /**
     * 增加元素时调用方法
     * @param elem 新增元素
     */
    var recordElemAdd = function (elem) {
        // 不满足记录条件
        if (!elem.dataset.vid || ignores(elem)) {
            return;
        }
        // 已经记录在Alive中
        if (checkElemInAlive(elem)) {
            return;
        }
        aliveElems.push(elem);
        utils_1.each(listeners, function (listener) { return listener(elem, aliveElems.length - 1, types_1.RecordUpdateOption.ADD); });
    };
    /**
     * 删除元素时调用方法
     * @param elem 删除元素
     */
    var recordElemRemove = function (elem) {
        var idx = utils_1.find(aliveElems, elem);
        if (idx !== -1) {
            utils_1.each(listeners, function (listener) { return listener(elem, idx, types_1.RecordUpdateOption.REMOVE); });
            aliveElems.splice(idx, 1);
        }
    };
    /**
     * 修改监听方法
     * @param onAliveElemChange 监听方法
     * @param option 增加/删除
     */
    var updateElemListener = function (onAliveElemChange, option) {
        var listenerIdx = utils_1.find(listeners, onAliveElemChange);
        if (option === types_1.RecordUpdateOption.ADD && listenerIdx === -1) {
            listeners.push(onAliveElemChange);
        }
        if (option === types_1.RecordUpdateOption.REMOVE && listenerIdx !== -1) {
            listeners.splice(listenerIdx, 1);
        }
    };
    return {
        aliveElems: aliveElems,
        recordElemAdd: recordElemAdd,
        recordElemRemove: recordElemRemove,
        updateElemListener: updateElemListener
    };
}
exports.default = useRecord;
