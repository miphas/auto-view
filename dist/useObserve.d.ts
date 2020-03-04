import { UseObserveInit } from './types';
/**
 * 使用 mutationObserve 来观测节点变动
 * @param options UseObserveInit
 */
export default function useObserve(options: UseObserveInit): MutationObserver;
