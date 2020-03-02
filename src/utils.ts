
import { VisitCb, TestFun } from './types';

/**
 * 数组过滤
 * @param array 待过滤数组
 * @param testFun 元素是否满足过滤条件
 */
export function filter<T>(array: ArrayLike<T> | HTMLCollection, testFun: TestFun<T>): T[] {
    return Array.prototype.filter.call(array, testFun)
}

/**
 * 数组遍历
 * @param array 待遍历数组
 * @param eachFun 遍历方法
 */
export function each<T>(array: ArrayLike<T> | HTMLCollection, eachFun: (item: T) => any): void {
    return Array.prototype.forEach.call(array, eachFun)
}

/**
 * 是否满足条件
 * @param array 待测试数组
 * @param testFun 测试方法
 */
export function some<T>(array: ArrayLike<T> | HTMLCollection, testFun: TestFun<T>): boolean {
    return Array.prototype.some.call(array, testFun)
}

/**
 * 查找到指定元素
 * @param array 待查找数组
 * @param testFun 判断方法
 */
export function find<T>(array: ArrayLike<T> | HTMLCollection, testFun: TestFun<T>): number {
    return Array.prototype.indexOf.call(array, testFun)
}

/**
 * 遍历节点
 * @param root 根节点 - 遍历起点
 * @param visitCb 遍历回调函数
 */
export function nodeVisitor(root: HTMLElement, visitCb?: VisitCb): void {
    // 关于nodeType 此处只关心元素 1-HTMLElement 2-Attr 3-Text
    if (!root || root.nodeType !== Node.ELEMENT_NODE) {
        return;
    }
    visitCb && visitCb(root);
    // 遍历子节点
    if (root.children && root.children.length) {
        each(root.children, child => nodeVisitor(child as HTMLElement, visitCb))
    }
}