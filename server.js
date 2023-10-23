const app = require("./app");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.ub9hccb.mongodb.net/jobs-api?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then((con) => console.log("DB connection succesfull"));

const port = 3000;
app.listen(port, () => {
  console.log("connected");
});
