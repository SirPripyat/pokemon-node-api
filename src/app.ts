import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.database();
  }

  public middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());

    dotenv.config();
    dotenv.configDotenv({
      path: ".env.local",
    });
  }

  public routes(): void {
    this.express.use(routes);
  }

  private async database(): Promise<void> {
    try {
      const databaseUrlConnection = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}`;

      mongoose.set("strictQuery", true);
      await mongoose.connect(databaseUrlConnection);
      console.log("Connect database success");
    } catch (error) {
      console.error(`Connect database fail: ${error}`);
    }
  }
}

export default new App().express;
