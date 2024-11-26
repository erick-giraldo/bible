import Head from "next/head";
import { useState } from "react";
import VersionSelect from "../components/VersionSelect";
import BookSelect from "../components/BookSelect";
import ChapterSelect from "../components/ChapterSelect";
import VerseList from "../components/VerseList";
import VerseView from "../components/VerseView";

const Home = () => {
  const [selectedBible, setSelectedBible] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [selectedVerse, setSelectedVerse] = useState<number>(0);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Head>
        <title>Biblia App</title>
        <link rel="icon" href="/bible-icon.png" />
      </Head>
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Aplicación de Estudio Bíblico
          </h1>
          
          <div className="grid md:grid-cols-2 gap-4">
            <VersionSelect setSelectedBible={setSelectedBible} />
            <BookSelect 
              selectedBible={selectedBible} 
              setSelectedBook={setSelectedBook} 
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <ChapterSelect 
              selectedBible={selectedBible}
              selectedBook={selectedBook}
              setSelectedChapter={setSelectedChapter}
            />
            <VerseList 
              selectedBible={selectedBible}
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              setSelectedVerse={setSelectedVerse}
            />
          </div>
          
          <VerseView 
            selectedBible={selectedBible}
            selectedBook={selectedBook}
            selectedChapter={selectedChapter}
            selectedVerse={selectedVerse}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;