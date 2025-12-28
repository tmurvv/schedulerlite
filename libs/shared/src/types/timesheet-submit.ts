import type {TypeOfWork} from "../enums/type-of-work";

export type TimesheetSubmit = {
    userId: string;
    projectId: string;
    start: string;
    end: string;
    lunchInMinutes: number;
    typeOfWork: TypeOfWork;
    notes?: string;
};
