'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reels', [
      {
        title: 'SOMOS CONEROS Y CER.ranos ft. @LosConeros 😶 | CUIDANDO EL RANCHO',
        description: 'El Grillo, Doctor Oñito y Gerardo Manuel junto a Los Coneros en este episodio especial de Cuidando el Rancho.',
        youtube_video_id: 'STs99b6L8_4',
        youtube_shorts_url: 'https://youtube.com/shorts/STs99b6L8_4',
        thumbnail_url: 'https://i.ytimg.com/vi/STs99b6L8_4/maxresdefault.jpg',
        duration: 130, // 2:10 minutos
        view_count: 8500,
        like_count: 420,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-01-09'),
        tags: JSON.stringify(['coneros', 'colaboracion', 'episodio-especial', 'grillo', 'doctor-onito']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'JEFRAIN cuenta los CHISMES de KICK 😱 | CUIDANDO EL RANCHO',
        description: 'Jefrain nos trae todos los chismes y secretos de la plataforma Kick en este episodio explosivo.',
        youtube_video_id: 'lyTcaR9LumE',
        youtube_shorts_url: 'https://youtube.com/shorts/lyTcaR9LumE',
        thumbnail_url: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 132, // 2:12 minutos
        view_count: 12400,
        like_count: 580,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-01-08'),
        tags: JSON.stringify(['jefrain', 'kick', 'chismes', 'streaming', 'noticias']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Momentos Divertidos del Rancho 🐄',
        description: 'Los momentos más graciosos y divertidos que han pasado en el rancho con nuestros presentadores.',
        youtube_video_id: 'STs99b6L8_4', // Reutilizando para reel corto
        youtube_shorts_url: 'https://youtube.com/shorts/STs99b6L8_4',
        thumbnail_url: 'https://i.ytimg.com/vi/STs99b6L8_4/maxresdefault.jpg',
        duration: 45,
        view_count: 6800,
        like_count: 320,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-01-07'),
        tags: JSON.stringify(['divertido', 'rancho', 'animales', 'comedy']),
        category: 'funny',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'El Grillo y sus Ocurrencias 🦗',
        description: 'Las mejores frases y momentos del Grillo que nos han hecho reír a carcajadas.',
        youtube_video_id: 'lyTcaR9LumE', // Reutilizando para reel corto
        youtube_shorts_url: 'https://youtube.com/shorts/lyTcaR9LumE',
        thumbnail_url: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 38,
        view_count: 9200,
        like_count: 450,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-01-06'),
        tags: JSON.stringify(['grillo', 'ocurrencias', 'frases', 'humor']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Saludos de la Comunidad CerRanos 💚',
        description: 'Los CerRanos más fieles envían sus saludos y mensajes de apoyo al programa.',
        youtube_video_id: 'STs99b6L8_4',
        youtube_shorts_url: 'https://youtube.com/shorts/STs99b6L8_4',
        thumbnail_url: 'https://i.ytimg.com/vi/STs99b6L8_4/maxresdefault.jpg',
        duration: 52,
        view_count: 4600,
        like_count: 280,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-01-05'),
        tags: JSON.stringify(['community', 'ceranos', 'saludos', 'fandom']),
        category: 'community',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Behind the Scenes: La Producción del Programa 🎬',
        description: 'Una mirada exclusiva detrás de cámaras de cómo se produce Cuidando el Rancho.',
        youtube_video_id: 'lyTcaR9LumE',
        youtube_shorts_url: 'https://youtube.com/shorts/lyTcaR9LumE',
        thumbnail_url: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 65,
        view_count: 7300,
        like_count: 380,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-01-04'),
        tags: JSON.stringify(['behind-scenes', 'produccion', 'equipo', 'exclusivo']),
        category: 'behind-scenes',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reels', null, {});
  }
};
