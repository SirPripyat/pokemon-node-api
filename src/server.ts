import app from "./app";

const main = () => {
  const PORT = process.env.PORT || 5500;

  console.log(PORT);

  try {
    app.listen(Number(PORT), "localhost", () => console.log("server started"));
  } catch (error) {
    console.error(`Error when try start server: ${error}`);
  }
};

main();
