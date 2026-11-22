import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './css/AdminBlog.module.css';

// Componente del Panel de Administración para crear, editar y gestionar noticias del blog
const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('crear'); // 'crear' | 'lista'
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'code' | 'preview'

  // Lista de autores y tags cargados desde la API o valores por defecto
  const [autores, setAutores] = useState([
    { id: 1, nombre: 'Jupeson', rol: 'Challenger TFT & Creador de Contenido', avatar: '/web/logoGP2026.webp' },
    { id: 2, nombre: 'ProfesorJand', rol: 'Coach TFT & Desarrollador Web', avatar: '/web/logoGP2026.webp' }
  ]);

  const [availableTags, setAvailableTags] = useState([
    { id: 1, slug: 'jupeson', nombre: 'Jupeson' },
    { id: 2, slug: 'teamfight tactics', nombre: 'Teamfight Tactics' },
    { id: 3, slug: 'novedades', nombre: 'Novedades' },
    { id: 4, slug: 'parches', nombre: 'Parches' },
    { id: 5, slug: 'guiadeparche', nombre: 'Guía de Parche' }
  ]);

  // Publicaciones existentes para la vista de listado
  const [existingPosts, setExistingPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Estado del formulario del blog post
  const [postId, setPostId] = useState(0);
  const [title, setTitle] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [autorId, setAutorId] = useState(1);
  const [selectedTagIds, setSelectedTagIds] = useState([1, 2, 3]);
  const [image, setImage] = useState('/blog/blog_tft_cover.jpg');
  const [video, setVideo] = useState('');
  const [featured, setFeatured] = useState(false);
  const [readTime, setReadTime] = useState('4 min de lectura');
  const [status, setStatus] = useState('published');

  // Estado de comprobación de unicidad del slug
  const [slugStatus, setSlugStatus] = useState({ checking: false, available: null, message: '' });
  const [saveStatus, setSaveStatus] = useState({ saving: false, message: '', error: false });

  // Input para crear una nueva etiqueta rápida con nombre y slug
  const [newTagNameInput, setNewTagNameInput] = useState('');
  const [newTagSlugInput, setNewTagSlugInput] = useState('');

  // Estados para Edición y Eliminación de Etiquetas
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const [editingTagId, setEditingTagId] = useState(0);
  const [editingTagName, setEditingTagName] = useState('');
  const [editingTagSlug, setEditingTagSlug] = useState('');
  const [savingTag, setSavingTag] = useState(false);

  // Estados de Galería de Imágenes y Carpetas
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryFolders, setGalleryFolders] = useState([]);
  const [currentFolder, setCurrentFolder] = useState('raiz');
  const [newFolderInput, setNewFolderInput] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  // Estado para Tip y Calculadora de Tiempo de Lectura
  const [showReadTimeTip, setShowReadTimeTip] = useState(false);

  // Estados para Modal de Inserción de Imagen en el Editor HTML
  const [editorImgModalOpen, setEditorImgModalOpen] = useState(false);
  const [editorImgTab, setEditorImgTab] = useState('url'); // 'url' | 'upload' | 'gallery'
  const [editorImgUrl, setEditorImgUrl] = useState('');
  const [editorImgAlt, setEditorImgAlt] = useState('');
  const [editorImgCaption, setEditorImgCaption] = useState('');
  const [editorUploading, setEditorUploading] = useState(false);
  const editorImgFileRef = useRef(null);

  // Estados para Gestor de Autores (Crear / Editar / Subir Avatar)
  const [authorModalOpen, setAuthorModalOpen] = useState(false);
  const [authorEditingId, setAuthorEditingId] = useState(0);
  const [authorNombre, setAuthorNombre] = useState('');
  const [authorRol, setAuthorRol] = useState('Creador de Contenido');
  const [authorAvatar, setAuthorAvatar] = useState('/web/logoGP2026.webp');
  const [authorBio, setAuthorBio] = useState('');
  const [savingAuthor, setSavingAuthor] = useState(false);
  const [uploadingAuthorAvatar, setUploadingAuthorAvatar] = useState(false);
  const authorFileInputRef = useRef(null);

  // Destino de la galería ('post' para portada de post, 'author' para avatar de autor)
  const [galleryTarget, setGalleryTarget] = useState('post');

  const textareaRef = useRef(null);

  // Cargar autores, tags y posts al montar
  useEffect(() => {
    fetchAutores();
    fetchTags();
    fetchExistingPosts();
  }, []);

  const fetchAutores = async () => {
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/autores.php');
      const data = await res.json();
      if (data.success && data.autores && data.autores.length > 0) {
        setAutores(data.autores);
      }
    } catch (e) {
      console.log('Usando autores locales por defecto');
    }
  };

  const fetchTags = async () => {
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/tags.php');
      const data = await res.json();
      if (data.success && data.tags && data.tags.length > 0) {
        setAvailableTags(data.tags.map((t) => ({ ...t, id: Number(t.id) })));
      }
    } catch (e) {
      console.log('Usando tags locales por defecto');
    }
  };

  const fetchExistingPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/get_posts.php');
      const data = await res.json();
      if (data.success && data.posts) {
        setExistingPosts(data.posts);
      }
    } catch (e) {
      console.log('Error al consultar publicaciones existentes');
    } finally {
      setLoadingPosts(false);
    }
  };

  // Limpiar y corregir el slug escrito a mano (reemplazando acentos y caracteres especiales)
  const handleCleanManualSlug = () => {
    if (!slug.trim()) return;
    const cleaned = slug
      .toLowerCase()
      .trim()
      .replace(/[áàäâã]/g, 'a')
      .replace(/[éèëê]/g, 'e')
      .replace(/[íìïî]/g, 'i')
      .replace(/[óòöôõ]/g, 'o')
      .replace(/[úùüû]/g, 'u')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(cleaned);
    checkSlugAvailability(cleaned, postId);
  };

  // Comprobar si el slug está disponible en la base de datos
  const checkSlugAvailability = async (slugToCheck, excludeIdOverride) => {
    const slugFinal = (slugToCheck || slug).trim();
    const currentExcludeId = excludeIdOverride !== undefined ? excludeIdOverride : postId;
    if (!slugFinal) {
      setSlugStatus({ checking: false, available: null, message: '' });
      return;
    }

    setSlugStatus({ checking: true, available: null, message: 'Comprobando slug...' });
    try {
      const res = await fetch(`https://api.guiadeparche.com/blog/check_slug.php?slug=${encodeURIComponent(slugFinal)}&exclude_id=${currentExcludeId}`);
      const data = await res.json();
      if (data.success) {
        setSlugStatus({
          checking: false,
          available: data.available,
          message: data.message
        });
      } else {
        setSlugStatus({
          checking: false,
          available: false,
          message: data.message || 'Slug inválido'
        });
      }
    } catch (err) {
      setSlugStatus({
        checking: false,
        available: true,
        message: 'Modo local: slug asumido disponible'
      });
    }
  };

  // Insertar snippet HTML en la posición del cursor (sin hacer saltar el scroll de la ventana)
  const insertSnippet = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const scrollY = window.scrollY;
    const textareaScrollTop = textarea.scrollTop;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText =
      content.substring(0, start) +
      before +
      (selectedText || '') +
      after +
      content.substring(end);

    setContent(newText);

    setTimeout(() => {
      textarea.focus({ preventScroll: true });
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
      textarea.scrollTop = textareaScrollTop;
      window.scrollTo({ top: scrollY, behavior: 'instant' });
    }, 0);
  };

  // Helper para normalizar y extraer IDs numéricos únicos de tags
  const extractTagIds = (tags, tagsList = availableTags) => {
    if (!tags || !Array.isArray(tags)) return [];
    const ids = tags
      .map((t) => {
        if (typeof t === 'number') return t;
        if (typeof t === 'string') {
          const num = Number(t);
          if (!isNaN(num) && num > 0) return num;
          const found = tagsList.find(
            (at) => at.slug === t || at.nombre.toLowerCase() === t.toLowerCase()
          );
          return found ? Number(found.id) : null;
        }
        if (t && typeof t === 'object') {
          if (t.id !== undefined && t.id !== null) {
            const num = Number(t.id);
            if (!isNaN(num) && num > 0) return num;
          }
          if (t.slug || t.nombre) {
            const found = tagsList.find(
              (at) => at.slug === t.slug || at.nombre.toLowerCase() === (t.nombre || '').toLowerCase()
            );
            return found ? Number(found.id) : null;
          }
        }
        return null;
      })
      .filter((id) => id !== null && id > 0);

    return [...new Set(ids)];
  };

  // Manejo de selección de tags (garantizando tipos numéricos y sin duplicados)
  const toggleTag = (tagId) => {
    const numId = Number(tagId);
    if (!numId) return;
    setSelectedTagIds((prev) => {
      const prevNumbers = prev.map(Number);
      return prevNumbers.includes(numId)
        ? prevNumbers.filter((id) => id !== numId)
        : [...new Set([...prevNumbers, numId])];
    });
  };

  // Cargar imágenes y carpetas de la galería
  const fetchGallery = async (folder = currentFolder) => {
    setLoadingGallery(true);
    try {
      const folderParam = folder === 'raiz' || !folder ? '' : folder;
      const res = await fetch(`https://api.guiadeparche.com/blog/galeria.php?folder=${encodeURIComponent(folderParam)}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success) {
        if (data.imagenes) setGalleryImages(data.imagenes);
        if (data.carpetas) setGalleryFolders(data.carpetas);
        if (data.current_folder) setCurrentFolder(data.current_folder);
      }
    } catch (e) {
      console.log('Error al cargar galería');
    } finally {
      setLoadingGallery(false);
    }
  };

  // Crear nueva carpeta en la galería
  const handleCreateFolder = async (e) => {
    if (e) e.preventDefault();
    if (!newFolderInput.trim()) return;

    setCreatingFolder(true);
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/galeria.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'crear_carpeta',
          folder_name: newFolderInput.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Carpeta creada.');
        const targetFolder = data.folder || newFolderInput.trim();
        setNewFolderInput('');
        setShowNewFolderInput(false);
        fetchGallery(targetFolder);
      } else {
        alert(data.message || 'Error al crear la carpeta');
      }
    } catch (err) {
      alert('Error de conexión al crear la carpeta');
    } finally {
      setCreatingFolder(false);
    }
  };

  // Subir imagen a la galería en la carpeta activa
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImg(true);
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('folder', currentFolder === 'raiz' ? '' : currentFolder);

    try {
      const res = await fetch('https://api.guiadeparche.com/blog/subir_imagen.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (galleryTarget === 'author') {
          setAuthorAvatar(data.url);
        } else {
          setImage(data.url);
        }
        alert('¡Imagen subida exitosamente!');
        fetchGallery(currentFolder);
      } else {
        alert(data.message || 'Error al subir la imagen');
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen');
    } finally {
      setUploadingImg(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Subir imagen específicamente para el Editor HTML
  const handleUploadImageForEditor = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEditorUploading(true);
    const formData = new FormData();
    formData.append('imagen', file);
    formData.append('folder', currentFolder === 'raiz' ? '' : currentFolder);

    try {
      const res = await fetch('https://api.guiadeparche.com/blog/subir_imagen.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setEditorImgUrl(data.url);
        alert('¡Imagen subida con éxito! Lista para insertar.');
      } else {
        alert(data.message || 'Error al subir la imagen');
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen');
    } finally {
      setEditorUploading(false);
      if (editorImgFileRef.current) editorImgFileRef.current.value = '';
    }
  };

  // Insertar la imagen en el editor HTML con su Alt text y opcional Caption
  const handleInsertImageToEditor = () => {
    if (!editorImgUrl.trim()) {
      alert('Por favor especifica o sube una imagen antes de insertar.');
      return;
    }

    const alt = editorImgAlt.trim() || title.trim() || 'Imagen del artículo';
    const caption = editorImgCaption.trim();

    const snippet = caption
      ? `\n<figure class="blog-figure">\n  <img src="${editorImgUrl.trim()}" alt="${alt}" loading="lazy" />\n  <figcaption>${caption}</figcaption>\n</figure>\n`
      : `\n<figure class="blog-figure">\n  <img src="${editorImgUrl.trim()}" alt="${alt}" loading="lazy" />\n</figure>\n`;

    insertSnippet(snippet);
    setEditorImgModalOpen(false);
    setEditorImgUrl('');
    setEditorImgAlt('');
    setEditorImgCaption('');
  };

  // Helper para calcular palabras y tiempo de lectura estimado
  const getWordAndReadingStats = () => {
    const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text ? text.split(/\s+/).length : 0;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return { words, minutes };
  };

  // Abrir modal para editar etiqueta
  const handleOpenEditTag = (tag, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setEditingTagId(tag.id);
    setEditingTagName(tag.nombre);
    setEditingTagSlug(tag.slug);
    setTagModalOpen(true);
  };

  // Guardar cambios en etiqueta editada
  const handleSaveEditTag = async (e) => {
    if (e) e.preventDefault();
    if (!editingTagName.trim()) {
      alert('El nombre de la etiqueta no puede estar vacío.');
      return;
    }

    setSavingTag(true);
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/tags.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'edit',
          id: editingTagId,
          nombre: editingTagName.trim(),
          slug: editingTagSlug.trim()
        })
      });
      const data = await res.json();
      if (data.success && data.tag) {
        setAvailableTags((prev) =>
          prev.map((t) => (t.id === editingTagId ? data.tag : t))
        );
        setTagModalOpen(false);
        alert('¡Etiqueta actualizada correctamente! Los cambios se reflejarán en todas las publicaciones.');
      } else {
        alert(data.message || 'Error al actualizar la etiqueta');
      }
    } catch (err) {
      alert('Error de conexión al actualizar la etiqueta');
    } finally {
      setSavingTag(false);
    }
  };

  // Eliminar etiqueta y limpiar posts asociados
  const handleDeleteTag = async (tag, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar la etiqueta "${tag.nombre}"?\n\nEsta acción la eliminará de la base de datos y limpiará automáticamente todas las publicaciones que la tengan asociada.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch('https://api.guiadeparche.com/blog/tags.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          id: tag.id
        })
      });
      const data = await res.json();
      if (data.success) {
        setAvailableTags((prev) => prev.filter((t) => t.id !== tag.id));
        setSelectedTagIds((prev) => prev.filter((id) => id !== tag.id));
        alert('Etiqueta eliminada y desvinculada de todas las publicaciones.');
      } else {
        alert(data.message || 'Error al eliminar la etiqueta');
      }
    } catch (err) {
      alert('Error de conexión al eliminar la etiqueta');
    }
  };

  // Abrir modal para crear nuevo autor
  const handleOpenNewAuthor = () => {
    setAuthorEditingId(0);
    setAuthorNombre('');
    setAuthorRol('Creador de Contenido');
    setAuthorAvatar('/web/logoGP2026.webp');
    setAuthorBio('');
    setAuthorModalOpen(true);
  };

  // Abrir modal para editar un autor específico
  const handleEditAuthor = (author) => {
    if (!author) return;
    setAuthorEditingId(author.id);
    setAuthorNombre(author.nombre);
    setAuthorRol(author.rol || 'Creador de Contenido');
    setAuthorAvatar(author.avatar || '/web/logoGP2026.webp');
    setAuthorBio(author.bio || '');
    setAuthorModalOpen(true);
  };

  // Abrir modal para editar el autor seleccionado en el dropdown
  const handleEditCurrentAuthor = () => {
    const current = autores.find((a) => a.id === autorId) || autores[0];
    if (current) handleEditAuthor(current);
  };

  // Guardar (Crear o Editar) Autor en la base de datos
  const handleSaveAuthor = async (e) => {
    if (e) e.preventDefault();
    if (!authorNombre.trim()) {
      alert('Por favor ingresa el nombre del autor.');
      return;
    }

    setSavingAuthor(true);
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/autores.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: authorEditingId,
          nombre: authorNombre.trim(),
          rol: authorRol.trim(),
          avatar: authorAvatar.trim() || '/web/logoGP2026.webp',
          bio: authorBio.trim()
        })
      });
      const data = await res.json();
      if (data.success && data.autor) {
        alert(data.message || (authorEditingId ? '¡Autor actualizado con éxito!' : '¡Autor creado con éxito!'));
        await fetchAutores();
        setAutorId(data.autor.id);
        setAuthorModalOpen(false);
      } else {
        alert(data.message || 'Error al guardar autor.');
      }
    } catch (err) {
      alert('Error de conexión al guardar el autor.');
    } finally {
      setSavingAuthor(false);
    }
  };

  // Subir avatar de autor desde su computadora
  const handleAuthorAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAuthorAvatar(true);
    const formData = new FormData();
    formData.append('imagen', file);

    try {
      const res = await fetch('https://api.guiadeparche.com/blog/subir_imagen.php', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        setAuthorAvatar(data.url);
        alert('¡Foto de perfil subida exitosamente!');
        fetchGallery();
      } else {
        alert(data.message || 'Error al subir la imagen');
      }
    } catch (err) {
      alert('Error de conexión al subir la imagen');
    } finally {
      setUploadingAuthorAvatar(false);
      if (authorFileInputRef.current) authorFileInputRef.current.value = '';
    }
  };

  // Añadir un nuevo tag rápido con nombre y slug opcional
  const handleAddNewTag = async () => {
    if (!newTagNameInput.trim()) return;
    try {
      const res = await fetch('https://api.guiadeparche.com/blog/tags.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: newTagNameInput.trim(),
          slug: newTagSlugInput.trim()
        })
      });
      const data = await res.json();
      if (data.success && data.tag) {
        setAvailableTags((prev) => [...prev, data.tag]);
        setSelectedTagIds((prev) => [...prev, data.tag.id]);
        setNewTagNameInput('');
        setNewTagSlugInput('');
      }
    } catch (e) {
      // Fallback local
      const fakeId = Date.now();
      const fallbackSlug = (newTagSlugInput.trim() || newTagNameInput.trim().toLowerCase().replace(/\s+/g, '-'));
      const fakeTag = { id: fakeId, slug: fallbackSlug, nombre: newTagNameInput.trim() };
      setAvailableTags((prev) => [...prev, fakeTag]);
      setSelectedTagIds((prev) => [...prev, fakeId]);
      setNewTagNameInput('');
      setNewTagSlugInput('');
    }
  };

  // Guardar publicación
  const handleSavePost = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Por favor ingresa un título para el blog.');
      return;
    }

    if (!slug.trim()) {
      alert('Por favor genera o ingresa un slug único.');
      return;
    }

    if (slugStatus.available === false) {
      alert('El slug ya está en uso. Por favor cámbialo antes de guardar.');
      return;
    }

    setSaveStatus({ saving: true, message: 'Guardando publicación...', error: false });

    const payload = {
      id: postId,
      title: title.trim(),
      seo_title: seoTitle.trim(),
      keywords: keywords.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      autor_id: autorId,
      image: image.trim(),
      video: video.trim(),
      featured: featured,
      read_time: readTime.trim(),
      status: status,
      tag_ids: [...new Set(selectedTagIds.map(Number).filter((id) => id > 0))]
    };

    try {
      const res = await fetch('https://api.guiadeparche.com/blog/guardar_post.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setSaveStatus({
          saving: false,
          message: data.message || '¡Publicación guardada exitosamente!',
          error: false
        });
        setPostId(data.post_id || postId);
        fetchExistingPosts();
      } else {
        setSaveStatus({
          saving: false,
          message: data.message || 'Error al guardar.',
          error: true
        });
      }
    } catch (err) {
      setSaveStatus({
        saving: false,
        message: 'Error de conexión con la API de blog.',
        error: true
      });
    }
  };

  // Limpiar formulario para nuevo post
  const handleResetForm = () => {
    setPostId(0);
    setTitle('');
    setSeoTitle('');
    setKeywords('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setImage('/blog/blog_tft_cover.jpg');
    setVideo('');
    setFeatured(false);
    setReadTime('4 min de lectura');
    setStatus('published');
    setSelectedTagIds([]);
    setSlugStatus({ checking: false, available: null, message: '' });
    setSaveStatus({ saving: false, message: '', error: false });
  };

  // Cargar post para editar
  const handleEditPost = async (post) => {
    setPostId(post.id);
    setTitle(post.title || '');
    setSeoTitle(post.seo_title || post.seoTitle || '');
    setKeywords(post.keywords || '');
    setSlug(post.slug || '');
    setExcerpt(post.excerpt || '');
    setContent(post.content || '');
    setAutorId(post.autor_id ? Number(post.autor_id) : 1);
    setImage(post.image || '');
    setVideo(post.video || '');
    setFeatured(Boolean(post.featured));
    setReadTime(post.read_time || '4 min de lectura');
    setStatus(post.status || 'published');

    // Parsear y activar inmediatamente los tags que ya vienen en post
    const initialTags = extractTagIds(post.tags);
    setSelectedTagIds(initialTags);

    setActiveTab('crear');
    // Pasar explícitamente post.id para que la comprobación no compare contra 0
    checkSlugAvailability(post.slug, post.id);

    // Consultar el post completo por ID para asegurar contenido y tags 100% frescos de la BD
    try {
      const res = await fetch(`https://api.guiadeparche.com/blog/get_posts.php?id=${post.id}&t=${Date.now()}`);
      const data = await res.json();
      if (data.success && data.post) {
        if (data.post.content) setContent(data.post.content);
        if (data.post.seo_title !== undefined) setSeoTitle(data.post.seo_title || '');
        if (data.post.keywords !== undefined) setKeywords(data.post.keywords || '');
        if (data.post.tags && Array.isArray(data.post.tags)) {
          setSelectedTagIds(extractTagIds(data.post.tags));
        }
      }
    } catch (e) {
      console.log('Error al consultar post completo por ID:', e);
    }
  };

  return (
    <div className={styles.adminBlogContainer}>
      {/* Pestañas superiores */}
      <div className={styles.headerTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'crear' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('crear')}
        >
          {postId > 0 ? `✏️ Editando Noticia #${postId}` : '➕ Crear Nueva Noticia'}
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'lista' ? styles.tabBtnActive : ''}`}
          onClick={() => {
            setActiveTab('lista');
            fetchExistingPosts();
          }}
        >
          📋 Gestionar Noticias ({existingPosts.length})
        </button>
        {postId > 0 && (
          <button
            type="button"
            className={styles.btnSmall}
            onClick={handleResetForm}
            style={{ marginLeft: 'auto' }}
          >
            Nuevo Artículo
          </button>
        )}
      </div>

      {activeTab === 'crear' ? (
        <form onSubmit={handleSavePost} className={styles.formCard}>
          <div className={styles.formGrid}>
            {/* Título */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                Título de la Noticia / Novedad:
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Requerido</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="Ej: Análisis del Meta de TFT: Nuevas Composiciones..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Título SEO (Etiqueta <title> para Google) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Título SEO (para Google y pestañas):</span>
                <span
                  className={`${styles.charCounter} ${
                    (seoTitle || title).length <= 60
                      ? styles.charCounterOk
                      : (seoTitle || title).length <= 70
                      ? styles.charCounterWarn
                      : styles.charCounterOver
                  }`}
                >
                  {(seoTitle || title).length} / 60 caracteres
                </span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder={title ? `Por defecto: ${title}` : 'Ej: Guía de TFT Parche 14.21 | Mejores Composiciones'}
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
              />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                Si se deja vacío, Google y el navegador usarán automáticamente el título del artículo.
              </span>
            </div>

            {/* Palabras Clave SEO (Keywords) */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Palabras Clave SEO (Keywords para buscadores):</span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Separadas por comas</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="tft meta, composiciones tft, parche tft, guiadeparche..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                Se inyectarán directamente en las metaetiquetas SEO del artículo.
              </span>
            </div>

            {/* Slug con Validación */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Slug URL (identificador único):</span>
                {slugStatus.checking && (
                  <span className={`${styles.slugStatus} ${styles.slugChecking}`}>
                    ⏳ Comprobando...
                  </span>
                )}
                {slugStatus.available === true && (
                  <span className={`${styles.slugStatus} ${styles.slugAvailable}`}>
                    ✓ {slugStatus.message}
                  </span>
                )}
                {slugStatus.available === false && (
                  <span className={`${styles.slugStatus} ${styles.slugUnavailable}`}>
                    ✗ {slugStatus.message}
                  </span>
                )}
              </label>
              <div className={styles.slugWrapper}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="analisis-meta-tft-nuevas-composiciones"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setSlugStatus({ checking: false, available: null, message: '' });
                  }}
                  onBlur={() => checkSlugAvailability(slug)}
                  required
                />
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={handleCleanManualSlug}
                  title="Corregir y formatear el slug escrito a mano (minúsculas, sin tildes ni espacios)"
                >
                  🛠️ Corregir Slug
                </button>
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={() => checkSlugAvailability(slug)}
                  title="Comprobar si el slug ya existe"
                >
                  🔍 Comprobar
                </button>
              </div>
            </div>

            {/* Extracto con límite recomendado */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Extracto / Resumen breve (para la card):</span>
                <span
                  className={`${styles.charCounter} ${
                    excerpt.length <= 160
                      ? styles.charCounterOk
                      : excerpt.length <= 200
                      ? styles.charCounterWarn
                      : styles.charCounterOver
                  }`}
                >
                  {excerpt.length} / 160 caracteres (recomendado)
                </span>
              </label>
              <textarea
                className={styles.textarea}
                placeholder="Breve descripción que se mostrará en la tarjeta de la página /blog (recomendado entre 120 y 160 caracteres)..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                maxLength={240}
                required
              />
            </div>

            {/* Autor */}
            <div className={styles.formGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className={styles.label} style={{ marginBottom: 0 }}>
                  Autor del Artículo:
                </label>
                <button
                  type="button"
                  className={styles.linkBtn}
                  onClick={handleOpenNewAuthor}
                  title="Crear un nuevo autor de artículos"
                >
                  + Crear Nuevo Autor
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <select
                  className={styles.select}
                  value={autorId}
                  onChange={(e) => setAutorId(Number(e.target.value))}
                  style={{ flex: 1 }}
                >
                  {autores.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nombre} ({a.rol})
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={handleEditCurrentAuthor}
                  title="Editar los datos, biografía y foto del autor seleccionado"
                >
                  ✏️ Editar Autor
                </button>
              </div>
              {/* Vista previa compacta del autor seleccionado */}
              {(() => {
                const currentAutor = autores.find((a) => a.id === autorId);
                if (!currentAutor) return null;
                return (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginTop: '0.5rem' }}>
                    <img
                      src={currentAutor.avatar || '/web/logoGP2026.webp'}
                      alt={currentAutor.nombre}
                      style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #a855f7' }}
                      onError={(e) => { e.target.src = '/web/logoGP2026.webp'; }}
                    />
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {currentAutor.rol}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Tiempo de Lectura y Estado */}
            <div className={styles.formGroup}>
              <div className={styles.label}>
                <span>Tiempo de Lectura y Estado:</span>
                <button
                  type="button"
                  className={styles.readTimeTipBtn}
                  onClick={() => setShowReadTimeTip(!showReadTimeTip)}
                  title="Aprende cómo calcular los minutos de lectura de tu artículo"
                >
                  💡 {showReadTimeTip ? 'Ocultar Tip' : '¿Cómo saber los minutos?'}
                </button>
              </div>
              <div className={styles.readTimeControls}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="4 min de lectura"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className={styles.readTimeCalcBadge}
                  onClick={() => {
                    const stats = getWordAndReadingStats();
                    setReadTime(`${stats.minutes} min de lectura`);
                  }}
                  title="Calcular minutos automáticamente en base al contenido escrito"
                >
                  ⚡ Auto-calcular ({getWordAndReadingStats().minutes} min)
                </button>
                <select
                  className={styles.select}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ width: '135px' }}
                >
                  <option value="published">Publicado</option>
                  <option value="draft">Borrador</option>
                </select>
              </div>

              {showReadTimeTip && (
                <div className={styles.readTimeTipCard}>
                  <strong>💡 ¿Cómo estimar el tiempo de lectura de un artículo?</strong>
                  <br />
                  En promedio, un lector adulto lee entre <strong>200 y 250 palabras por minuto</strong>.
                  <br />
                  Fórmula rápida: cuenta las palabras del contenido y divídelas entre 200.
                  <br />
                  Tu contenido actual tiene <strong>~{getWordAndReadingStats().words} palabras</strong>, lo que equivale aproximadamente a <strong>{getWordAndReadingStats().minutes} {getWordAndReadingStats().minutes === 1 ? 'minuto' : 'minutos'} de lectura</strong>.
                  ¡Haz clic en el botón <em>"⚡ Auto-calcular"</em> para asignarlo automáticamente!
                </div>
              )}
            </div>

            {/* Imagen de Portada con Subida y Galería */}
            <div className={styles.formGroup}>
              <label className={styles.label}>URL Imagen de Portada (Thumbnail / SEO):</label>
              <div className={styles.imageActionsRow}>
                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className={styles.imagePreviewThumb}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <input
                  type="text"
                  className={styles.input}
                  placeholder="/blog/blog_tft_cover.jpg o URL externa"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  style={{ flex: 1 }}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImg}
                  title="Subir imagen desde tu computadora a la galería del servidor"
                >
                  {uploadingImg ? '⏳ Subiendo...' : '📤 Subir Imagen'}
                </button>
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={() => {
                    setGalleryTarget('post');
                    setGalleryOpen(true);
                    fetchGallery(currentFolder);
                  }}
                  title="Abrir galería de imágenes ya subidas al servidor"
                >
                  🖼️ Galería
                </button>
              </div>
            </div>

            {/* Video Principal Destacado */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                <span>URL Video Principal (YouTube - Opcional):</span>
              </label>
              <input
                type="text"
                className={styles.input}
                placeholder="https://youtu.be/... (Sustituye imagen en cabecera)"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>

            {/* Destacado */}
            <div className={styles.formGroup} style={{ justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', marginTop: '1.25rem' }}>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#a855f7' }}
                />
                <span style={{ fontWeight: 600 }}>⭐ Marcar como noticia destacada</span>
              </label>
            </div>

            {/* Etiquetas (Tags) con Edición y Eliminación */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Etiquetas (Tags asociadas):</span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Haz clic en el nombre para asociar | Usa ✏️ para editar y 🗑️ para eliminar</span>
              </label>
              <div className={styles.tagsContainer}>
                {availableTags.map((t) => {
                  const isSelected = selectedTagIds.some((id) => Number(id) === Number(t.id));
                  return (
                    <div
                      key={t.id}
                      className={`${styles.tagItemWrapper} ${isSelected ? styles.tagItemWrapperActive : ''}`}
                    >
                      <button
                        type="button"
                        className={styles.tagSelectBtn}
                        onClick={() => toggleTag(t.id)}
                        title={isSelected ? 'Desmarcar etiqueta para este post' : 'Marcar etiqueta para este post'}
                      >
                        {isSelected ? '✓ ' : '+ '}#{t.nombre}
                      </button>
                      <button
                        type="button"
                        className={styles.tagActionBtn}
                        onClick={(e) => handleOpenEditTag(t, e)}
                        title={`Editar nombre o slug de #${t.nombre}`}
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        className={`${styles.tagActionBtn} ${styles.tagActionBtnDelete}`}
                        onClick={(e) => handleDeleteTag(t, e)}
                        title={`Eliminar #${t.nombre} y limpiar de todas las publicaciones`}
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className={styles.newTagRow} style={{ flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Nombre (ej: Venezuela Game Show)"
                  value={newTagNameInput}
                  onChange={(e) => setNewTagNameInput(e.target.value)}
                  style={{ maxWidth: '240px' }}
                />
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Slug (ej: vgs - opcional)"
                  value={newTagSlugInput}
                  onChange={(e) => setNewTagSlugInput(e.target.value)}
                  style={{ maxWidth: '180px' }}
                />
                <button
                  type="button"
                  className={styles.btnSmall}
                  onClick={handleAddNewTag}
                >
                  + Agregar Etiqueta
                </button>
              </div>
            </div>

            {/* Editor de Contenido HTML con Previsualización */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>
                <span>Contenido del Artículo (Editor HTML interactivo):</span>
                <span>Visualizador en tiempo real</span>
              </label>

              <div className={styles.editorCard}>
                {/* Toolbar */}
                <div className={styles.editorToolbar}>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<h2>', '</h2>')}
                    title="Insertar Encabezado H2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<h3>', '</h3>')}
                    title="Insertar Encabezado H3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<p>', '</p>')}
                    title="Insertar Párrafo"
                  >
                    ¶ Párrafo
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<strong>', '</strong>')}
                    title="Negrita"
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<em>', '</em>')}
                    title="Cursiva"
                  >
                    <i>I</i>
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<blockquote>\n  "', '"\n</blockquote>')}
                    title="Insertar Cita"
                  >
                    ❝ Cita
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<ul>\n  <li>', '</li>\n  <li>Elemento 2</li>\n</ul>')}
                    title="Lista con viñetas"
                  >
                    • Lista
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<ol>\n  <li>', '</li>\n  <li>Paso 2</li>\n</ol>')}
                    title="Lista numerada"
                  >
                    1. Lista
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => insertSnippet('<a href="https://" target="_blank" rel="noopener noreferrer">', '</a>')}
                    title="Insertar Enlace"
                  >
                    🔗 Link
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() =>
                      insertSnippet(
                        '<div style="background: rgba(168,85,247,0.15); border-left: 4px solid #a855f7; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;">\n  💡 <strong>Consejo:</strong> ',
                        '\n</div>'
                      )
                    }
                    title="Caja de Consejo / Tip"
                  >
                    💡 Tip Box
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => {
                      setEditorImgModalOpen(true);
                      fetchGallery(currentFolder);
                    }}
                    title="Insertar Imagen con opciones (URL directa, Subir archivo o Elegir de Galería con Alt text)"
                  >
                    🖼️ Imagen
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() =>
                      insertSnippet(
                        '\n<div class="blog-two-columns">\n  <div class="blog-column">\n    <h3>Columna 1</h3>\n    <p>Escribe aquí el contenido de la primera columna...</p>\n  </div>\n  <div class="blog-column">\n    <h3>Columna 2</h3>\n    <p>Escribe aquí el contenido de la segunda columna...</p>\n  </div>\n</div>\n'
                      )
                    }
                    title="Insertar diseño responsivo de 2 columnas"
                  >
                    📰 2 Columnas
                  </button>
                  <button
                    type="button"
                    className={styles.toolBtn}
                    onClick={() => {
                      const ytUrl = prompt('Pega el enlace del video o short de YouTube:');
                      if (!ytUrl) return;

                      // Regex completa que reconoce videos normales, shorts, live y enlaces cortos
                      const match = ytUrl.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/i) ||
                                    ytUrl.trim().match(/^([\w-]{11})$/);

                      if (!match) {
                        alert('El enlace de YouTube no parece válido. Por favor pega un enlace completo (ej: https://www.youtube.com/watch?v=... o https://youtube.com/shorts/...)');
                        return;
                      }

                      const videoId = match[1];
                      const isShort = ytUrl.includes('/shorts/');

                      if (isShort) {
                        insertSnippet(
                          `\n<div class="videoWrapper videoWrapperShort" style="position: relative; aspect-ratio: 9/16; max-width: 380px; margin: 1.75rem auto; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n`
                        );
                      } else {
                        insertSnippet(
                          `\n<div class="videoWrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 12px; margin: 1.5rem 0; box-shadow: 0 8px 24px rgba(0,0,0,0.4);"><iframe src="https://www.youtube.com/embed/${videoId}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>\n`
                        );
                      }
                    }}
                    title="Insertar Video o Short de YouTube dentro del contenido"
                  >
                    🎥 Video / Short
                  </button>

                  {/* Selector de modo de vista */}
                  <div className={styles.viewModeToggle}>
                    <button
                      type="button"
                      className={`${styles.viewBtn} ${viewMode === 'split' ? styles.viewBtnActive : ''}`}
                      onClick={() => setViewMode('split')}
                    >
                      Dividido
                    </button>
                    <button
                      type="button"
                      className={`${styles.viewBtn} ${viewMode === 'code' ? styles.viewBtnActive : ''}`}
                      onClick={() => setViewMode('code')}
                    >
                      Código
                    </button>
                    <button
                      type="button"
                      className={`${styles.viewBtn} ${viewMode === 'preview' ? styles.viewBtnActive : ''}`}
                      onClick={() => setViewMode('preview')}
                    >
                      Vista Previa
                    </button>
                  </div>
                </div>

                {/* Área de edición y preview */}
                <div className={viewMode === 'split' ? styles.splitEditor : styles.singleEditor}>
                  {(viewMode === 'split' || viewMode === 'code') && (
                    <textarea
                      ref={textareaRef}
                      className={styles.htmlTextarea}
                      placeholder="Escribe o pega el código HTML aquí..."
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  )}

                  {(viewMode === 'split' || viewMode === 'preview') && (
                    <div className={styles.previewBox}>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                        PREVISUALIZACIÓN EN VIVO (ESTILO GUÍA DE PARCHE)
                      </div>
                      {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                      ) : (
                        <p style={{ color: '#64748b', fontStyle: 'italic' }}>
                          El contenido previsualizado aparecerá aquí a medida que escribas...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Estado de guardado y botón */}
          <div className={styles.actionRow}>
            {saveStatus.message && (
              <span
                style={{
                  color: saveStatus.error ? '#f87171' : '#4ade80',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                {saveStatus.message}
              </span>
            )}
            <button
              type="submit"
              className={styles.saveBtn}
              disabled={saveStatus.saving}
            >
              {saveStatus.saving
                ? 'Guardando...'
                : postId > 0
                ? 'Actualizar Noticia'
                : 'Guardar Noticia en Base de Datos'}
            </button>
          </div>
        </form>
      ) : (
        /* Vista de Listado / Gestión de Noticias */
        <div className={styles.tableCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, color: '#ffffff' }}>Listado de Noticias en Base de Datos</h3>
            <button
              type="button"
              className={styles.btnSmall}
              onClick={fetchExistingPosts}
            >
              🔄 Recargar
            </button>
          </div>

          {loadingPosts ? (
            <p style={{ color: '#94a3b8' }}>Cargando publicaciones...</p>
          ) : existingPosts.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>
              No se encontraron noticias en la base de datos aún. ¡Crea la primera usando la pestaña de arriba!
            </p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Slug</th>
                  <th>Autor</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {existingPosts.map((post) => (
                  <tr key={post.id}>
                    <td>#{post.id}</td>
                    <td style={{ fontWeight: 600, color: '#ffffff' }}>{post.title}</td>
                    <td style={{ color: '#c084fc' }}>/{post.slug}/</td>
                    <td>{post.autor_nombre || 'Jupeson'}</td>
                    <td>
                      <span
                        style={{
                          background: post.status === 'published' ? 'rgba(34,197,94,0.15)' : 'rgba(234,179,8,0.15)',
                          color: post.status === 'published' ? '#4ade80' : '#facc15',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}
                      >
                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                      </span>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                      {post.created_at ? post.created_at.split(' ')[0] : '-'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className={styles.btnSmall}
                          onClick={() => handleEditPost(post)}
                        >
                          ✏️ Editar
                        </button>
                        <a
                          href={`/blog/${post.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.btnSmall}
                          style={{ textDecoration: 'none' }}
                        >
                          👁️ Ver
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal de Galería de Imágenes con Soporte para Carpetas */}
      {galleryOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay} onClick={() => setGalleryOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
            <div className={styles.modalHeader}>
              <h3>🖼️ Galería de Imágenes y Carpetas</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setGalleryOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Barra de Carpetas */}
              <div className={styles.folderBar}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginRight: '0.25rem' }}>
                  Carpetas:
                </span>
                <button
                  type="button"
                  className={`${styles.folderChip} ${currentFolder === 'raiz' ? styles.folderChipActive : ''}`}
                  onClick={() => fetchGallery('raiz')}
                >
                  📁 Principal / Raíz
                </button>
                {galleryFolders.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`${styles.folderChip} ${currentFolder === f ? styles.folderChipActive : ''}`}
                    onClick={() => fetchGallery(f)}
                  >
                    📁 {f}
                  </button>
                ))}

                {showNewFolderInput ? (
                  <form onSubmit={handleCreateFolder} className={styles.newFolderInputRow}>
                    <input
                      type="text"
                      className={styles.folderInput}
                      placeholder="Nombre carpeta..."
                      value={newFolderInput}
                      onChange={(e) => setNewFolderInput(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="submit"
                      className={styles.btnSmall}
                      disabled={creatingFolder}
                      style={{ padding: '0.35rem 0.65rem' }}
                    >
                      {creatingFolder ? '...' : 'Crear'}
                    </button>
                    <button
                      type="button"
                      className={styles.btnSmall}
                      onClick={() => setShowNewFolderInput(false)}
                      style={{ padding: '0.35rem 0.65rem' }}
                    >
                      ✕
                    </button>
                  </form>
                ) : (
                  <button
                    type="button"
                    className={styles.folderChip}
                    onClick={() => setShowNewFolderInput(true)}
                    style={{ borderStyle: 'dashed', color: '#c084fc' }}
                    title="Crear una nueva carpeta para organizar imágenes"
                  >
                    + Nueva Carpeta
                  </button>
                )}
              </div>

              {/* Acciones y Búsqueda en la Galería */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="🔍 Buscar en esta carpeta..."
                    value={gallerySearchQuery}
                    onChange={(e) => setGallerySearchQuery(e.target.value)}
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                  />
                  {gallerySearchQuery && (
                    <button
                      type="button"
                      className={styles.btnSmall}
                      onClick={() => setGallerySearchQuery('')}
                      style={{ padding: '0.5rem 0.65rem' }}
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    Carpeta activa: <strong style={{ color: '#c084fc' }}>{currentFolder === 'raiz' ? 'Principal (Raíz)' : currentFolder}</strong>
                  </span>
                  <button
                    type="button"
                    className={styles.btnSmall}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                  >
                    {uploadingImg ? 'Subiendo...' : `📤 Subir a esta carpeta`}
                  </button>
                </div>
              </div>

              {loadingGallery ? (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>Cargando imágenes de la carpeta...</p>
              ) : (() => {
                const filteredImages = galleryImages.filter((img) =>
                  !gallerySearchQuery.trim() || img.filename.toLowerCase().includes(gallerySearchQuery.toLowerCase())
                );

                if (filteredImages.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
                      <p>
                        {gallerySearchQuery
                          ? `No se encontraron imágenes que coincidan con "${gallerySearchQuery}".`
                          : `Aún no hay imágenes en la carpeta "${currentFolder === 'raiz' ? 'Principal' : currentFolder}".`}
                      </p>
                      <p style={{ fontSize: '0.85rem' }}>
                        Usa el botón "Subir a esta carpeta" para agregar imágenes.
                      </p>
                    </div>
                  );
                }

                return (
                  <div className={styles.galleryGrid}>
                    {filteredImages.map((img) => (
                      <div
                        key={img.filename}
                        className={styles.galleryItem}
                        onClick={() => {
                          if (galleryTarget === 'author') {
                            setAuthorAvatar(img.url);
                          } else if (galleryTarget === 'editor') {
                            setEditorImgUrl(img.url);
                          } else {
                            setImage(img.url);
                          }
                          setGalleryOpen(false);
                        }}
                        title={`Seleccionar ${img.filename}`}
                      >
                        <img
                          src={img.url}
                          alt={img.filename}
                          className={styles.galleryThumb}
                          loading="lazy"
                        />
                        <span className={styles.galleryItemLabel}>{img.filename}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal para Crear / Editar Autor (Portal fijado al viewport/pantalla) */}
      {authorModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay} onClick={() => setAuthorModalOpen(false)}>
          <div className={styles.authorModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{authorEditingId ? '✏️ Editar Autor' : '👤 Crear Nuevo Autor'}</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setAuthorModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {/* Tarjeta de Previsualización en Vivo */}
              <div className={styles.authorPreviewCard}>
                <img
                  src={authorAvatar || '/web/logoGP2026.webp'}
                  alt={authorNombre || 'Avatar'}
                  className={styles.authorAvatarPreview}
                  onError={(e) => { e.target.src = '/web/logoGP2026.webp'; }}
                />
                <div className={styles.authorPreviewDetails}>
                  <h4 className={styles.authorPreviewName}>
                    {authorNombre || 'Nombre del Autor'}
                  </h4>
                  <span className={styles.authorPreviewRole}>
                    {authorRol || 'Rol / Título'}
                  </span>
                  <p className={styles.authorPreviewBio}>
                    {authorBio || 'Biografía del autor que aparecerá al pie de cada artículo...'}
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSaveAuthor} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre del Autor:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ej: Jupeson, ProfesorJand, etc."
                    value={authorNombre}
                    onChange={(e) => setAuthorNombre(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Rol / Título:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ej: Challenger TFT & Creador de Contenido"
                    value={authorRol}
                    onChange={(e) => setAuthorRol(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Foto de Perfil / Avatar:</label>
                  <div className={styles.imageActionsRow}>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="/web/logoGP2026.webp o URL de la imagen"
                      value={authorAvatar}
                      onChange={(e) => setAuthorAvatar(e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <input
                      type="file"
                      ref={authorFileInputRef}
                      accept="image/*"
                      onChange={handleAuthorAvatarUpload}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className={styles.btnSmall}
                      onClick={() => authorFileInputRef.current?.click()}
                      disabled={uploadingAuthorAvatar}
                      title="Subir foto desde tu computadora"
                    >
                      {uploadingAuthorAvatar ? '⏳ Subiendo...' : '📤 Subir Foto'}
                    </button>
                    <button
                      type="button"
                      className={styles.btnSmall}
                      onClick={() => {
                        setGalleryTarget('author');
                        setGalleryOpen(true);
                        fetchGallery();
                      }}
                      title="Elegir una imagen de la galería del servidor"
                    >
                      🖼️ Galería
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Biografía breve (aparece al final del artículo):</label>
                  <textarea
                    className={styles.textarea}
                    placeholder="Breve reseña sobre el autor..."
                    value={authorBio}
                    onChange={(e) => setAuthorBio(e.target.value)}
                    rows={3}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => setAuthorModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={savingAuthor}
                  >
                    {savingAuthor ? 'Guardando...' : (authorEditingId ? '💾 Actualizar Autor' : '💾 Guardar Autor')}
                  </button>
                </div>
              </form>

              {/* Lista de Autores Existentes */}
              {autores.length > 0 && (
                <div className={styles.authorListSection}>
                  <div className={styles.authorListTitle}>Autores registrados (haz clic para editar):</div>
                  <div className={styles.authorListGrid}>
                    {autores.map((a) => (
                      <div
                        key={a.id}
                        className={`${styles.authorChip} ${authorEditingId === a.id ? styles.authorChipActive : ''}`}
                        onClick={() => handleEditAuthor(a)}
                        title={`Editar a ${a.nombre}`}
                      >
                        <img
                          src={a.avatar || '/web/logoGP2026.webp'}
                          alt={a.nombre}
                          className={styles.authorChipAvatar}
                          onError={(e) => { e.target.src = '/web/logoGP2026.webp'; }}
                        />
                        <span className={styles.authorChipName}>{a.nombre}</span>
                      </div>
                    ))}
                    <button
                      type="button"
                      className={styles.authorChip}
                      onClick={handleOpenNewAuthor}
                      style={{ borderStyle: 'dashed' }}
                    >
                      <span>+ Crear otro</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Modal para Editar Etiqueta */}
      {tagModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay} onClick={() => setTagModalOpen(false)}>
          <div className={styles.editorImgModalContent} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className={styles.modalHeader}>
              <h3>✏️ Editar Etiqueta</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setTagModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <form onSubmit={handleSaveEditTag} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre de la Etiqueta:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Ej: Venezuela Game Show"
                    value={editingTagName}
                    onChange={(e) => setEditingTagName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Slug URL (Opcional):</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="ej: venezuela-game-show"
                    value={editingTagSlug}
                    onChange={(e) => setEditingTagSlug(e.target.value)}
                  />
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                  ℹ️ Al actualizar esta etiqueta, el cambio se reflejará automáticamente en todos los artículos que la utilicen.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    className={styles.btnSecondary}
                    onClick={() => setTagModalOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className={styles.btnPrimary}
                    disabled={savingTag}
                  >
                    {savingTag ? 'Guardando...' : '💾 Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Modal para Insertar Imagen en el Editor HTML */}
      {editorImgModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay} onClick={() => setEditorImgModalOpen(false)}>
          <div className={styles.editorImgModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>🖼️ Insertar Imagen en el Artículo</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setEditorImgModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className={styles.modalBody}>
              {/* Pestañas de origen de imagen */}
              <div className={styles.tabPillRow}>
                <button
                  type="button"
                  className={`${styles.tabPill} ${editorImgTab === 'url' ? styles.tabPillActive : ''}`}
                  onClick={() => setEditorImgTab('url')}
                >
                  🔗 Pegar URL Directa
                </button>
                <button
                  type="button"
                  className={`${styles.tabPill} ${editorImgTab === 'upload' ? styles.tabPillActive : ''}`}
                  onClick={() => setEditorImgTab('upload')}
                >
                  📤 Subir desde Equipo
                </button>
                <button
                  type="button"
                  className={`${styles.tabPill} ${editorImgTab === 'gallery' ? styles.tabPillActive : ''}`}
                  onClick={() => {
                    setEditorImgTab('gallery');
                    fetchGallery(currentFolder);
                  }}
                >
                  📁 Elegir de Galería
                </button>
              </div>

              {/* Contenido según pestaña activa */}
              {editorImgTab === 'url' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>URL de la Imagen:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="https://... o /blog/..."
                    value={editorImgUrl}
                    onChange={(e) => setEditorImgUrl(e.target.value)}
                  />
                </div>
              )}

              {editorImgTab === 'upload' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <span>Seleccionar archivo para subir:</span>
                    <span style={{ fontSize: '0.8rem', color: '#c084fc' }}>
                      Carpeta destino: {currentFolder === 'raiz' ? 'Principal' : currentFolder}
                    </span>
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="file"
                      ref={editorImgFileRef}
                      accept="image/*"
                      onChange={handleUploadImageForEditor}
                      style={{ display: 'none' }}
                    />
                    <button
                      type="button"
                      className={styles.btnSmall}
                      onClick={() => editorImgFileRef.current?.click()}
                      disabled={editorUploading}
                    >
                      {editorUploading ? '⏳ Subiendo...' : '📁 Elegir Archivo y Subir'}
                    </button>
                    {editorImgUrl && (
                      <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>
                        ✓ Imagen cargada
                      </span>
                    )}
                  </div>
                </div>
              )}

              {editorImgTab === 'gallery' && (
                <div className={styles.formGroup}>
                  {/* Selector rápido de carpeta dentro del modal */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    <button
                      type="button"
                      className={`${styles.folderChip} ${currentFolder === 'raiz' ? styles.folderChipActive : ''}`}
                      onClick={() => fetchGallery('raiz')}
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem' }}
                    >
                      📁 Raíz
                    </button>
                    {galleryFolders.map((f) => (
                      <button
                        key={f}
                        type="button"
                        className={`${styles.folderChip} ${currentFolder === f ? styles.folderChipActive : ''}`}
                        onClick={() => fetchGallery(f)}
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.78rem' }}
                      >
                        📁 {f}
                      </button>
                    ))}
                  </div>

                  {/* Grid de imágenes de galería para seleccionar */}
                  <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.5rem' }}>
                    {loadingGallery ? (
                      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>Cargando galería...</p>
                    ) : galleryImages.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>No hay imágenes en esta carpeta.</p>
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '0.5rem' }}>
                        {galleryImages.map((img) => (
                          <div
                            key={img.filename}
                            onClick={() => setEditorImgUrl(img.url)}
                            style={{
                              cursor: 'pointer',
                              border: editorImgUrl === img.url ? '2px solid #c084fc' : '1px solid rgba(255,255,255,0.1)',
                              borderRadius: '6px',
                              overflow: 'hidden',
                              aspectRatio: '1',
                              background: '#0a0d18'
                            }}
                            title={img.filename}
                          >
                            <img
                              src={img.url}
                              alt={img.filename}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Texto Alternativo (Alt) */}
              <div className={styles.formGroup} style={{ marginTop: '0.75rem' }}>
                <label className={styles.label}>
                  <span>Texto Alternativo (Alt text):</span>
                  <span style={{ fontSize: '0.78rem', color: '#c084fc' }}>Recomendado para Google & SEO</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ej: Tablero de TFT en fase 4 con 6 Rebeldes"
                  value={editorImgAlt}
                  onChange={(e) => setEditorImgAlt(e.target.value)}
                />
              </div>

              {/* Pie de foto / Leyenda opcional */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Pie de foto / Leyenda (Opcional):</span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Aparece debajo de la imagen</span>
                </label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Ej: Posicionamiento óptimo recomendado para la ronda"
                  value={editorImgCaption}
                  onChange={(e) => setEditorImgCaption(e.target.value)}
                />
              </div>

              {/* Previsualización en vivo */}
              {editorImgUrl && (
                <div className={styles.imgPreviewContainer}>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
                    Vista Previa:
                  </span>
                  <img
                    src={editorImgUrl}
                    alt={editorImgAlt || 'Preview'}
                    className={styles.imgPreviewThumb}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {editorImgCaption && (
                    <span style={{ fontSize: '0.8rem', color: '#c084fc', fontStyle: 'italic', display: 'block', marginTop: '0.35rem' }}>
                      {editorImgCaption}
                    </span>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={() => setEditorImgModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={handleInsertImageToEditor}
                  disabled={!editorImgUrl.trim()}
                >
                  ✅ Insertar en el Editor
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminBlog;
