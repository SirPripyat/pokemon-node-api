import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";

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
  }

  public routes(): void {
    this.express.use(routes);
  }

  private async database(): Promise<void> {
    try {
      mongoose.set("strictQuery", true);
      await mongoose.connect("mongodb://localhost:27017/pokemon-node-api");
      console.log("Connect database success");
    } catch (error) {
      console.error(`Connect database fail: ${error}`);
    }
  }
}

export default new App().express;
