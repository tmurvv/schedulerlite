import bcrypt from "bcryptjs";
import { Document, Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail";

export interface IUser extends Document {
  comparePasswords(
    candidatePassword: string,
    next: (err: Error | null, same: boolean | null) => void,
  ): void;
  email: String;
  firstname: String;
  id: String;
  lastname: String;
  password: string | Buffer;
  passwordChangedAt: Date;
  projectManagerColor: String;
  projectManagerContrast: String;
  reminderLastSent: Date;
  resourceRoles: Array<String>;
  userRoles: Array<String>;
}

const userSchema = new Schema<IUser>({
  email: {
    lowercase: true,
    required: true,
    type: String,
    unique: true,
    validator: [isEmail, "Please provide a valid email address"],
  },
  firstname: { required: true, type: String },
  id: { required: true, type: String },
  lastname: { required: true, type: String },
  password: { minLength: 8, required: true, type: String },
  passwordChangedAt: { type: Date },
  projectManagerColor: { type: String },
  projectManagerContrast: { type: String },
  reminderLastSent: { type: Date },
  resourceRoles: {
    enum: ["cabinetry", "landscaper", "flooring", "painter", "plumber"],
    type: [String],
  },
  userRoles: {
    enum: ["admin", "resource", "projectManager", "user"],
    type: [String],
  },
});

userSchema.methods.comparePasswords = function (
  candidatePassword: string,
  next: (err: Error | null, same: boolean | null) => void,
) {
  bcrypt.compare(
    candidatePassword,
    this.password as string,
    function (err: Error | null, isMatch: boolean | undefined) {
      if (err) {
        next(err, null);
        return;
      }

      next(null, Boolean(isMatch));
    },
  );
};

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.password;
  },
});

userSchema.set("toObject", {
  transform: (_doc, ret) => {
    delete ret.__v;
    delete ret._id;
    delete ret.password;
  },
});

export const User = model("user", userSchema);
