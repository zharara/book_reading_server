const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/library", {
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iwmsf6q.mongodb.net/?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

mongoose.set("debug", (collectionName, method, query, doc) => {
  console.log(`${collectionName}.${method}`, JSON.stringify(query), doc);
});

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("Database connected successfully");
});

module.exports = db;
