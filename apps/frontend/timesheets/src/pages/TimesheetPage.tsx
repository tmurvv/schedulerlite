// src/pages/TimesheetPage.tsx
import {
  Box,
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { Header } from "../components/Header";
import { TYPE_OF_WORK } from "@schedulerlite/shared/src";

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
  const now = new Date();

  const { register, handleSubmit } = useForm<TimesheetFormValues>({
    defaultValues: {
      start: toDateTimeLocalValue(now),
      end: toDateTimeLocalValue(now),
      lunchInMinutes: 0,
      typeOfWork: "",
    },
  });

  const onSubmit = (data: TimesheetFormValues) => {
    console.log("Timesheet submit", data);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Header title="" />

      <Box sx={{ p: 2 }}>
        <Paper sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
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
              label="Start Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("start", { required: true })}
            />

            <TextField
              label="End Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              {...register("end", { required: true })}
            />

            <TextField
              label="Lunch (minutes)"
              type="number"
              {...register("lunchInMinutes", { valueAsNumber: true })}
            />

            <TextField
              select
              label="Type of Work"
              defaultValue=""
              {...register("typeOfWork", { required: true })}
            >
              {TYPE_OF_WORK.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
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
