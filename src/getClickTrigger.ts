
import { ClickTriggerInit, Trigger, ModTriggerFun } from './types'

export default function getClickTrigger(clickTriggerInit: ClickTriggerInit): Trigger {

    const { onElemClick } = clickTriggerInit

    /**
     * 增加点击触发上报
     * @param elem 绑定元素
     * @param reportState 上报状态
     */
    const addTrigger: ModTriggerFun = function(elem, reportState) {
        const { vid, vdata } = reportState
        reportState.bindClick = function (this, ev) { 
            // * 会触发父级元素的click 同样也会上报
            return onElemClick(vid, vdata, elem) 
        }
        elem.addEventListener('click', reportState.bindClick)
    }

    /**
     * 移除点击触发上报
     * @param elem 绑定元素
     * @param reportState 上报状态
     */
    const removeTrigger: ModTriggerFun = function(elem, reportState) {
        const { bindClick } = reportState
        if (bindClick) {
            elem.removeEventListener('click', bindClick)
        }
    }

    return {
        addTrigger,
        removeTrigger
    }
}