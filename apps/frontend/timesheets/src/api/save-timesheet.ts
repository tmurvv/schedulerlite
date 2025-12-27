// src/api/save-timesheet.ts
import {createApiClient} from "./create-api-client";

import type {TimesheetSubmit} from "@schedulerlite/shared/src";

export const saveTimesheet = async ({
                                      timesheetId,
                                      timesheet,
                                    }: {
  timesheetId: string;
  timesheet: TimesheetSubmit;
}) => {
  const {requestJson} = createApiClient();

  return requestJson({
    method: "PUT",
    path: `/v1/timesheets/${encodeURIComponent(timesheetId)}`,
    body: timesheet,
  });
};
