"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var observeOptions = {
    attributes: false,
    childList: true,
    subtree: true // 监控非直接子节点
};
/**
 * 获取节点变化的回调函数
 * @param options UseObserveInit
 */
function getMutationCallback(options) {
    var onElemAdd = options.onElemAdd, onElemRemove = options.onElemRemove;
    var traverseChildLists = function (childLists) {
        utils_1.each(childLists, function (childList) {
            var addedNodes = childList.addedNodes, removedNodes = childList.removedNodes;
            onElemAdd && utils_1.each(addedNodes, function (child) { return utils_1.nodeVisitor(child, onElemAdd); });
            onElemRemove && utils_1.each(removedNodes, function (child) { return utils_1.nodeVisitor(child, onElemRemove); });
        });
    };
    return function (mutationsList) {
        var childLists = utils_1.filter(mutationsList, function (item) { return item.type === 'childList'; });
        traverseChildLists(childLists);
    };
}
/**
 * 使用 mutationObserve 来观测节点变动
 * @param options UseObserveInit
 */
function useObserve(options) {
    var observeCb = getMutationCallback(options);
    var observe = new MutationObserver(observeCb);
    observe.observe(options.observeElem, observeOptions);
    return observe;
}
exports.default = useObserve;
