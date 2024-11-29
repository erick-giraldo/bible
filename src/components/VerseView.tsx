import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import { Download, Palette, TextCursor, Scaling } from "lucide-react";

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
  const [textColor, setTextColor] = useState<string>("#000000");
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string>("");
  const [imageWidth, setImageWidth] = useState<number>(100);
  const [transparentText, setTransparentText] = useState<boolean>(false);

  const images = [
    "/images/export/image_1.jpg",
    "/path/to/image2.jpg",
    "/path/to/image3.jpg",
    // Agrega más URLs de imágenes aquí
  ];

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
          {/* Color de fondo */}
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

          {/* Color de texto */}
          <div className="relative">
            <label 
              htmlFor="text-color-picker" 
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-full"
            >
              <TextCursor className="text-gray-600" />
            </label>
            <input
              type="color"
              id="text-color-picker"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
            />
          </div>

          {/* Exportar */}
          <button 
            onClick={exportImage}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
            title="Exportar como Imagen"
          >
            <Download />
          </button>
        </div>
      </div>

      {/* Controles adicionales */}
      <div className="flex space-x-4 mb-4">
        {/* Selector de imagen de fondo */}
        <div>
          <label htmlFor="bg-image-selector" className="block mb-2">Imagen de fondo:</label>
          <select
            id="bg-image-selector"
            onChange={(e) => setBackgroundImage(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">Ninguna</option>
            {images.map((image, index) => (
              <option key={index} value={image}>
                Imagen {index + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Control de ancho de imagen */}
        <div>
          <label htmlFor="image-width" className="block mb-2 flex items-center">
            <Scaling className="mr-2" /> Ancho (%)
          </label>
          <input
            type="range"
            id="image-width"
            min="50"
            max="150"
            value={imageWidth}
            onChange={(e) => setImageWidth(Number(e.target.value))}
            className="w-full"
          />
          <span>{imageWidth}%</span>
        </div>

        {/* Texto transparente */}
        <div>
          <label htmlFor="transparent-text" className="flex items-center">
            <input
              type="checkbox"
              id="transparent-text"
              checked={transparentText}
              onChange={(e) => setTransparentText(e.target.checked)}
              className="mr-2"
            />
            Texto sin fondo
          </label>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse bg-gray-100 h-40 rounded-lg"></div>
      ) : (
        <div 
          id="verse-display" 
          className="p-6 rounded-lg transition-colors duration-300" 
          style={{ 
            backgroundColor: bgColor, 
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: `${imageWidth}%`,
            margin: '0 auto'
          }}
        >
          {verses.length > 0 ? (
            verses.map((verse) => (
              <div 
                key={verse.verse} 
                className={`mb-4 p-4 rounded-lg shadow-sm ${
                  transparentText ? '' : ''
                }`}
              >
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{ color: textColor }}
                >
                  {selectedBook} {selectedChapter}:{verse.verse}
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: textColor }}
                >
                  {cleanVerseText(verse.text)}
                </p>
              </div> ))
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