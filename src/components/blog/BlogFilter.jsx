import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { activeBlogTag, searchBlogQuery, setBlogTag, setBlogQuery } from '@stores/blogStore';
import { BLOG_TAGS } from '@data/blogData';
import styles from './css/BlogFilter.module.css';

// Componente para la barra de búsqueda y filtrado por etiquetas del blog
const BlogFilter = () => {
  const currentTag = useStore(activeBlogTag);
  const currentQuery = useStore(searchBlogQuery);
  const [tags, setTags] = useState(BLOG_TAGS);

  // Leer parámetro ?tag= de la URL y cargar tags de la base de datos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tagFromUrl = params.get('tag');
      if (tagFromUrl) {
        setBlogTag(decodeURIComponent(tagFromUrl).toLowerCase());
      }
    }

    const fetchTags = async () => {
      try {
        const res = await fetch('https://api.guiadeparche.com/blog/tags.php');
        const data = await res.json();
        if (data.success && Array.isArray(data.tags) && data.tags.length > 0) {
          const apiTags = data.tags.map((t) => ({
            id: t.slug,
            label: t.nombre
          }));
          setTags([{ id: 'todos', label: 'Todos los Artículos' }, ...apiTags]);
        }
      } catch (e) {
        // Mantiene BLOG_TAGS por defecto
      }
    };

    fetchTags();
  }, []);

  const handleTagClick = (tagId) => {
    setBlogTag(tagId);
    if (typeof window !== 'undefined') {
      const url = tagId === 'todos' ? '/blog/' : `/blog/?tag=${encodeURIComponent(tagId)}`;
      window.history.replaceState(null, '', url);
    }
  };

  const handleSearchChange = (event) => {
    setBlogQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setBlogQuery('');
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar noticias o novedades..."
            value={currentQuery}
            onChange={handleSearchChange}
            aria-label="Buscar noticias o novedades"
          />
          {currentQuery && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClearSearch}
              title="Borrar búsqueda"
              aria-label="Borrar búsqueda"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.activeStatus}>
          <span>Filtrando por:</span>
          <span className={styles.activeTagHighlight}>
            {currentTag === 'todos' ? 'Todas las noticias' : currentTag}
          </span>
        </div>
      </div>

      <div className={styles.tagsWrapper}>
        {tags.map((tag) => {
          const isActive = currentTag.toLowerCase() === tag.id.toLowerCase();
          return (
            <button
              key={tag.id}
              type="button"
              className={`${styles.tagButton} ${isActive ? styles.tagActive : ''}`}
              onClick={() => handleTagClick(tag.id)}
            >
              <span className={styles.tagIconDot} />
              {tag.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogFilter;
