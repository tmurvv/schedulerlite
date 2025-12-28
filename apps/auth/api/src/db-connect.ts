import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const createDbString = (environment: String) =>
  process.env[`DATABASE_${environment.toUpperCase()}`]!.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD!,
  );

const createDbLogString = (environment: String) =>
  process.env[`DATABASE_${environment.toUpperCase()}`]!;

export const dbConnect = async () => {
  const env = process.env.NODE_ENV || "Env var not found.";
  // const DB = createDbString(env);
  const DB = `${process.env.DB_CONNECTION_STRING}/${process.env.DEV_DB}`;

  await mongoose
    .connect(DB, {})
    .then(async () => {
      // console.log(`DB connection successful.\nDB: ${createDbLogString(env)}`);
      console.log(`DB connection successful.\nDB: ${process.env.DEV_DB}`);
    })
    .catch(() =>
      console.log(
        `DB NOT CONNECTING. PLEASE CHECK NETWORK. Environment: ${env} `,
      ),
    );
};

//
// import dotenv from "dotenv";
// import mongoose from "mongoose";
//
// dotenv.config()
//
// const createDbString = (environment: String) =>
//   process.env[`DATABASE_${environment.toUpperCase()}`]!.replace(
//     "<PASSWORD>",
//     process.env.DATABASE_PASSWORD!
//   );
//
// const createDbLogString = (environment: String) =>
//     process.env[`DATABASE_${environment.toUpperCase()}`]!;
//
// export const dbConnect = async () => {
//   const env = process.env.NODE_ENV || "Env var not found.";
//   const DB = createDbString(env!);
//
//   await mongoose
//     .connect(DB, {dbName: "ultrenos"})
//     .then(() => console.log(`DB connection successful.\nEnvironment: ${env}\nDB: ${createDbLogString(env)}`))
//     .catch(() =>
//       console.log(
//         `DB NOT CONNECTING. PLEASE CHECK NETWORK. Environment: ${env} `
//       )
//     );
// };
