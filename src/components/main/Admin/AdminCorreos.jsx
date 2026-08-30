import React, { useState, useEffect, useMemo } from 'react';
import style from './css/AdminCorreos.module.css';

export default function AdminCorreos() {
    const [activeTab, setActiveTab] = useState("envios");
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState("");
    const [testUser, setTestUser] = useState({ nombre: "", email: "", pais: "Argentina" });
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [incluirMp, setIncluirMp] = useState(false);
    const [filtroPais, setFiltroPais] = useState("Todos");
    const [reenviar, setReenviar] = useState(false);
    const [asunto, setAsunto] = useState("¿Qué jugarías con esta salida en TFT? 👀");
    
    const [trackingData, setTrackingData] = useState(null);
    const [trackingLoading, setTrackingLoading] = useState(false);

    // Nuevos estados para filtros, ordenamiento y paginación
    const [filters, setFilters] = useState({ campana: '', estado: '', abierto: '', minClics: '', search: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'fecha_intento', direction: 'desc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 100;

    // --- ESTADOS DEL EDITOR DE PLANTILLAS ---
    const [editorTemplate, setEditorTemplate] = useState("");
    const [editorContent, setEditorContent] = useState("");
    const [previewContent, setPreviewContent] = useState("");
    const partialsCacheRef = React.useRef({});
    const [editorLoading, setEditorLoading] = useState(false);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [newTemplateName, setNewTemplateName] = useState("");
    const [cloneBase, setCloneBase] = useState("plantilla_inicial.html");
    const [showCreateMenu, setShowCreateMenu] = useState(false);

    // Nuevos estados para subida de imágenes
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    useEffect(() => {
        fetchTemplates();
        fetchTrackingData();
    }, []);

    // Actualizar Previsualización y cargar subplantillas dinámicamente
    useEffect(() => {
        const renderPreview = async () => {
            let content = editorContent;
            const regex = /\{\{([a-zA-Z0-9_\-]+\.html)\}\}/g;
            const matches = [...content.matchAll(regex)];
            
            for (const match of matches) {
                const partialName = match[1];
                if (partialsCacheRef.current[partialName] === undefined) {
                    partialsCacheRef.current[partialName] = ""; // Evitar multiples llamados
                    try {
                        const res = await fetch(`https://api.guiadeparche.com/tft/templates_html/subplantillas/obtener_subplantillas.php?file=${partialName}`);
                        if (res.ok) {
                            const data = await res.json();
                            if (data.content !== undefined) {
                                partialsCacheRef.current[partialName] = data.content;
                            } else {
                                partialsCacheRef.current[partialName] = `<!-- No se encontró ${partialName} -->`;
                            }
                        } else {
                            partialsCacheRef.current[partialName] = `<!-- Error en servidor para ${partialName} -->`;
                        }
                    } catch(e) {
                        partialsCacheRef.current[partialName] = `<!-- Error cargando ${partialName} -->`;
                    }
                }
            }
            
            // Reemplazar las subplantillas
            let finalHtml = content.replace(regex, (m, name) => partialsCacheRef.current[name] || "");
            
            // Reemplazar variables comunes para una mejor vista previa
            finalHtml = finalHtml.replace(/\{\{nombre\}\}/g, "Estratega");
            finalHtml = finalHtml.replace(/\{\{usuario_id\}\}/g, "12345");
            finalHtml = finalHtml.replace(/\{\{campana\}\}/g, "preview");
            
            setPreviewContent(finalHtml);
        };
        
        const timer = setTimeout(() => {
            if (editorContent) renderPreview();
        }, 500); // 500ms debounce
        
        return () => clearTimeout(timer);
    }, [editorContent]);

    const fetchTemplates = () => {
        fetch('https://api.guiadeparche.com/tft/templates_html/listar_templates.php')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setTemplates(data);
                    if (data.length > 0 && !selectedTemplate) {
                        setSelectedTemplate(data[0]);
                    }
                }
            })
            .catch(e => console.error("Error cargando templates:", e));
    };

    const fetchTrackingData = async () => {
        setTrackingLoading(true);
        try {
            const res = await fetch('https://api.guiadeparche.com/tft/correos/obtener_seguimiento_correos.php');
            const data = await res.json();
            if (data.success) {
                setTrackingData(data);
            }
        } catch (e) {
            console.error("Error cargando seguimiento:", e);
        }
        setTrackingLoading(false);
    };

    // --- LÓGICA DEL EDITOR DE PLANTILLAS ---
    const fetchTemplateContent = async (filename) => {
        setEditorLoading(true);
        try {
            const res = await fetch(`https://api.guiadeparche.com/tft/templates_html/obtener_template.php?file=${filename}`);
            const data = await res.json();
            if (data.content !== undefined) {
                setEditorContent(data.content);
                setEditorTemplate(filename);
                setIsCreatingNew(false);
                setShowCreateMenu(false);
            } else {
                alert("Error al cargar: " + (data.error || "Desconocido"));
            }
        } catch (e) {
            console.error(e);
            alert("Error de red al cargar la plantilla.");
        }
        setEditorLoading(false);
    };

    const handleCreateNewTemplate = async () => {
        if (!newTemplateName) {
            alert("Debes ingresar un nombre para la nueva plantilla");
            return;
        }
        
        let finalName = newTemplateName.trim().replace(/\s+/g, '_');
        if (!finalName.endsWith('.html')) finalName += '.html';
        
        if (templates.includes(finalName)) {
            alert("Ese nombre ya existe. Elige otro.");
            return;
        }

        setEditorLoading(true);
        try {
            const res = await fetch(`https://api.guiadeparche.com/tft/templates_html/obtener_template.php?file=${cloneBase}`);
            const data = await res.json();
            if (data.content !== undefined) {
                setEditorContent(data.content);
                setEditorTemplate(finalName);
                setIsCreatingNew(true);
                setShowCreateMenu(false);
                setNewTemplateName("");
            } else {
                alert("Error al cargar la plantilla base: " + data.error);
            }
        } catch (e) {
            console.error(e);
            alert("Error de red al clonar la plantilla base.");
        }
        setEditorLoading(false);
    };

    const saveTemplate = async () => {
        if (!confirm(`¿Estás seguro de guardar los cambios en ${editorTemplate}?`)) return;
        setEditorLoading(true);
        try {
            const res = await fetch('https://api.guiadeparche.com/tft/templates_html/guardar_template.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filename: editorTemplate,
                    content: editorContent,
                    isNew: isCreatingNew
                })
            });
            const data = await res.json();
            if (data.success) {
                alert("¡Plantilla guardada con éxito!");
                setIsCreatingNew(false);
                if (!templates.includes(data.filename)) {
                    setTemplates([...templates, data.filename]);
                }
            } else {
                alert("Error: " + data.message);
            }
        } catch (e) {
            console.error(e);
            alert("Error de red al guardar.");
        }
        setEditorLoading(false);
    };

    const handleImageUpload = async () => {
        if (!selectedImage) {
            alert("Selecciona una imagen primero.");
            return;
        }

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('imagen', selectedImage);

        try {
            const res = await fetch('https://api.guiadeparche.com/tft/templates_html/subir_imagen.php', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.success) {
                setUploadedImageUrl(data.url);
                setSelectedImage(null);
                // Reseteamos el input file
                document.getElementById('imageUploaderInput').value = "";
            } else {
                alert("Error: " + data.message);
            }
        } catch (e) {
            console.error(e);
            alert("Error de red al subir la imagen.");
        }
        setUploadingImage(false);
    };

    // --- FUNCIONES DE ENVÍO ---
    const sendTestEmail = async () => {
        if (!testUser.nombre || !testUser.email) {
            if (!confirm("No has ingresado nombre/correo. Se enviará a los usuarios por defecto (Juan y Jorge). ¿Continuar?")) return;
        }
        setLoading(true);
        setLogs("Enviando correo de prueba...\n");
        try {
            const res = await fetch('https://api.guiadeparche.com/tft/correos/prueba_correo_html.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    ...testUser, 
                    template: selectedTemplate || "correo_lanzamiento_MP_argentina.html",
                    asunto: asunto
                })
            });
            const text = await res.text();
            setLogs(prev => prev + text);
        } catch (e) {
            setLogs(prev => prev + "\nError de red al intentar enviar: " + e.message);
        }
        setLoading(false);
    };

    const sendBatchEmail = async () => {
        if (!selectedTemplate) {
            alert("Por favor selecciona una plantilla HTML primero.");
            return;
        }
        if (!confirm(`⚠️ ADVERTENCIA: Esto iniciará el envío automático de la plantilla '${selectedTemplate}' a los usuarios de ${filtroPais === 'Todos' ? 'TODOS los países' : filtroPais}.\nEl proceso se hará en lotes de 50 para proteger el servidor.\n¿Estás completamente seguro de continuar?`)) return;
        
        setLoading(true);
        setLogs(`Iniciando envío automático por lotes...\nPlantilla: ${selectedTemplate}\nPaís: ${filtroPais}\nIncluir usuarios con Master Plan: ${incluirMp ? 'Sí' : 'No'}\nReenviar: ${reenviar ? 'Sí' : 'No'}\n\n`);
        
        let quedanUsuarios = true;
        let loteNum = 1;

        while (quedanUsuarios) {
            setLogs(prev => prev + `\n--- Iniciando Lote #${loteNum} ---\n`);
            
            try {
                const res = await fetch('https://api.guiadeparche.com/tft/correos/enviar_correo_html.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        template: selectedTemplate,
                        incluir_mp: incluirMp,
                        asunto: asunto,
                        pais: filtroPais,
                        reenviar: reenviar
                    })
                });
                const text = await res.text();
                setLogs(prev => prev + text);

                if (text.includes("No hay usuarios pendientes") || text.includes("Total procesados en este lote: 0") || text.includes("Error:")) {
                    quedanUsuarios = false;
                    if (text.includes("Error:")) {
                        setLogs(prev => prev + "\n\n❌ El proceso se detuvo porque ocurrió un error en el servidor PHP.");
                    } else {
                        setLogs(prev => prev + "\n\n✅ ¡Envío masivo completado! Todos los correos han sido enviados.");
                    }
                } else {
                    loteNum++;
                    setLogs(prev => prev + "\nEsperando 10 segundos antes de enviar el siguiente lote para proteger el servidor...\n");
                    await new Promise(resolve => setTimeout(resolve, 10000));
                }
            } catch (e) {
                setLogs(prev => prev + "\nError de red al intentar enviar: " + e.message);
                quedanUsuarios = false;
            }
        }
        setLoading(false);
    };

    const clearLogs = () => {
        setLogs("");
    };

    // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
    const handleSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const processedUsers = useMemo(() => {
        if (!trackingData || !trackingData.users) return [];

        let filtered = trackingData.users.filter(u => {
            if (filters.campana && u.campana !== filters.campana) return false;
            if (filters.estado && u.estado !== filters.estado) return false;
            if (filters.abierto) {
                const isOpened = u.leido == 1;
                if (filters.abierto === 'si' && !isOpened) return false;
                if (filters.abierto === 'no' && isOpened) return false;
            }
            if (filters.minClics !== '') {
                if (parseInt(u.clics || 0, 10) < parseInt(filters.minClics, 10)) return false;
            }
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchEmail = (u.email || '').toLowerCase().includes(searchLower);
                const matchNombre = (u.nombre || '').toLowerCase().includes(searchLower);
                if (!matchEmail && !matchNombre) return false;
            }
            return true;
        });

        filtered.sort((a, b) => {
            let valA = a[sortConfig.key];
            let valB = b[sortConfig.key];

            if (sortConfig.key === 'leido' || sortConfig.key === 'clics') {
                valA = parseInt(valA || 0, 10);
                valB = parseInt(valB || 0, 10);
            } else if (sortConfig.key === 'master_plan') {
                valA = parseInt(valA || 0, 10);
                valB = parseInt(valB || 0, 10);
            } else if (sortConfig.key === 'fecha_intento') {
                valA = new Date(valA).getTime();
                valB = new Date(valB).getTime();
            } else {
                valA = (valA || '').toString().toLowerCase();
                valB = (valB || '').toString().toLowerCase();
            }

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [trackingData, filters, sortConfig]);

    const totalPages = Math.ceil(processedUsers.length / itemsPerPage) || 1;
    const currentUsers = processedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const uniqueCampaigns = useMemo(() => {
        if (!trackingData || !trackingData.users) return [];
        return [...new Set(trackingData.users.map(u => u.campana))].filter(Boolean);
    }, [trackingData]);

    const uniqueEstados = useMemo(() => {
        if (!trackingData || !trackingData.users) return [];
        return [...new Set(trackingData.users.map(u => u.estado))].filter(Boolean);
    }, [trackingData]);

    const dynamicStats = useMemo(() => {
        if (!trackingData || !trackingData.users) return null;
        
        const totalUsersCount = trackingData.users.length;
        let sent = 0;
        let failed = 0;
        let opened = 0;
        let clicks = 0;
        let buyersMP = 0;
        let revARS = 0;
        let revUSD = 0;

        const uniqueEmails = new Set();

        processedUsers.forEach(u => {
            if (u.estado === 'enviado') {
                sent++;
            } else if (u.estado !== 'no contactado' && u.estado !== '' && u.estado) {
                failed++; 
            }

            if (u.leido == 1) opened++;
            clicks += parseInt(u.clics || 0, 10);
            
            if (!uniqueEmails.has(u.email)) {
                uniqueEmails.add(u.email);
                if (u.master_plan == 1) buyersMP++;
                revARS += parseFloat(u.acumulativo_mercadopago_pagos || 0);
                revUSD += parseFloat(u.acumulativo_cripto_pagos_usd || 0);
            }
        });

        return { totalUsersCount, sent, failed, opened, clicks, buyersMP, revARS, revUSD };
    }, [processedUsers, trackingData]);

    return (
        <div className={style.container} style={{ maxWidth: activeTab === 'plantillas' ? '98%' : '1200px' }}>
            <h2>Gestión de Correos y Newsletters</h2>
            
            <div className={style.tabsContainer}>
                <button 
                    className={`${style.tabBtn} ${activeTab === 'envios' ? style.activeTab : ''}`}
                    onClick={() => setActiveTab('envios')}
                >
                    ✉️ Envíos
                </button>
                <button 
                    className={`${style.tabBtn} ${activeTab === 'seguimiento' ? style.activeTab : ''}`}
                    onClick={() => setActiveTab('seguimiento')}
                >
                    📊 Seguimiento
                </button>
                <button 
                    className={`${style.tabBtn} ${activeTab === 'plantillas' ? style.activeTab : ''}`}
                    onClick={() => setActiveTab('plantillas')}
                >
                    🎨 Plantillas
                </button>
            </div>
            
            {activeTab === 'plantillas' && (
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {/* Selector de plantilla */}
                        <div style={{ flex: '1', minWidth: '300px', background: '#131824', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                            <h3 style={{ marginTop: 0, color: '#00d4ff' }}>Editar Existente</h3>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select 
                                    value={editorTemplate}
                                    onChange={e => fetchTemplateContent(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#0a0d14', color: '#fff', flex: '1' }}
                                >
                                    <option value="" disabled>Selecciona una plantilla...</option>
                                    {templates.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                                <button 
                                    onClick={() => fetchTemplates()}
                                    style={{ padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '6px', cursor: 'pointer' }}
                                    title="Actualizar lista"
                                >🔄</button>
                            </div>
                        </div>

                        {/* Creador de nueva plantilla */}
                        <div style={{ flex: '1', minWidth: '300px', background: '#131824', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showCreateMenu ? '15px' : '0' }}>
                                <h3 style={{ margin: 0, color: '#00ff88' }}>Nueva Plantilla</h3>
                                <button 
                                    onClick={() => setShowCreateMenu(!showCreateMenu)}
                                    style={{ padding: '8px 15px', background: showCreateMenu ? '#444' : '#00ff88', color: showCreateMenu ? '#fff' : '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    {showCreateMenu ? 'Cancelar' : '➕ Crear'}
                                </button>
                            </div>
                            
                            {showCreateMenu && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#a0a6b8', marginBottom: '5px' }}>Clonar diseño desde:</label>
                                        <select 
                                            value={cloneBase}
                                            onChange={e => setCloneBase(e.target.value)}
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#0a0d14', color: '#fff' }}
                                        >
                                            <option value="plantilla_inicial.html">⭐️ plantilla_inicial.html (Predeterminado)</option>
                                            {templates.filter(t => t !== 'plantilla_inicial.html').map(t => (
                                                <option key={t} value={t}>📄 {t}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.85rem', color: '#a0a6b8', marginBottom: '5px' }}>Nombre del nuevo archivo (sin espacios):</label>
                                        <input 
                                            type="text" 
                                            placeholder="ej: promo_navidad" 
                                            value={newTemplateName}
                                            onChange={e => setNewTemplateName(e.target.value.replace(/\s+/g, '_'))}
                                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #444', background: '#0a0d14', color: '#fff' }}
                                        />
                                    </div>
                                    <button 
                                        onClick={handleCreateNewTemplate}
                                        disabled={editorLoading}
                                        style={{ width: '100%', padding: '10px', background: '#00ff88', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        {editorLoading ? 'Cargando...' : 'Empezar a editar'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Subida de Imágenes */}
                        <div style={{ flex: '1', minWidth: '300px', background: '#131824', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                            <h3 style={{ marginTop: 0, color: '#ffb800' }}>🖼️ Galería de Imágenes</h3>
                            <p style={{ fontSize: '0.85rem', color: '#a0a6b8', marginBottom: '10px' }}>Sube imágenes para usarlas en tus plantillas.</p>
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input 
                                    id="imageUploaderInput"
                                    type="file" 
                                    accept="image/*"
                                    onChange={e => setSelectedImage(e.target.files[0])}
                                    style={{ padding: '8px', borderRadius: '6px', border: '1px dashed #444', background: '#0a0d14', color: '#fff', width: '100%' }}
                                />
                                <button 
                                    onClick={handleImageUpload}
                                    disabled={uploadingImage || !selectedImage}
                                    style={{ width: '100%', padding: '10px', background: (!selectedImage || uploadingImage) ? '#444' : '#ffb800', color: '#000', border: 'none', borderRadius: '6px', cursor: (!selectedImage || uploadingImage) ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                                >
                                    {uploadingImage ? 'Subiendo...' : 'Subir Imagen'}
                                </button>

                                {uploadedImageUrl && (
                                    <div style={{ marginTop: '10px', padding: '10px', background: '#0a0d14', border: '1px solid #00ff88', borderRadius: '6px' }}>
                                        <div style={{ fontSize: '0.85rem', color: '#00ff88', fontWeight: 'bold', marginBottom: '5px' }}>✅ ¡Subida exitosa! Copia esta URL:</div>
                                        <input 
                                            type="text" 
                                            readOnly 
                                            value={uploadedImageUrl}
                                            onClick={e => { e.target.select(); navigator.clipboard.writeText(e.target.value); }}
                                            style={{ width: '100%', padding: '8px', background: '#222', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.8rem', cursor: 'pointer' }}
                                            title="Clic para copiar"
                                        />
                                        <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '5px' }}>&lt;img src="<span style={{color: '#fff'}}>pega_la_url_aqui</span>" /&gt;</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {editorTemplate && (
                        <div style={{ background: '#131824', padding: '20px', borderRadius: '8px', border: '1px solid #444' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <div>
                                    <h3 style={{ margin: 0, color: '#fff' }}>Editando: <span style={{ color: isCreatingNew ? '#00ff88' : '#00d4ff' }}>{editorTemplate}</span></h3>
                                    {isCreatingNew && <span style={{ fontSize: '0.85rem', color: '#00ff88' }}>✨ Archivo nuevo (Aún no guardado)</span>}
                                </div>
                                <button 
                                    onClick={saveTemplate}
                                    disabled={editorLoading}
                                    style={{ padding: '12px 25px', background: '#ffb800', color: '#000', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
                                >
                                    {editorLoading ? 'Guardando...' : '💾 Guardar Cambios en GoDaddy'}
                                </button>
                            </div>

                            <div style={{ display: 'flex', gap: '20px', height: '600px' }}>
                                {/* Editor (Izquierda) */}
                                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ background: '#222', padding: '10px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: '#a0a6b8', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        👨‍💻 Código HTML
                                    </div>
                                    <textarea
                                        value={editorContent}
                                        onChange={e => setEditorContent(e.target.value)}
                                        spellCheck="false"
                                        style={{ flex: '1', width: '100%', padding: '15px', background: '#0a0d14', color: '#a0a6b8', border: '1px solid #444', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontFamily: 'monospace', fontSize: '14px', resize: 'none', outline: 'none' }}
                                    />
                                </div>
                                
                                {/* Previsualización (Derecha) */}
                                <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ background: '#222', padding: '10px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', color: '#a0a6b8', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        👀 Previsualización en vivo
                                    </div>
                                    <iframe
                                        title="preview"
                                        srcDoc={previewContent}
                                        style={{ flex: '1', width: '100%', background: '#fff', border: '1px solid #444', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {activeTab === 'envios' && (
                <>
                    <p>Desde aquí puedes disparar los scripts de envío alojados en tu servidor.</p>
                    
                    <div className={style.testForm}>
                        <h3>Enviar Prueba Personalizada</h3>
                        <p>Déjalo vacío para enviar a Juan y Jorge por defecto.</p>
                        <div className={style.formGroupRow}>
                            <input type="text" placeholder="Nombre" value={testUser.nombre} onChange={e => setTestUser({...testUser, nombre: e.target.value})} />
                            <input type="email" placeholder="Correo Electrónico" value={testUser.email} onChange={e => setTestUser({...testUser, email: e.target.value})} />
                            <input type="text" placeholder="País" value={testUser.pais} onChange={e => setTestUser({...testUser, pais: e.target.value})} />
                        </div>
                    </div>

                    <div className={style.testForm} style={{ marginTop: '20px' }}>
                        <h3>Opciones de Campaña Masiva</h3>
                        <p>Configura a quién y qué enviar antes de disparar el lote de correos reales.</p>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Plantilla HTML:</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <select 
                                        value={selectedTemplate} 
                                        onChange={e => setSelectedTemplate(e.target.value)}
                                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', minWidth: '280px', fontSize: '1rem' }}
                                    >
                                        {templates.length === 0 ? <option value="">Cargando plantillas...</option> : null}
                                        {templates.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    <button 
                                        onClick={() => fetchTemplates()}
                                        style={{ padding: '10px', background: '#222', color: '#fff', border: '1px solid #444', borderRadius: '6px', cursor: 'pointer' }}
                                        title="Actualizar lista"
                                    >🔄</button>
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>País:</label>
                                <select 
                                    value={filtroPais} 
                                    onChange={e => setFiltroPais(e.target.value)}
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', minWidth: '150px', fontSize: '1rem' }}
                                >
                                    <option value="Todos">Todos</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Chile">Chile</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="España">España</option>
                                    <option value="México">México</option>
                                    <option value="Perú">Perú</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Asunto del Correo:</label>
                                <input 
                                    type="text" 
                                    value={asunto} 
                                    onChange={e => setAsunto(e.target.value)} 
                                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', minWidth: '350px', fontSize: '1rem' }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '25px', width: '100%' }}>
                                <input 
                                    type="checkbox" 
                                    id="incluir_mp"
                                    checked={incluirMp} 
                                    onChange={e => setIncluirMp(e.target.checked)} 
                                    style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                />
                                <label htmlFor="incluir_mp" style={{ cursor: 'pointer', fontSize: '1rem', color: '#ffb800', fontWeight: 'bold' }}>
                                    Incluir usuarios que YA compraron el Master Plan
                                </label>
                                
                                <input 
                                    type="checkbox" 
                                    id="reenviar"
                                    checked={reenviar} 
                                    onChange={e => setReenviar(e.target.checked)} 
                                    style={{ width: '20px', height: '20px', cursor: 'pointer', marginLeft: '15px' }}
                                />
                                <label htmlFor="reenviar" style={{ cursor: 'pointer', fontSize: '1rem', color: '#ff6b6b', fontWeight: 'bold' }}>
                                    Reenviar (ignorar si ya recibieron esta campaña)
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className={style.buttonContainer}>
                        <button 
                            className={style.btnTest} 
                            onClick={sendTestEmail} 
                            disabled={loading}
                        >
                            {loading ? "Ejecutando..." : "📨 Enviar Correo de Prueba"}
                        </button>
                        
                        <button 
                            className={style.btnReal} 
                            onClick={sendBatchEmail} 
                            disabled={loading}
                        >
                            {loading ? "Enviando Lotes..." : "🚀 Iniciar Envío Masivo Automático"}
                        </button>
                    </div>

                    <div className={style.consoleContainer}>
                        <div className={style.consoleHeader}>
                            <span>Registro del Servidor (Output)</span>
                            <button className={style.btnClear} onClick={clearLogs}>Limpiar</button>
                        </div>
                        <div 
                            className={style.consoleOutput} 
                            dangerouslySetInnerHTML={{ __html: logs || "Esperando acción..." }} 
                        />
                    </div>
                </>
            )}

            {activeTab === 'seguimiento' && (
                <div className={style.trackingContainer}>
                    <button className={style.refreshBtn} onClick={fetchTrackingData} disabled={trackingLoading}>
                        {trackingLoading ? "Actualizando..." : "🔄 Actualizar Datos"}
                    </button>
                    
                    {dynamicStats && (
                        <div className={style.statsGrid}>
                            <div className={style.statCard}>
                                <div className={style.statTitle}>Correos Enviados</div>
                                <div className={style.statValue}>{dynamicStats.sent} / {dynamicStats.sent + dynamicStats.failed}</div>
                            </div>
                            <div className={style.statCard}>
                                <div className={style.statTitle}>Correos Abiertos</div>
                                <div className={style.statValue}>{dynamicStats.opened}</div>
                            </div>
                            <div className={style.statCard}>
                                <div className={style.statTitle}>Clics Totales</div>
                                <div className={style.statValue}>{dynamicStats.clicks}</div>
                            </div>
                            <div className={style.statCard}>
                                <div className={style.statTitle}>Compradores / Recaudación</div>
                                <div className={style.statValue} style={{ fontSize: '1.2rem', lineHeight: '1.4' }}>
                                    {dynamicStats.buyersMP} <span style={{fontSize: '0.9rem', color: '#a0a6b8'}}>usuarios</span><br/>
                                    <span style={{color: '#00d4ff'}}>${dynamicStats.revARS.toLocaleString('es-AR')} ARS</span><br/>
                                    <span style={{color: '#00ff88'}}>${dynamicStats.revUSD.toLocaleString('en-US')} USD</span>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={style.filtersRow} style={{ display: 'flex', gap: '15px', marginTop: '20px', marginBottom: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: '#a0a6b8', fontWeight: 'bold' }}>Buscar Usuario / Email</label>
                            <input 
                                type="text" 
                                value={filters.search} 
                                onChange={e => { setFilters({...filters, search: e.target.value}); setCurrentPage(1); }}
                                placeholder="Ej: juan@gmail.com"
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#131824', color: '#fff', minWidth: '180px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: '#a0a6b8', fontWeight: 'bold' }}>Campaña</label>
                            <select 
                                value={filters.campana} 
                                onChange={e => { setFilters({...filters, campana: e.target.value}); setCurrentPage(1); }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#131824', color: '#fff', minWidth: '150px' }}
                            >
                                <option value="">Todas</option>
                                {uniqueCampaigns.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: '#a0a6b8', fontWeight: 'bold' }}>Estado</label>
                            <select 
                                value={filters.estado} 
                                onChange={e => { setFilters({...filters, estado: e.target.value}); setCurrentPage(1); }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#131824', color: '#fff', minWidth: '120px' }}
                            >
                                <option value="">Todos</option>
                                {uniqueEstados.map(e => <option key={e} value={e}>{e}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: '#a0a6b8', fontWeight: 'bold' }}>Abierto</label>
                            <select 
                                value={filters.abierto} 
                                onChange={e => { setFilters({...filters, abierto: e.target.value}); setCurrentPage(1); }}
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#131824', color: '#fff', minWidth: '100px' }}
                            >
                                <option value="">Todos</option>
                                <option value="si">Sí</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ fontSize: '0.85rem', color: '#a0a6b8', fontWeight: 'bold' }}>Mínimo Clics</label>
                            <input 
                                type="number" 
                                min="0" 
                                value={filters.minClics} 
                                onChange={e => { setFilters({...filters, minClics: e.target.value}); setCurrentPage(1); }}
                                placeholder="Ej: 1"
                                style={{ padding: '8px', borderRadius: '6px', border: '1px solid #444', background: '#131824', color: '#fff', maxWidth: '100px' }}
                            />
                        </div>
                    </div>

                    <div className={style.tableContainer}>
                        <table className={style.trackingTable}>
                            <thead>
                                <tr>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
                                        Email / Usuario {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('campana')}>
                                        Campaña {sortConfig.key === 'campana' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('estado')}>
                                        Estado {sortConfig.key === 'estado' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleSort('leido')}>
                                        Abierto {sortConfig.key === 'leido' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleSort('clics')}>
                                        Clics {sortConfig.key === 'clics' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer', textAlign: 'center' }} onClick={() => handleSort('master_plan')}>
                                        Master Plan {sortConfig.key === 'master_plan' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('fecha_intento')}>
                                        Fecha {sortConfig.key === 'fecha_intento' ? (sortConfig.direction === 'asc' ? '⬆️' : '⬇️') : ''}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.length > 0 ? currentUsers.map(u => (
                                    <tr key={u.id}>
                                        <td>
                                            <div style={{ fontWeight: 'bold', color: '#00d4ff' }}>{u.email}</div>
                                            <div style={{ fontSize: '0.85em', color: '#a0a6b8', marginTop: '3px' }}>👤 {u.nombre || 'Sin nombre'}</div>
                                        </td>
                                        <td>{u.campana}</td>
                                        <td>
                                            <span className={`${style.badge} ${u.estado === 'enviado' ? style.success : style.error}`}>
                                                {u.estado}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <span className={`${style.badge} ${u.leido == 1 ? style.success : style.neutral}`}>
                                                {u.leido == 1 ? 'Sí' : 'No'}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontWeight: 'bold' }}>{u.clics}</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div>
                                                {u.master_plan == 1 ? (
                                                    <span style={{ color: '#00ff88', fontWeight: 'bold' }}>👑 Sí</span>
                                                ) : (
                                                    <span style={{ color: '#555' }}>No</span>
                                                )}
                                            </div>
                                            {parseFloat(u.acumulativo_mercadopago_pagos || 0) > 0 && (
                                                <div style={{ fontSize: '0.85em', color: '#00d4ff', marginTop: '2px' }}>
                                                    ${parseFloat(u.acumulativo_mercadopago_pagos || 0).toLocaleString('es-AR')} ARS
                                                </div>
                                            )}
                                            {parseFloat(u.acumulativo_cripto_pagos_usd || 0) > 0 && (
                                                <div style={{ fontSize: '0.85em', color: '#00ff88', marginTop: '2px' }}>
                                                    ${parseFloat(u.acumulativo_cripto_pagos_usd || 0).toLocaleString('en-US')} USD
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ fontSize: '0.9em', color: '#ccc' }}>
                                            {new Date(u.fecha_intento).toLocaleString()}
                                        </td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#888', fontSize: '1.1rem'}}>No hay registros que coincidan con los filtros.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINACIÓN */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
                                disabled={currentPage === 1}
                                style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === 1 ? '#222' : '#00d4ff', color: currentPage === 1 ? '#555' : '#0a0d14', border: 'none', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                            >
                                ◀ Anterior
                            </button>
                            <span style={{ color: '#fff', fontSize: '0.95rem' }}>
                                Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong> <span style={{ color: '#888', marginLeft: '5px' }}>({processedUsers.length} resultados)</span>
                            </span>
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
                                disabled={currentPage === totalPages}
                                style={{ padding: '8px 16px', borderRadius: '6px', background: currentPage === totalPages ? '#222' : '#00d4ff', color: currentPage === totalPages ? '#555' : '#0a0d14', border: 'none', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                            >
                                Siguiente ▶
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
