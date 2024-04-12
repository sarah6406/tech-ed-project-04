//database stuff
import Database from "better-sqlite3";

const db = new Database("database.db");

// db.exec(`
//     CREATE TABLE IF NOT EXISTS comments (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT NOT NULL UNIQUE,
//         message TEXT NOT NULL
//     )
// `);

// const displayComment = db.prepare(`
//     INSERT INTO comments (username, message) VALUES (?,?)
// `);

// displayComment.run(
//     // message from frontend?
// )

function displayComment() {
  // Create a table if it doesn't exist
  db.prepare(
    `
            CREATE TABLE IF NOT EXISTS comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                message TEXT
            )
        `
  ).run();

  // sample data for testing purposes
  const messages = [
    { username: "sarah123", message: "Hello, world!" },
    { username: "bob", message: "Testing, testing, 123. " },
  ];

  // SQL preparation statement for inserting username and messages into the database
  const insertToDB = db.prepare(
    "INSERT INTO comments (username, message) VALUES (?, ?)"
  );

  // Insert each username and message into the database
  messages.forEach(({ username, message }) => {
    const insertMessage = insertToDB.run(username, message);
    console.log(insertMessage);
  });

  console.log("Success! username and messages have been added to the database");
}

// Call the displayComment function to execute seed.js
displayComment();

// try catch - error handling
// try {
//     // Create a table if it doesn't exist
//     db.prepare(
//       `
//             CREATE TABLE IF NOT EXISTS comments (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 username TEXT NOT NULL UNIQUE,
//                 message TEXT
//             )
//         `
//     ).run();

//     // Insert some sample data
//     const messages = [
//       { username: "sarah123", message: "Hello, world!" },
//       { username: "bob", message: "This is a test message." },
//     ];

//     // Prepare the SQL statement for insertion
//     const insertToDB = db.prepare(
//       "INSERT INTO comments (username, message) VALUES (?, ?)"
//     );

//     // Insert each message into the database
//     messages.forEach(({ username, message }) => {
//       const insertMessage = insertToDB.run(username, message);
//       console.log(insertMessage);
//     });

//     console.log("Data seeded successfully");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   } finally {
//     // Close the database connection
//     db.close();
//   }
// }

// // Call the displayComment function to execute the seeding process
// displayComment();
