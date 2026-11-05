import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { activeBlogTag, searchBlogQuery, resetBlogFilters } from '@stores/blogStore';
import { filterBlogPosts, normalizePost } from '@data/blogData';
import BlogCard from './BlogCard';
import styles from './css/BlogGrid.module.css';

// Componente para renderizar la grilla de publicaciones filtradas y ordenadas por fecha
const BlogGrid = ({ initialPosts = [] }) => {
  const currentTag = useStore(activeBlogTag);
  const currentQuery = useStore(searchBlogQuery);
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  // Consultar posts actualizados desde la base de datos
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://api.guiadeparche.com/blog/get_posts.php');
        const data = await res.json();
        if (data.success && Array.isArray(data.posts)) {
          const normalized = data.posts
            .map(normalizePost)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setPosts(normalized);
        }
      } catch (err) {
        console.error('Error al actualizar posts en el cliente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Obtenemos los artículos filtrados y ordenados por fecha de creación (los más recientes primero)
  const filteredPosts = filterBlogPosts(posts, currentTag, currentQuery);

  const isFiltering = currentTag !== 'todos' || currentQuery.trim() !== '';

  return (
    <div className={styles.gridContainer}>
      <div className={styles.resultsHeader}>
        <span>
          Mostrando <span className={styles.countHighlight}>{filteredPosts.length}</span>{' '}
          {filteredPosts.length === 1 ? 'noticia o novedad' : 'noticias o novedades'}
        </span>

        {isFiltering && (
          <button
            type="button"
            className={styles.clearFilterLink}
            onClick={resetBlogFilters}
          >
            Ver todas las publicaciones
          </button>
        )}
      </div>

      {loading && posts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem 0' }}>
          Cargando noticias desde la base de datos...
        </p>
      ) : filteredPosts.length > 0 ? (
        <div className={styles.cardsGrid}>
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon} aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h4 className={styles.emptyTitle}>No se encontraron publicaciones</h4>
          <p className={styles.emptyDescription}>
            No hay noticias que coincidan con la etiqueta <strong>"{currentTag}"</strong>
            {currentQuery && ` o la búsqueda "${currentQuery}"`}. Intenta seleccionar otra etiqueta o restablecer los filtros.
          </p>
          <button
            type="button"
            className={styles.resetBtn}
            onClick={resetBlogFilters}
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogGrid;
