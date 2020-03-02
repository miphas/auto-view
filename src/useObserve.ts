import { UseObserveInit, MutationObserveCb } from './types';
import { filter, each, nodeVisitor } from './utils';

const observeOptions: MutationObserverInit = {
    attributes: false,  // 监控属性
    childList: true,    // 节点列表
    subtree: true       // 监控非直接子节点
}

/**
 * 获取节点变化的回调函数
 * @param options UseObserveInit
 */
function getMutationCallback(options: UseObserveInit): MutationObserveCb {
    const { onElemAdd, onElemRemove } = options
    const traverseChildLists = (childLists: MutationRecord[]) => {
        each(childLists, childList => {
            const { addedNodes, removedNodes } = childList
            onElemAdd && each(addedNodes, child => nodeVisitor(child as HTMLElement, onElemAdd))
            onElemRemove && each(removedNodes, child => nodeVisitor(child as HTMLElement, onElemRemove))
        })
    }
    return (mutationsList: MutationRecord[]) => {
        const childLists = filter<MutationRecord>(mutationsList, item => item.type === 'childList')
        traverseChildLists(childLists);
    }
}

/**
 * 使用 mutationObserve 来观测节点变动
 * @param options UseObserveInit
 */
export default function useObserve(options: UseObserveInit): MutationObserver {
    const observeCb = getMutationCallback(options);
    const observe = new MutationObserver(observeCb);
    observe.observe(options.observeElem, observeOptions);
    return observe;
}
