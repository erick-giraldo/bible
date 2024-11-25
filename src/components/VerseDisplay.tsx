import React from 'react';

const VerseDisplay = ({ verse }: { verse: string }) => {
  const handleExport = () => {
    // Lógica para exportar el versículo como imagen
    // Puedes usar una librería como html2canvas para capturar el contenido y exportarlo
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl">Versículo Seleccionado</h2>
      <p className="mt-2">{verse}</p>
      <button onClick={handleExport} className="mt-4 bg-blue-500 text-white p-2 rounded">
        Exportar como imagen
      </button>
    </div>
  );
};

export default VerseDisplay;