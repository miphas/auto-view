
export type VisitCb = (elem: HTMLElement) => void

export type ElemChangeCb = VisitCb

export type TestFun<T> = (elem: T) => boolean

export type MutationObserveCb = (records: MutationRecord[]) => void

export type RecordElemChangeCb = (elem: HTMLElement, idx: number, option: RecordUpdateOption) => any

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
    updateElemListener: (onAliveElemChange: RecordElemChangeCb, option: RecordUpdateOption) => void
}

export type UseRecordInit = {
    ignores: (elem: HTMLElement) => boolean,
}

export type ReportInit = {
    onElemView: (vid: string, vdata: any) => any,
    onElemClick: (vid: string, vdata: any) => any
}

export type ReportState = {
    vid: string,
    vdata: any,
    hasView: boolean,
    bindClick?: (this: HTMLElement, ev: MouseEvent) => any
}