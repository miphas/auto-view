import { ReportState, ViewTriggerInit } from './types';
export default function getViewTrigger(viewTriggerInit: ViewTriggerInit): {
    addTrigger: (elem: HTMLElement, reportState: ReportState) => void;
    removeTrigger: (elem: HTMLElement, reportState: ReportState) => void;
};
