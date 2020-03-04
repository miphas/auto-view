import { ReportInit, ReportState, RecordElemChangeCb, RecordUpdateOption } from './types'
import getViewTrigger from './getViewTrigger'
import getClickTrigger from './getClickTrigger'

export default function useReport(reportInit: ReportInit) {

    const { observeElems, onElemView, onElemClick } = reportInit

    const reportStates: ReportState[] = []

    const viewTrigger = getViewTrigger()
    const clickTrigger = getClickTrigger({ observeElems, onElemClick })

    /**
     * 获取初始化状态
     * @param elem 元素对象
     */
    const getInitState = (elem: HTMLElement) => {
        return {
            vid: elem.dataset.vid || 'unknow-vid',
            vdata: elem.dataset.vdata || undefined,
            hasView: false,
        }
    }

    /**
     * 增加监控元素曝光
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const addViewMonitor = (elem: HTMLElement, reportState: ReportState) => {
        if (reportState.bindView || reportState.hasView) {
            return
        }
        viewTrigger.addTrigger(elem, reportState, onElemView)
    }

    /**
     * 移除元素曝光监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const removeViewMonitor = (elem: HTMLElement, reportState: ReportState) => {
        if (!reportState.bindView) {
            return
        }
        viewTrigger.removeTrigger(elem, reportState)
    }

    /**
     * 增加监控元素点击
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const addClickMonitor = (elem: HTMLElement, reportState: ReportState) => {
        if (reportState.bindClick) {
            return
        }
        clickTrigger.addTrigger(elem, reportState)
    }

    /**
     * 移除点击事件监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const removeClickMonitor = (elem: HTMLElement, reportState: ReportState) => {
        if (!reportState.bindClick) {
            return
        }
        clickTrigger.removeTrigger(elem, reportState)
    }
    /**
     * 记录变化
     * @param elem 当前变动元素
     * @param idx 变动序号
     * @param option 增加/删除
     */
    const onRecordChange: RecordElemChangeCb = (elem, idx, option) => {
        if (option === RecordUpdateOption.ADD) {
            let state = getInitState(elem)
            reportStates.push(state)
            addViewMonitor(elem, state)
            addClickMonitor(elem, state)
        } else {
            let state = reportStates[idx]
            removeViewMonitor(elem, state)
            removeClickMonitor(elem, state)
            reportStates.splice(idx, 1)
        }
    }

    return onRecordChange
}