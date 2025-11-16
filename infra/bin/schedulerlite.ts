import * as cdk from "aws-cdk-lib";
import { TimesheetsStack } from "../lib/timesheets-stack";

const app = new cdk.App();
new TimesheetsStack(app, "SchedulerLite-Timesheets");
