import { UseRecordInit, Record, ElemChangeCb } from './types'
import { some, find } from './utils'

export default function useRecord(options: UseRecordInit): Record {

    const { ignores } = options

    const aliveElems: HTMLElement[] = []

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
    }

    /**
     * 删除元素时调用方法
     * @param elem 删除元素
     */
    const recordElemRemove: ElemChangeCb = (elem: HTMLElement) => {
        const idx = find(aliveElems, item => item === elem)
        if (idx !== -1) {
            aliveElems.splice(idx, 1)
        }
    }

    return {
        aliveElems,
        recordElemAdd,
        recordElemRemove
    }
}