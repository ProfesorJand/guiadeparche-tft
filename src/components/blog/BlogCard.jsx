import { setBlogTag } from '@stores/blogStore';
import styles from './css/BlogCard.module.css';

// Componente individual de tarjeta para noticias y novedades del blog
const BlogCard = ({ post }) => {
  if (!post) return null;

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    const isBlogListPage = typeof window !== 'undefined' && 
      (window.location.pathname === '/blog' || window.location.pathname === '/blog/');

    if (isBlogListPage) {
      setBlogTag(tag);
      window.history.replaceState(null, '', `/blog/?tag=${encodeURIComponent(tag)}`);
    } else {
      window.location.href = `/blog/?tag=${encodeURIComponent(tag)}`;
    }
  };

  return (
    <a href={`/blog/${post.slug}/`} className={styles.card} aria-label={`Leer artículo: ${post.title}`}>
      <div className={styles.imageWrapper}>
        <img
          src={post.image}
          alt={post.title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />
        {post.featured && (
          <span className={styles.badgeFeatured}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Destacado
          </span>
        )}
        <span className={styles.readTimeBadge}>{post.readTime}</span>
      </div>

      <div className={styles.cardBody}>

        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.tagsRow}>
          {post.tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.tagPill}
              onClick={(e) => handleTagClick(e, tag)}
              title={`Filtrar por ${tag}`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.authorSection}>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className={styles.avatar}
              loading="lazy"
            />
            <div className={styles.authorMeta}>
              <span className={styles.authorName}>{post.author.name}</span>
              <span className={styles.postDate}>{post.formattedDate}</span>
            </div>
          </div>

          <span className={styles.readMoreBtn}>
            Leer más
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
};

export default BlogCard;
