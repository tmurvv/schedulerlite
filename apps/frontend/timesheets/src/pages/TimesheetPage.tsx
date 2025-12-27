// src/pages/TimesheetPage.tsx
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {useForm} from "react-hook-form";

import {Header} from "../components/Header";
import {saveTimesheet} from "../api/save-timesheet";
import type {TypeOfWork} from "@schedulerlite/shared/src";
import {TYPE_OF_WORK} from "@schedulerlite/shared/src";

type TimesheetFormValues = {
  projectId: string;
  start: string;
  end: string;
  lunchInMinutes: number;
  typeOfWork: string;
  notes?: string;
};

const toDateTimeLocalValue = (dateValue: Date) => {
  const year = String(dateValue.getFullYear());
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const day = String(dateValue.getDate()).padStart(2, "0");
  const hours = String(dateValue.getHours()).padStart(2, "0");
  const minutes = String(dateValue.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const TimesheetPage = () => {
  const getDefaultValues = () => {
    const now = new Date();
    return {
      projectId: "",
      start: toDateTimeLocalValue(now),
      end: toDateTimeLocalValue(now),
      lunchInMinutes: 0,
      typeOfWork: "",
      notes: "",
    };
  };

  const {register, handleSubmit, reset} = useForm<TimesheetFormValues>({
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (data: TimesheetFormValues) => {
    try {
      const timesheetId = crypto.randomUUID();

      await saveTimesheet({
        timesheetId,
        timesheet: {
          userId: "7ed71ee6-ecc5-4a54-8f3e-c2230c0872d3",
          projectId: data.projectId,
          start: data.start,
          end: data.end,
          lunchInMinutes: data.lunchInMinutes,
          typeOfWork: data.typeOfWork,
          notes: data.notes,
        },
      });

      reset(getDefaultValues());
    } catch (error) {
      const message =
          error instanceof Error ? error.message : "Failed to save timesheet";
      alert(message);
    }
  };

  return (
      <Box sx={{minHeight: "100vh", bgcolor: "background.default"}}>
        <Header title="" />

        <Box sx={{p: 2}}>
          <Paper sx={{maxWidth: 600, mx: "auto", p: 3}}>
            <Typography variant="h6" sx={{mb: 2}}>
              Timesheet
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{display: "flex", flexDirection: "column", gap: 2}}
            >
              <TextField
                  label="Project ID"
                  {...register("projectId", {required: true})}
              />

              <TextField
                  label="Start Time"
                  type="datetime-local"
                  InputLabelProps={{shrink: true}}
                  {...register("start", {required: true})}
              />

              <TextField
                  label="End Time"
                  type="datetime-local"
                  InputLabelProps={{shrink: true}}
                  {...register("end", {required: true})}
              />

              <TextField
                  label="Lunch (minutes)"
                  type="number"
                  {...register("lunchInMinutes", {valueAsNumber: true})}
              />

              <TextField
                  select
                  label="Type of Work"
                  defaultValue=""
                  {...register("typeOfWork", {
                    required: true,
                    setValueAs: (value) =>
                        value === "" ? undefined : (value as TypeOfWork),
                  })}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>

                {TYPE_OF_WORK.map((typeOfWorkValue) => (
                    <MenuItem key={typeOfWorkValue} value={typeOfWorkValue}>
                      {typeOfWorkValue}
                    </MenuItem>
                ))}
              </TextField>

              <TextField
                  label="Notes"
                  multiline
                  rows={3}
                  {...register("notes")}
              />

              <Button type="submit" variant="contained" color="secondary">
                Save Timesheet
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
  );
};
