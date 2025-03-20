import { versionTFT, swapVersionTFT } from "@stores/dataTFT.js";
import { useStore } from "@nanostores/react";
import "./SelectVersion.css"; // Archivo CSS externo

export default function SelectVersion() {
  const currentVersion = useStore(versionTFT);

  return (
    <div className="button-container">
      <button
        className={`btn ${currentVersion === "pbe" ? "active" : ""}`}
        onClick={() => swapVersionTFT("pbe")}
      >
        Set 14
      </button>
      <button
        className={`btn ${currentVersion !== "pbe" ? "active" : ""}`}
        onClick={() => swapVersionTFT("latest")}
      >
        Set 13
      </button>
    </div>
  );
}