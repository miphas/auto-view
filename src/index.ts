
import { UseObserveInit, RecordUpdateOption } from './types'
import useObserve from './useObserve'
import useRecord from './useRecord'
import useReport from './useReport'

function init(options: UseObserveInit) {
    const record = useRecord({
        ignores: (elem) => getComputedStyle(elem).getPropertyValue('visibility') === 'hidden'
    })
    const observe = useObserve({
        observeElem: document.body,
        onElemAdd: record.recordElemAdd, // elem => console.log('ADD', elem),
        onElemRemove: record.recordElemRemove // elem => console.log('RMM', elem)
    })
    const reportListener = useReport({
        observeElems: record.aliveElems,
        onElemView: (vid: string, vdata: any) => console.log('View', vid, vdata),
        onElemClick: (vid: string, vdata: any) => console.log('click', vid, vdata)
    })
    record.updateElemListener(reportListener, RecordUpdateOption.ADD)

    ;(window as any).record = record
}

export default init