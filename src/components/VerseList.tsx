import { Dispatch, SetStateAction, useEffect, useState } from "react";
export interface IVerse {
  text: string
  book_name: string
  chapter: number
  verse: number
  bible_name: string
}
const VerseList = ({
  selectedBible,
  selectedBook,
  selectedChapter,
  setSelectedVerse,
}: {
  selectedBible: string;
  selectedBook: string;
  selectedChapter:number;
  setSelectedVerse: Dispatch<SetStateAction<number>>
}) => {
  const [verses, setVerses] = useState<IVerse[]>([]);
  const fetchChapters = async () => {
    const response = await fetch(
      `https://t-soluciono.com/vistas/bible/api/index.php?route=verses-by-chapter&bible=${selectedBible}&book=${selectedBook}&chapter=${selectedChapter}`
    );
    const data = await response.json();
    setVerses(data);
  };

  useEffect(() => {
    if (selectedChapter) {
      fetchChapters();
    }
  }, [selectedChapter]);

  return (
    <div className="p-4">
      <h2 className="text-2xl">Selecciona un versículo {selectedChapter}</h2>
      <select
        onChange={(e) => setSelectedVerse(Number(e.target.value))}
        className="border p-2 mt-2"
      >
        <option value="">Seleccione un versiculo</option>
        {verses.map((verse) => (
          <option key={verse.verse} value={verse.verse}>
            Capítulo {verse.verse}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VerseList;
