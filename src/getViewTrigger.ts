
import { ReportState, ElemReportFun, ViewTriggerInit } from './types'
import { find, filter, each } from './utils'

export default function getViewTrigger(viewTriggerInit: ViewTriggerInit) {

    const { observeElems, reportStates, onElemView } = viewTriggerInit

    const supportObserve = (typeof IntersectionObserver !== 'undefined')

    let documentObserve: IntersectionObserver

    /**
     * 观测节点回调
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    const observeCb: IntersectionObserverCallback = (entries, observer) => {
        const interEntries = filter(entries, item => item.isIntersecting)
        each(interEntries, entry => {
            const elemIdx = find(observeElems, entry.target)
            if (elemIdx === -1) {
                return
            }
            const reportState = reportStates[elemIdx]
            onElemView(reportState.vid, reportState.vdata, entry.target as HTMLElement)
            reportState.hasView = true
            documentObserve.unobserve(entry.target)
            reportState.bindView = null
        })
    }

    /**
     * 增加曝光触发上报
     * @param elem 打点元素
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    const addTrigger = (elem: HTMLElement, reportState: ReportState) => {
        if (supportObserve) {
            documentObserve = documentObserve || new IntersectionObserver(
                observeCb
            )
            documentObserve.observe(elem)
            reportState.bindView = documentObserve
        } else {
            reportState.hasView = true
            onElemView(reportState.vid, reportState.vdata, elem)
        }
    }

    /**
     * 删除曝光触发上报
     * @param elem 打点元素
     * @param reportState 上报状态
     */
    const removeTrigger = (elem: HTMLElement, reportState: ReportState) => {
        if (reportState.bindView) {
            reportState.bindView.unobserve(elem)
            reportState.bindView = null
        }
    }

    return {
        addTrigger,
        removeTrigger
    }
}