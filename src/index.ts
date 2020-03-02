
import { UseObserveInit } from './types'
import useObserve from './useObserve';

function init(options: UseObserveInit) {
    useObserve({
        observeElem: document.body,
        onElemAdd: elem => console.log('ADD', elem),
        onElemRemove: elem => console.log('RMM', elem)
    })
}

// function observeNode(): void {
//     const observe = new MutationObserver(mutationCallback)
//     observe.observe(document.body, {
//         attributes: false,
//         childList: true,
//         subtree: true
//     })

// }

// function mutationCallback(mutationList: MutationRecord[]): void {
//     debugger;
// }

export default init