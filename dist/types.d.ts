export declare type VisitCb = (elem: HTMLElement) => void;
export declare type ElemChangeCb = VisitCb;
export declare type TestFun<T> = (elem: T) => boolean;
export declare type MutationObserveCb = (records: MutationRecord[]) => void;
export declare type RecordElemChangeCb = (elem: HTMLElement, idx: number, option: RecordUpdateOption) => any;
export declare type ElemReportFun = (vid: string, vdata: any) => any;
export declare type ModTriggerFun = (elem: HTMLElement, reportState: ReportState) => void;
export declare type IgnoreRuleFun = (elem: HTMLElement) => boolean;
export declare type UseObserveInit = {
    observeElem: HTMLElement;
    onElemAdd?: ElemChangeCb;
    onElemRemove?: ElemChangeCb;
};
export declare enum RecordUpdateOption {
    ADD = 0,
    REMOVE = 1
}
export interface Record {
    aliveElems: HTMLElement[];
    recordElemAdd: ElemChangeCb;
    recordElemRemove: ElemChangeCb;
    updateElemListener: (onAliveElemChange: RecordElemChangeCb, option: RecordUpdateOption) => void;
}
export declare type UseRecordInit = {
    ignores: IgnoreRuleFun;
};
export declare type ReportInit = {
    observeElems: HTMLElement[];
    onElemView: ElemReportFun;
    onElemClick: ElemReportFun;
};
export declare type ReportState = {
    vid: string;
    vdata: any;
    hasView: boolean;
    bindView?: IntersectionObserver | null;
    bindClick?: (this: HTMLElement, ev: MouseEvent) => any | null;
};
export declare type ViewTriggerInit = {
    observeElems: HTMLElement[];
    reportStates: ReportState[];
    onElemView: ElemReportFun;
};
export declare type ClickTriggerInit = {
    observeElems: HTMLElement[];
    reportStates: ReportState[];
    onElemClick: ElemReportFun;
};
export interface Trigger {
    addTrigger: ModTriggerFun;
    removeTrigger: ModTriggerFun;
}
export declare type AutoViewInit = {
    onElemView: ElemReportFun;
    onElemClick: ElemReportFun;
    ignores?: IgnoreRuleFun;
    rootElement?: HTMLElement;
};
