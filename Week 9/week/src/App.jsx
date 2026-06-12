import { useState, useEffect } from "react";
import Home from "./components/Home";
import AddBook from "./components/AddBook";
import "./App.css";

const INITIAL_BOOKS = [
  { title: "Atomic Habits", author: "James Clear", isbn: "9780735211292" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780547928227" },
  { title: "1984", author: "George Orwell", isbn: "9780451524935" },
];

function App() {
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem("books_collection");
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  useEffect(() => {
    localStorage.setItem("books_collection", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [newBook, ...prevBooks]);
  };

  return (
    <div className="app-shell">
      <div className="page-card single-page-layout">
        <section className="single-page-section single-page-section--form">
          <AddBook addBook={addBook} />
        </section>

        <section className="single-page-section">
          <Home books={books} />
        </section>
      </div>
    </div>
  );
}

export default App;
