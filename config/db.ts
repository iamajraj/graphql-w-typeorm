import { DataSource } from "typeorm";
import { User } from "../models/User";

export const AppDataSouce = new DataSource({
  type: "sqlite",
  database: "../db/mydb.db",
  entities: [User],
  synchronize: true,
});

export const userRepo = AppDataSouce.getRepository(User);
