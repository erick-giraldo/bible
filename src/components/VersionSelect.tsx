import { useEffect, useState } from "react";

const VersionSelect = ({
  setSelectedBible,
}: {
  setSelectedBible: (bible: string) => void;
}) => {
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVersions = async () => {
    try {
      const response = await fetch(
        "https://t-soluciono.com/vistas/bible/api/index.php?route=bibles"
      );
      const data = await response.json();
      setVersions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Bible versions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
        Versión de la Biblia
      </h2>
      {loading ? (
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      ) : (
        <select
          onChange={(e) => setSelectedBible(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Seleccione una versión</option>
          {versions.map((version) => (
            <option 
              key={version.name} 
              value={version.abreviation}
              className="hover:bg-blue-100"
            >
              {version.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default VersionSelect;