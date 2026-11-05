import { atom } from 'nanostores';

// Estado global para la etiqueta activa seleccionada en el blog
export const activeBlogTag = atom('todos');

// Estado global para el término de búsqueda en el blog
export const searchBlogQuery = atom('');

// Acciones para actualizar el estado del blog
export const setBlogTag = (tag) => {
  activeBlogTag.set(tag);
};

export const setBlogQuery = (query) => {
  searchBlogQuery.set(query);
};

export const resetBlogFilters = () => {
  activeBlogTag.set('todos');
  searchBlogQuery.set('');
  if (typeof window !== 'undefined' && (window.location.pathname === '/blog' || window.location.pathname === '/blog/')) {
    window.history.replaceState(null, '', '/blog/');
  }
};
