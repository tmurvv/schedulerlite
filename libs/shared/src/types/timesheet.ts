import {TypeOfWork} from "../enums/type-of-work";

export type Timesheet = {
    id: string;
    userId: string;
    projectId: string;

    start: Date;
    end: Date;
    lunchInMinutes: number;

    typeOfWork: TypeOfWork;
    notes?: string;

    createdOn: Date;
    updatedOn: Date;
};
