import { useEffect, useState } from "react";

const VersionSelect = ({
  setSelectedBible,
}: {
  setSelectedBible: (bible: string) => void;
}) => {
  const [versions, setVersions] = useState<any[]>([]);
  console.log("🚀 ~ versions:", versions)

  const fetchVersions = async () => {
    const response = await fetch(
      "https://t-soluciono.com/vistas/bible/api/index.php?route=bibles"
    );
    const data = await response.json();
    setVersions(data);
  };

  useEffect(() => {
    fetchVersions();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl">Selecciona una versión de la Biblia</h1>
      <select
        onChange={(e) => setSelectedBible(e.target.value)}
        className="border p-2 mt-2"
      >
        <option value="">Seleccione una versión</option>
        {versions.map((version) => (
          <option key={version.name} value={version.name}>
            {version.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VersionSelect;
