import app from "./app";

const main = () => {
  const PORT = process.env.PORT || 5500;

  try {
    app.listen(Number(PORT), async () => await console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`Error when try start server: ${error}`);
  }
};

main();
