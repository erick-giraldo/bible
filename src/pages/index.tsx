import Head from 'next/head';
import { useState } from 'react';
import VersionSelect from '../components/VersionSelect';
import BookSelect from '../components/BookSelect';
import ChapterSelect from '../components/ChapterSelect';
// Importa VerseList y VerseDisplay si los has creado
// import VerseList from '../components/VerseList';
import VerseDisplay from '../components/VerseDisplay';

const Home = () => {
  const [selectedBible, setSelectedBible] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  console.log("🚀 ~ Home ~ selectedChapter:", selectedChapter)
  const [selectedVerse, setSelectedVerse] = useState<string>('');

  return (
    <div>
      <Head>
        <title>Aplicación de la Biblia</title>
      </Head>
      <main className="container mx-auto">
        <VersionSelect setSelectedBible={setSelectedBible} />
        <BookSelect selectedBible={selectedBible} setSelectedBook={setSelectedBook} />
        <ChapterSelect selectedBible={selectedBible} selectedBook={selectedBook} setSelectedChapter={setSelectedChapter} />
        {/* Aquí puedes agregar el componente VerseList para mostrar los versículos */}
        {/* <VerseList selectedBible={selectedBible} selectedBook={selectedBook} selectedChapter={selectedChapter} setSelectedVerse={setSelectedVerse} /> */}
        {/* Aquí puedes agregar el componente VerseDisplay para mostrar el versículo seleccionado */}
        <VerseDisplay verse={selectedVerse} />
      </main>
    </div>
  );
};

export default Home;