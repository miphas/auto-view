
import { AutoViewInit, RecordUpdateOption } from './types'
import useObserve from './useObserve'
import useRecord from './useRecord'
import useReport from './useReport'

/**
 * 自动上报打点的方法
 * @param options AutoViewInit
 * - onElemView 曝光上报
 * - onElemClick 点击上报
 * - ignores 判断不监听的元素的方法
 * - rootElement 监听变化的根节点
 */
function init(options: AutoViewInit) {
    const record = useRecord({
        ignores: options.ignores || ((elem) => getComputedStyle(elem).getPropertyValue('visibility') === 'hidden')
    })
    const observe = useObserve({
        observeElem: options.rootElement || document.body,
        onElemAdd: record.recordElemAdd,
        onElemRemove: record.recordElemRemove
    })
    const reportListener = useReport({
        observeElems: record.aliveElems,
        onElemView: options.onElemView,
        onElemClick: options.onElemClick
    })
    record.updateElemListener(reportListener, RecordUpdateOption.ADD)
}

export default init