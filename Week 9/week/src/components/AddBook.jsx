import { useState } from "react";

function AddBook({ addBook }) {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = bookTitle.trim();
    const authorName = author.trim();
    const isbnCode = isbn.trim();

    if (!title || !authorName || !isbnCode) {
      setMessage("Please fill in all fields before adding a book.");
      return;
    }

    addBook({ title, author: authorName, isbn: isbnCode });
    setMessage(`“${title}” by ${authorName} has been added to your shelf.`);
    setBookTitle("");
    setAuthor("");
    setIsbn("");
  };

  return (
    <div>
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-field">
          <label htmlFor="title">Book Title</label>
          <input
            id="title"
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
            aria-label="Book Title"
            placeholder="Enter title"
          />
        </div>

        <div className="form-field">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            aria-label="Author Name"
            placeholder="Enter author"
          />
        </div>

        <div className="form-field">
          <label htmlFor="isbn">ISBN</label>
          <input
            id="isbn"
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
            aria-label="ISBN Number"
            placeholder="Enter ISBN"
          />
        </div>

        <button type="submit" className="submit-btn">Add Book</button>
      </form>

      <h3>{message}</h3>
    </div>
  );
}

export default AddBook;
