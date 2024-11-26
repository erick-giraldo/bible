import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Download, Palette } from "lucide-react";

export interface IVerse {
  text: string;
  book_name: string;
  chapter: number;
  verse: number;
  bible_name: string;
}

const VerseView = ({
  selectedBible,
  selectedBook,
  selectedChapter,
  selectedVerse,
}: {
  selectedBible: string;
  selectedBook: string;
  selectedChapter: number;
  selectedVerse: number;
}) => {
  const [verses, setVerses] = useState<IVerse[]>([]);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [loading, setLoading] = useState(false);

  const fetchVerses = async () => {
    if (!selectedBible || !selectedBook || !selectedChapter || !selectedVerse) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://t-soluciono.com/vistas/bible/api/index.php?route=verse&bible=${selectedBible}&book=${selectedBook}&chapter=${selectedChapter}&verse=${selectedVerse}`
      );
      const data = await response.json();
      setVerses(data);
    } catch (error) {
      console.error("Error fetching verses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerses();
  }, [selectedVerse]);

  const exportImage = () => {
    const verseDisplay = document.getElementById("verse-display");
    if (verseDisplay) {
      html2canvas(verseDisplay, { 
        backgroundColor: null,
        scale: 2 
      }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = `${selectedBook}_${selectedChapter}_${selectedVerse}.png`;
        link.click();
      });
    }
  };

  const cleanVerseText = (text: string) => {
    return text
      .replace(/\\[a-z]+\s?/g, "")
      .replace(/{|}/g, "")
      .trim();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Versículo Seleccionado
        </h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <label 
              htmlFor="color-picker" 
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
            >
              <Palette className="text-gray-600" />
            </label>
            <input
              type="color"
              id="color-picker"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
            />
          </div>
          <button 
            onClick={exportImage}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
            title="Exportar como Imagen"
          >
            <Download />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse bg-gray-100 h-40 rounded-lg"></div>
      ) : (
        <div 
          id="verse-display" 
          className="p-6 rounded-lg transition-colors duration-300" 
          style={{ backgroundColor: bgColor }}
        >
          {verses.length > 0 ? (
            verses.map((verse) => (
              <div 
                key={verse.verse} 
                className="mb-4 p-4 bg-white/50 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {selectedBook} {selectedChapter}:{verse.verse}
                </h3>
                <p className="text-gray-800 leading-relaxed">
                  {cleanVerseText(verse.text)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Selecciona un versículo para mostrar
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerseView;