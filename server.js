import { app } from "./app.js";
import { connectDB } from "./config/db.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
