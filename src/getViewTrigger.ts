
import { ReportState, ElemReportFun, ViewTriggerInit, ClickTriggerInit } from './types'

export default function getViewTrigger() {

    const supportObserve = (typeof IntersectionObserver !== 'undefined')
    /**
     * 
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    const getOberveCb = (elem: HTMLElement, reportState: ReportState, onElemView: ElemReportFun) => {
        const { vid, vdata } = reportState
        return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            if (!entries[0].isIntersecting) {
                return
            }
            if (reportState.hasView) {
                return
            }
            // debugger;
            reportState.hasView = true
            onElemView(vid, vdata)
            observer.unobserve(elem)
            reportState.bindView = null
        }
    }

    /**
     * 增加曝光触发上报
     * @param elem 打点元素
     * @param reportState 上报状态
     * @param onElemView 上报view方法
     */
    const addTrigger = (elem: HTMLElement, reportState: ReportState, onElemView: ElemReportFun) => {
        if (supportObserve) {
            let observer = new IntersectionObserver(
                getOberveCb(elem, reportState, onElemView)
            )
            observer.observe(elem)
            reportState.bindView = observer
        } else {
            reportState.hasView = true
            onElemView(reportState.vid, reportState.vdata)
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