function Home({ books = [] }) {
  return (
    <div className="home-layout">
      <header className="home-hero">
        <p className="eyebrow">Library Dashboard</p>
        <h2 className="page-title">Welcome to your smart library</h2>
        <p className="page-subtitle">
          Keep your collection organized, discover titles at a glance, and add new books instantly.
        </p>

        <div className="hero-badges">
          <span className="badge-chip">📚 {books.length} books saved</span>
          <span className="badge-chip">✨ Clean, modern shelf</span>
          <span className="badge-chip">🧠 Ready to grow</span>
        </div>
      </header>

      <section className="library-section">
        <div className="library-heading-row">
          <div>
            <p className="library-label">Current Shelf</p>
            <h3 className="library-title">Books listed below</h3>
          </div>
          <span className="library-count">{books.length} items</span>
        </div>

        {books.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-title">No books yet</h3>
            <p className="empty-description">Add your first title above to fill the shelf.</p>
          </div>
        ) : (
          <ul className="book-grid">
            {books.map((book, index) => (
              <li key={`${book.isbn || book.title}-${index}`} className="book-card">
                <div className="book-header">
                  <span className="book-tag">📖 Book</span>
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">👤 {book.author}</p>
                </div>
                <div className="book-footer">
                  <span className="book-isbn">ISBN: {book.isbn}</span>
                  <span className="mini-pill">#{index + 1}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Home;
