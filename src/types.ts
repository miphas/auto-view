
export type VisitCb = (elem: HTMLElement) => void

export type ElemChangeCb = VisitCb

export type TestFun<T> = (elem: T) => boolean

export type MutationObserveCb = (records: MutationRecord[]) => void

export type UseObserveInit = {
    observeElem: HTMLElement,
    onElemAdd?: ElemChangeCb,
    onElemRemove?: ElemChangeCb,
}

export enum RecordUpdateOption {
    ADD,
    REMOVE
}

export interface Record {
    aliveElems: HTMLElement[],
    recordElemAdd: ElemChangeCb,
    recordElemRemove: ElemChangeCb,
}

export type UseRecordInit = {
    ignores: (elem: HTMLElement) => boolean,
}