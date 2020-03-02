import { ReportInit, ReportState, RecordElemChangeCb, RecordUpdateOption } from './types'

export default function useReport(reportInit: ReportInit) {

    const { onElemView, onElemClick } = reportInit

    const reportStates: ReportState[] = []

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
     * 监控元素曝光
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const viewMonitor = (elem: HTMLElement, reportState: ReportState) => {
        // TODO mod view monitor
        const { hasView, vid, vdata } = reportState
        if (hasView) {
            return
        }
        reportState.hasView = true
        onElemView(vid, vdata)
    }

    /**
     * 移除元素曝光监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const removeViewMonitor = (elem: HTMLElement, reportState: ReportState) => {
    }

    /**
     * 监控元素点击
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const clickMonitor = (elem: HTMLElement, reportState: ReportState) => {
        const { bindClick, vid, vdata } = reportState
        if (bindClick) {
            return
        }
        reportState.bindClick = function (this, ev) { 
            // * 会触发父级元素的click 同样也会上报
            return onElemClick(vid, vdata) 
        }
        elem.addEventListener('click', reportState.bindClick)
    }

    /**
     * 移除点击事件监控
     * @param elem 变动元素
     * @param reportState 上报状态
     */
    const removeClickMonitor = (elem: HTMLElement, reportState: ReportState) => {
        const { bindClick } = reportState
        if (bindClick) {
            elem.removeEventListener('click', bindClick)
        }
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
            viewMonitor(elem, state)
            clickMonitor(elem, state)
        } else {
            let state = reportStates[idx]
            removeViewMonitor(elem, state)
            removeClickMonitor(elem, state)
            reportStates.splice(idx, 1)
        }
    }

    return onRecordChange
}