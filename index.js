const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();

let db = null;

const dbPath = path.join(__dirname, "goodreads.db");

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("server started");
    });
  } catch (e) {
    console.log(`exception is ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.get("/books/", async (request, response) => {
  const getBookList = `
  select * 
  from 
  book 
  order by book_id;`;
  const bookArray = await db.all(getBookList);
  response.send(bookArray);
});
