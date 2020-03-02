
import { UseObserveInit } from './types'
import useObserve from './useObserve'
import useRecord from './useRecord'

function init(options: UseObserveInit) {
    const record = useRecord({
        ignores: (elem) => getComputedStyle(elem).getPropertyValue('visibility') === 'hidden'
    })
    useObserve({
        observeElem: document.body,
        onElemAdd: record.recordElemAdd, // elem => console.log('ADD', elem),
        onElemRemove: record.recordElemRemove // elem => console.log('RMM', elem)
    })

    ;(window as any).record = record
}

export default init