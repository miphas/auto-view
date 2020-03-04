import { AutoViewInit } from './types';
/**
 * 自动上报打点的方法
 * @param options AutoViewInit
 * - onElemView 曝光上报
 * - onElemClick 点击上报
 * - ignores 判断不监听的元素的方法
 * - rootElement 监听变化的根节点
 */
declare function init(options: AutoViewInit): void;
export default init;
