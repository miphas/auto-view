import { UseRecordInit, Record } from './types'
import { some, find } from './utils'

export default function useRecord(options: UseRecordInit) {

    const { ignores } = options

    const aliveElems: HTMLElement[] = []

    const checkElemInAlive = (elem: HTMLElement) => some(aliveElems, item => item === elem)

    const recordElemAdd = (elem: HTMLElement) => {
        // 不满足记录条件
        if (!elem.dataset.vid || ignores(elem)) {
            return;
        }
        // 已经记录在Alive中
        if (checkElemInAlive(elem)) {
            return;
        }
        aliveElems.push(elem)
    }

    const recordElemRemove = (elem: HTMLElement) => {
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