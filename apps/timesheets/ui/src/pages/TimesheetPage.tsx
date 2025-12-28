import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { saveTimesheet } from "../api/save-timesheet";
import type { TypeOfWork } from "@schedulerlite/shared/src";
import { TYPE_OF_WORK } from "@schedulerlite/shared/src";

type TimesheetFormValues = {
  end: string;
  lunchInMinutes: number;
  notes?: string;
  projectId: string;
  start: string;
  typeOfWork?: string;
};

const toDateTimeLocalValue = (dateValue: Date) => {
  const day = String(dateValue.getDate()).padStart(2, "0");
  const hours = String(dateValue.getHours()).padStart(2, "0");
  const minutes = String(dateValue.getMinutes()).padStart(2, "0");
  const month = String(dateValue.getMonth() + 1).padStart(2, "0");
  const year = String(dateValue.getFullYear());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const TimesheetPage = () => {
  const getDefaultValues = () => {
    const now = new Date();
    return {
      end: toDateTimeLocalValue(now),
      lunchInMinutes: 0,
      notes: "",
      projectId: "",
      start: toDateTimeLocalValue(now),
      typeOfWork: "",
    };
  };

  const { control, handleSubmit, register, reset, setValue } =
      useForm<TimesheetFormValues>({
        defaultValues: getDefaultValues(),
      });

  const onSubmit = async (data: TimesheetFormValues) => {
    try {
      const timesheetId = crypto.randomUUID();

      await saveTimesheet({
        timesheetId,
        timesheet: {
          end: data.end,
          lunchInMinutes: data.lunchInMinutes,
          notes: data.notes,
          projectId: data.projectId,
          start: data.start,
          typeOfWork: data.typeOfWork as TypeOfWork,
          userId: "7ed71ee6-ecc5-4a54-8f3e-c2230c0872d3",
        },
      });

      reset(getDefaultValues());
      setValue("typeOfWork", "", { shouldValidate: false });
    } catch (error) {
      const message =
          error instanceof Error ? error.message : "Failed to save timesheet";
      alert(message);
    }
  };

  return (
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Header title="" />

        <Box sx={{ p: 2 }}>
          <Paper sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
            <Typography sx={{ mb: 2 }} variant="h6">
              Timesheet
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                  label="Project ID"
                  {...register("projectId", { required: true })}
              />

              <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Start Time"
                  type="datetime-local"
                  {...register("start", { required: true })}
              />

              <TextField
                  InputLabelProps={{ shrink: true }}
                  label="End Time"
                  type="datetime-local"
                  {...register("end", { required: true })}
              />

              <TextField
                  label="Lunch (minutes)"
                  type="number"
                  {...register("lunchInMinutes", { valueAsNumber: true })}
              />

              <Controller
                  control={control}
                  name="typeOfWork"
                  rules={{ required: true }}
                  render={({ field }) => (
                      <TextField
                          label="Type of Work"
                          onChange={field.onChange}
                          select
                          value={field.value ?? ""}
                      >
                        {TYPE_OF_WORK.map((typeOfWorkValue) => (
                            <MenuItem key={typeOfWorkValue} value={typeOfWorkValue}>
                              {typeOfWorkValue}
                            </MenuItem>
                        ))}
                      </TextField>
                  )}
              />

              <TextField
                  label="Notes"
                  multiline
                  rows={3}
                  {...register("notes")}
              />

              <Button color="secondary" type="submit" variant="contained">
                Save Timesheet
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
  );
};
