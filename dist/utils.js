"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数组过滤
 * @param array 待过滤数组
 * @param testFun 元素是否满足过滤条件
 */
function filter(array, testFun) {
    return Array.prototype.filter.call(array, testFun);
}
exports.filter = filter;
/**
 * 数组遍历
 * @param array 待遍历数组
 * @param eachFun 遍历方法
 */
function each(array, eachFun) {
    return Array.prototype.forEach.call(array, eachFun);
}
exports.each = each;
/**
 * 是否满足条件
 * @param array 待测试数组
 * @param testFun 测试方法
 */
function some(array, testFun) {
    return Array.prototype.some.call(array, testFun);
}
exports.some = some;
/**
 * 查找到指定元素
 * @param array 待查找数组
 * @param testFun 判断方法
 */
function find(array, target) {
    return Array.prototype.indexOf.call(array, target);
}
exports.find = find;
/**
 * 遍历节点
 * @param root 根节点 - 遍历起点
 * @param visitCb 遍历回调函数
 */
function nodeVisitor(root, visitCb) {
    // 关于nodeType 此处只关心元素 1-HTMLElement 2-Attr 3-Text
    if (!root || root.nodeType !== Node.ELEMENT_NODE) {
        return;
    }
    visitCb && visitCb(root);
    // 遍历子节点
    if (root.children && root.children.length) {
        each(root.children, function (child) { return nodeVisitor(child, visitCb); });
    }
}
exports.nodeVisitor = nodeVisitor;
