import app from "./app";

const main = () => {
  try {
    app.listen(3010, "localhost", () => console.log("server started"));
  } catch (error) {
    console.error(`Error when try start server: ${error}`);
  }
};

main();
