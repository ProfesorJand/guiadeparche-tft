// Datos y estructura de las publicaciones del Blog de Guía de Parche (Conexión a Base de Datos)

export const BLOG_TAGS = [
  { id: 'todos', label: 'Todos los Artículos' },
  { id: 'jupeson', label: 'Jupeson' },
  { id: 'tft', label: 'Teamfight Tactics' },
  { id: 'novedades', label: 'Novedades' },
  { id: 'vgs', label: 'Venezuela Game Show' },
  { id: 'parches', label: 'Parches' },
  { id: 'guiadeparche', label: 'Guía de Parche' }
];

/* ============================================================================
   BLOGS LOCALES DE EJEMPLO (COMENTADOS A PETICIÓN DEL USUARIO PARA VER
   ÚNICAMENTE LOS DE LA BASE DE DATOS)
============================================================================
export const BLOG_POSTS_LOCAL = [
  {
    id: 1,
    slug: 'bienvenidos-al-nuevo-blog-de-guiadeparche',
    title: '¡Bienvenidos al Blog Oficial de Guía de Parche! Novedades, TFT y el Futuro de la Comunidad',
    excerpt: 'Inauguramos nuestro nuevo espacio editorial. Entérate de todas las novedades para Teamfight Tactics, las actualizaciones de la plataforma web y la visión competitiva de la mano de Jupeson.',
    date: '2026-10-27',
    formattedDate: '27 de Octubre, 2026',
    readTime: '4 min de lectura',
    featured: true,
    author: {
      name: 'Jupeson',
      role: 'Challenger TFT & Creador de Contenido',
      avatar: '/web/logoGP2026.webp'
    },
    tags: ['jupeson', 'teamfight tactics', 'novedades', 'guiadeparche'],
    image: '/blog/blog_tft_cover.jpg',
    video: 'https://youtu.be/LOy-MAicf_8',
    content: `<p class="lead">Hoy damos un paso trascendental...</p>`
  },
  {
    id: 2,
    slug: 'analisis-meta-tft-mejores-composiciones-subir-de-rango',
    title: 'Análisis del Meta de TFT: Las Claves para Asegurar Top 4 de Forma Consistente',
    excerpt: 'Desglosamos las estrategias más sólidas del parche actual...',
    date: '2026-10-24',
    formattedDate: '24 de Octubre, 2026',
    readTime: '6 min de lectura',
    featured: false,
    author: {
      name: 'ProfesorJand',
      role: 'Coach TFT & Desarrollador Web',
      avatar: '/web/logoGP2026.webp'
    },
    tags: ['teamfight tactics', 'parches', 'guiadeparche'],
    image: '/blog/blog_tft_meta.jpg',
    content: `<p class="lead">Subir de rango en TFT requiere consistencia...</p>`
  },
  {
    id: 3,
    slug: 'master-plan-metodologia-pensar-como-challenger',
    title: 'La Metodología del Master Plan: Cómo Pensar como un Jugador Challenger',
    excerpt: 'Descubre los fundamentos detrás del entrenamiento competitivo de Jupeson...',
    date: '2026-10-20',
    formattedDate: '20 de Octubre, 2026',
    readTime: '5 min de lectura',
    featured: false,
    author: {
      name: 'Jupeson',
      role: 'Challenger TFT & Creador de Contenido',
      avatar: '/web/logoGP2026.webp'
    },
    tags: ['jupeson', 'teamfight tactics', 'novedades'],
    image: '/blog/blog_master_plan.jpg',
    content: `<p class="lead">El Master Plan nació de una necesidad compartida...</p>`
  }
];
============================================================================ */

// Helper para formatear fechas a español
export const formatBlogDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString.replace(' ', 'T'));
  if (isNaN(date.getTime())) return dateString;
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  return `${date.getDate()} de ${meses[date.getMonth()]}, ${date.getFullYear()}`;
};

// Helper para normalizar el post recibido de la base de datos MySQL
export const normalizePost = (post) => {
  if (!post) return null;

  let tags = [];
  if (Array.isArray(post.tags)) {
    tags = post.tags
      .map((t) => {
        if (typeof t === 'string') return t;
        return t.slug || t.nombre || '';
      })
      .filter(Boolean);
  }

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content || '',
    image: post.image || '/blog/blog_tft_cover.jpg',
    video: post.video || null,
    featured: Boolean(Number(post.featured)),
    readTime: post.read_time || '4 min de lectura',
    date: post.created_at ? post.created_at.split(' ')[0] : '',
    formattedDate: formatBlogDate(post.created_at),
    author: {
      name: post.autor_nombre || 'Jupeson',
      role: post.autor_rol || 'Creador de Contenido',
      avatar: post.autor_avatar || '/web/logoGP2026.webp',
      bio: post.autor_bio || ''
    },
    tags
  };
};

// Función para obtener las publicaciones de la base de datos ordenadas por fecha
export const getSortedBlogPosts = async () => {
  try {
    const res = await fetch('https://api.guiadeparche.com/blog/get_posts.php');
    const data = await res.json();
    if (data.success && Array.isArray(data.posts)) {
      return data.posts
        .map(normalizePost)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (err) {
    console.error('Error al obtener posts de la base de datos:', err);
  }
  return [];
};

// Función para obtener un blog por su slug desde la base de datos
export const getBlogPostBySlug = async (slug) => {
  try {
    const res = await fetch(`https://api.guiadeparche.com/blog/get_posts.php?slug=${encodeURIComponent(slug)}`);
    const data = await res.json();
    if (data.success && data.post) {
      return normalizePost(data.post);
    }
  } catch (err) {
    console.error('Error al consultar post por slug:', err);
  }
  return null;
};

// Función para filtrar publicaciones por etiqueta y búsqueda
export const filterBlogPosts = (posts = [], tag = 'todos', query = '') => {
  const normalizedTag = (tag || 'todos').toLowerCase().trim();
  const normalizedQuery = (query || '').toLowerCase().trim();

  return posts.filter((post) => {
    const matchesTag =
      normalizedTag === 'todos' ||
      post.tags.some((t) => {
        const lower = t.toLowerCase();
        return (
          lower === normalizedTag ||
          lower.replace(/\s+/g, '-') === normalizedTag.replace(/\s+/g, '-')
        );
      });

    const matchesQuery =
      normalizedQuery === '' ||
      post.title.toLowerCase().includes(normalizedQuery) ||
      post.excerpt.toLowerCase().includes(normalizedQuery) ||
      post.tags.some((t) => t.toLowerCase().includes(normalizedQuery));

    return matchesTag && matchesQuery;
  });
};
