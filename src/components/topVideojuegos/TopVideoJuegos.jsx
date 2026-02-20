import React from "react";
import { TOP10ANUAL, TOP10FEBRERO, TOP10MARZO } from "@stores/dataVideojuegos.js";

const VideoGameTopList = ({ type = "anual" }) => {
  const data =
    type === "febrero"
      ? TOP10FEBRERO
      : type === "marzo"
      ? TOP10MARZO
      : TOP10ANUAL;

  const sortedData = [...data].sort(
    (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
  );

  const titleMap = {
    anual: "Top 10 Mejores Videojuegos 2026",
    febrero: "Top 10 Lanzamientos Videojuegos Febrero 2026",
    marzo: "Top 10 Lanzamientos Videojuegos Marzo 2026",
  };

  const pageTitle = titleMap[type];

  return (
    <>
      {/* SEO META */}
      <main className="videogame-container">
        <h1>{pageTitle}</h1>

        <section className="games-grid">
          {sortedData.map((game, index) => (
            <article
              key={game.title}
              className="game-card"
              itemScope
              itemType="https://schema.org/VideoGame"
            >

              <img
                src={game.imageUrl}
                alt={`${game.title} portada oficial 2026`}
                loading="lazy"
                itemProp="image"
              />


              <div className="game-content">
                <h2 itemProp="name">
                {game.title}
                </h2>
                <p itemProp="description">{game.description}</p>

              </div>

              <p className="release-wrapper">
                <strong>Fecha de lanzamiento:</strong>
                <time
                  className="release-date"
                  dateTime={game.releaseDate}
                  itemProp="datePublished"
                >
                  {game.releaseDate}
                </time>
              </p>

              <p className="release-wrapper">
                <strong>Plataformas:</strong>
                <span itemProp="gamePlatform">
                  {game.platforms.join(", ")}
                </span>
              </p>

              <a
                href={game.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                itemProp="url"
                className="trailer-button"
              >
                Ver Trailer Oficial
              </a>
            </article>
          ))}
        </section>
      </main>

      <style jsx>{`
        .videogame-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        h1 {
          font-size: 2.2rem;
          margin-bottom: 2rem;
          text-align: center;
        }

        h2 {
          text-align:left;
        }

        .games-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .game-card {
          display: flex;
          gap: 1.5rem;
          background: #111;
          color: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
          align-items: center;
        }


        .game-card img {
          flex: 0 0 220px; /* ancho fijo */
          width: 220px;
          height: auto;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .game-content {
          flex: 2; /* ocupa más espacio */
        }

        .release-wrapper {
          flex: 1;
          min-width: 140px;
        }


        .release-wrapper strong {
          display: block;
        }

        .release-date {
          display: block;
          margin-top: 4px;
        }

        .trailer-button {
          display: inline-block;
          margin-top: 1rem;
          background: #e50914;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          color: #fff;
          text-decoration: none;
          font-weight: bold;
          flex: 0.5
        }

        .trailer-button:hover {
          background: #ff1f2d;
        }
      `}</style>
    </>
  );
};

export default VideoGameTopList;
