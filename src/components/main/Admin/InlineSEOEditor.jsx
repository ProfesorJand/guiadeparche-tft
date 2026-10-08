import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { $superAdmin } from '@stores/auth.js';
import { constantesPHP } from '@stores/dataTFT.js';

export default function InlineSEOEditor({ textKey, currentText }) {
  const isSuperAdmin = useStore($superAdmin);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    setValue(currentText || "");
  }, [currentText]);

  useEffect(() => {
    if (!containerRef.current) return;
    const parent = containerRef.current.parentElement;
    if (!parent) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Si quieres que parezca clickeable todo el elemento padre al editar,
    // puedes descomentar la siguiente línea (opcional):
    // parent.style.position = "relative";

    parent.addEventListener('mouseenter', handleMouseEnter);
    parent.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleMouseEnter);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isSuperAdmin) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = import.meta.env.PUBLIC_TOKEN_META;
      const response = await fetch(constantesPHP, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          key: textKey,
          value: value.trim()
        }),
      });
      const result = await response.json();
      if (result.success === true) {
        alert("Texto actualizado correctamente. Refresca la página para ver los cambios.");
        setIsEditing(false);
      } else {
        alert("Error: " + (result.message || JSON.stringify(result)));
      }
    } catch (error) {
      alert("Error de red: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div ref={containerRef} style={{ display: "inline-block", verticalAlign: "middle", marginLeft: "10px", position: "absolute" }}>
      <button 
        onClick={() => setIsEditing(!isEditing)}
        style={{ 
          background: "transparent", 
          border: "none", 
          cursor: "pointer", 
          fontSize: "1rem", 
          padding: "5px",
          opacity: (isHovered || isEditing) ? 0.7 : 0.1,
          pointerEvents: (isHovered || isEditing) ? "auto" : "none",
          transition: "opacity 0.2s ease-in-out"
        }}
        title={`Editar: ${textKey}`}
      >
        ✏️
      </button>

      {isEditing && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          background: "#1a1a24",
          border: "1px solid var(--bg-purple-primary)",
          borderRadius: "8px",
          padding: "15px",
          zIndex: 9999,
          width: "400px",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontFamily: "system-ui, sans-serif"
        }}>
          <h4 style={{ margin: 0, color: "#fff", fontSize: "0.9rem" }}>
            Editando llave: <code>{textKey}</code>
          </h4>
          <p style={{ margin: 0, fontSize: "0.8rem", color: "#aaa" }}>
            Etiquetas: <code>[numeroDelSet]</code>, <code>[numeroDelParche]</code>
          </p>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "100%",
              minHeight: "180px",
              background: "#111",
              color: "#fff",
              border: "1px solid #444",
              borderRadius: "4px",
              padding: "10px",
              boxSizing: "border-box",
              fontSize: "0.9rem"
            }}
          />
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button 
              onClick={() => setIsEditing(false)}
              style={{ padding: "6px 12px", background: "#444", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
            >
              Cancelar
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              style={{ padding: "6px 12px", background: "var(--bg-purple-secondary)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
            >
              {isSaving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
