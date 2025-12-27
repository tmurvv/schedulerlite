import type {TypeOfWork} from "../enums/type-of-work";

export type TimesheetSubmit = {
    projectId: string;
    start: string; // ISO string
    end: string;   // ISO string
    lunchInMinutes: number;
    typeOfWork: TypeOfWork;
    notes?: string;
};
