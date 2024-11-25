import { useEffect, useState } from "react";

const ChapterSelect = ({
  selectedBible,
  selectedBook,
  setSelectedChapter,
}: {
  selectedBible: string;
  selectedBook: string;
  setSelectedChapter: (chapter: number) => void;
}) => {
  const [chapters, setChapters] = useState<number[]>([]);

  const fetchChapters = async () => {
    const response = await fetch(
      `https://t-soluciono.com/vistas/bible/api/index.php?route=chapters&bible=${selectedBible}&book=${selectedBook}`
    );
    const data = await response.json();
    setChapters(data.chapters); // Asegúrate de que la API retorne los capítulos en este formato
  };

  useEffect(() => {
    if (selectedBook) {
      fetchChapters();
    }
  }, [selectedBook]);

  return (
    <div className="p-4">
      <h2 className="text-2xl">Selecciona un capítulo de {selectedBook}</h2>
      <select
        onChange={(e) => setSelectedChapter(Number(e.target.value))}
        className="border p-2 mt-2"
      >
        <option value="">Seleccione un capítulo</option>
        {chapters.map((chapter) => (
          <option key={chapter} value={chapter}>
            Capítulo {chapter}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChapterSelect;
