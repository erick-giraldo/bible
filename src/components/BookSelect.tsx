import { useEffect, useState } from "react";

const BookSelect = ({
  selectedBible,
  setSelectedBook,
}: {
  selectedBible: string;
  setSelectedBook: (book: string) => void;
}) => {
  const [books, setBooks] = useState<any[]>([]);

  const fetchBooks = async () => {
    const response = await fetch(
      `https://t-soluciono.com/vistas/bible/api/index.php?route=books`
    );
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Selecciona un libro de la Biblia</h1>
      <select
        onChange={(e) => setSelectedBook(e.target.value)}
        className="border p-2 mt-2"
      >
        <option value="">Seleccione un libro</option>
        {books.map((book) => (
          <option key={book.idBook} value={book.name}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookSelect;
