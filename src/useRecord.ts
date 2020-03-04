import { UseRecordInit, Record, ElemChangeCb, RecordElemChangeCb, RecordUpdateOption } from './types'
import { some, find, each } from './utils'

export default function useRecord(options: UseRecordInit): Record {

    const { ignores } = options

    const aliveElems: HTMLElement[] = []

    const listeners: RecordElemChangeCb[] = []

    /**
     * 测试待检测元素是否在数组中
     * @param elem 待检测元素
     */
    const checkElemInAlive = (elem: HTMLElement) => some(aliveElems, item => item === elem)

    /**
     * 增加元素时调用方法
     * @param elem 新增元素
     */
    const recordElemAdd: ElemChangeCb = (elem: HTMLElement) => {
        // 不满足记录条件
        if (!elem.dataset.vid || ignores(elem)) {
            return
        }
        // 已经记录在Alive中
        if (checkElemInAlive(elem)) {
            return
        }
        aliveElems.push(elem)
        each(listeners, (listener) => listener(elem, aliveElems.length - 1, RecordUpdateOption.ADD))
    }

    /**
     * 删除元素时调用方法
     * @param elem 删除元素
     */
    const recordElemRemove: ElemChangeCb = (elem: HTMLElement) => {
        const idx = find(aliveElems, elem)
        if (idx !== -1) {
            each(listeners, (listener) => listener(elem, idx, RecordUpdateOption.REMOVE))
            aliveElems.splice(idx, 1)
        }
    }

    /**
     * 修改监听方法
     * @param onAliveElemChange 监听方法
     * @param option 增加/删除
     */
    const updateElemListener = (onAliveElemChange: RecordElemChangeCb, option: RecordUpdateOption) => {
        const listenerIdx = find(listeners, onAliveElemChange);
        if (option === RecordUpdateOption.ADD && listenerIdx === -1) {
            listeners.push(onAliveElemChange)
        }
        if (option === RecordUpdateOption.REMOVE && listenerIdx !== -1) {
            listeners.splice(listenerIdx, 1)
        }
    }

    return {
        aliveElems,
        recordElemAdd,
        recordElemRemove,
        updateElemListener
    }
}