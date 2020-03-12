
export type VisitCb = (elem: HTMLElement) => void

export type ElemChangeCb = VisitCb

export type TestFun<T> = (elem: T) => boolean

export type MutationObserveCb = (records: MutationRecord[]) => void

export type RecordElemChangeCb = (elem: HTMLElement, idx: number, option: RecordUpdateOption) => any

export type ElemReportFun = (vid: string, vdata: any) => any

export type ModTriggerFun = (elem: HTMLElement, reportState: ReportState) => void

export type IgnoreRuleFun = (elem: HTMLElement) => boolean

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
    ignores: IgnoreRuleFun,
}

export type ReportInit = {
    observeElems: HTMLElement[],
    onElemView: ElemReportFun,
    onElemClick: ElemReportFun
}

export type ReportState = {
    vid: string,
    vdata: any,
    hasView: boolean,
    bindView?: IntersectionObserver | null,
    bindClick?: (this: HTMLElement, ev: MouseEvent) => any | null
}

export type ViewTriggerInit = {
    observeElems: HTMLElement[],
    reportStates: ReportState[],
    onElemView: ElemReportFun
}

export type ClickTriggerInit = {
    observeElems: HTMLElement[],
    reportStates: ReportState[],
    onElemClick: ElemReportFun
}

export interface Trigger {
    addTrigger: ModTriggerFun,
    removeTrigger: ModTriggerFun
}

export interface ViewPlugin {
    create: (options: AutoViewInit) => void,
    update: RecordElemChangeCb
}

export type AutoViewInit = {
    onElemView: ElemReportFun,
    onElemClick: ElemReportFun,
    ignores?: IgnoreRuleFun,
    rootElement?: HTMLElement,
    plugins?: ViewPlugin[],
    devMode?: boolean,
}