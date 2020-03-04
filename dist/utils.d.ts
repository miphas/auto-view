import { VisitCb, TestFun } from './types';
/**
 * 数组过滤
 * @param array 待过滤数组
 * @param testFun 元素是否满足过滤条件
 */
export declare function filter<T>(array: ArrayLike<T> | HTMLCollection, testFun: TestFun<T>): T[];
/**
 * 数组遍历
 * @param array 待遍历数组
 * @param eachFun 遍历方法
 */
export declare function each<T>(array: ArrayLike<T> | HTMLCollection, eachFun: (item: T) => any): void;
/**
 * 是否满足条件
 * @param array 待测试数组
 * @param testFun 测试方法
 */
export declare function some<T>(array: ArrayLike<T> | HTMLCollection, testFun: TestFun<T>): boolean;
/**
 * 查找到指定元素
 * @param array 待查找数组
 * @param testFun 判断方法
 */
export declare function find<T>(array: ArrayLike<T> | HTMLCollection, target: T): number;
/**
 * 遍历节点
 * @param root 根节点 - 遍历起点
 * @param visitCb 遍历回调函数
 */
export declare function nodeVisitor(root: HTMLElement, visitCb?: VisitCb): void;
