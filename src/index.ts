
import { AutoViewInit, RecordUpdateOption } from './types'
import useObserve from './useObserve'
import useRecord from './useRecord'
import useReport from './useReport'
import usePlugin from './usePlugin'

/**
 * 自动上报打点的方法
 * @param options AutoViewInit
 * - onElemView 曝光上报
 * - onElemClick 点击上报
 * - ignores 判断不监听的元素的方法
 * - rootElement 监听变化的根节点
 */
function init(options: AutoViewInit) {

    const plugin = usePlugin(options)

    // 初始化节点记录
    const record = useRecord({
        ignores: options.ignores || ((elem) => getComputedStyle(elem).getPropertyValue('visibility') === 'hidden')
    })

    // 变更节点记录
    const observe = useObserve({
        observeElem: options.rootElement || document.body,
        onElemAdd: record.recordElemAdd,
        onElemRemove: record.recordElemRemove
    })

    // 上报曝光、点击行为
    const report = useReport({
        observeElems: record.aliveElems,
        onElemView: options.onElemView,
        onElemClick: options.onElemClick
    })

    // 监听节点变动
    const reportListener = report.reportListener
    const pluginListener = plugin.pluginListener
    reportListener && record.updateElemListener(reportListener, RecordUpdateOption.ADD)
    pluginListener && record.updateElemListener(pluginListener, RecordUpdateOption.ADD)

}

export default init