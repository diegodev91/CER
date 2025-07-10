'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('episodes', [
      {
        title: 'SOMOS CONEROS Y CER.ranos ft. @LosConeros 😶 | CER: CUIDANDO EL RANCHO',
        description: 'En este episodio especial, El Grillo, el Doctor Oñito y Gerardo Manuel reciben a Los Coneros para hablar sobre la unión entre las dos comunidades más queridas del streaming peruano. Un episodio lleno de risas, anécdotas y momentos únicos que no te puedes perder.',
        season: 1,
        episodeNumber: 1,
        youtubeVideoId: 'STs99b6L8_4',
        thumbnailUrl: 'https://i.ytimg.com/vi/STs99b6L8_4/maxresdefault.jpg',
        duration: 7800, // 2 horas 10 minutos
        airDate: new Date('2025-07-09'),
        isPublished: true,
        viewCount: 10000,
        tags: JSON.stringify(['coneros', 'colaboracion', 'episodio-especial', 'streaming', 'peru']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'SI REÍMOS PERDEMOS | CER: CUIDANDO EL RANCHO',
        description: 'Los CerRanos se enfrentan al desafío de "Si Reímos Perdemos" con los mejores memes, videos y momentos divertidos. ¿Podrán mantener la compostura El Grillo, Doctor Oñito y Gerardo Manuel?',
        season: 1,
        episodeNumber: 2,
        youtubeVideoId: 'O-T2uch9mF0',
        thumbnailUrl: 'https://i.ytimg.com/vi/O-T2uch9mF0/maxresdefault.jpg',
        duration: 7800, // 2 horas 10 minutos
        airDate: new Date('2025-07-07'),
        isPublished: true,
        viewCount: 17000,
        tags: JSON.stringify(['challenge', 'humor', 'reir', 'memes', 'divertido']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'NOS PREPARAMOS AL CERTONAZO | CER: CUIDANDO EL RANCHO',
        description: 'Los hosts se preparan para el gran evento CERtonazo. Planificación, ensayos y momentos únicos mientras se alistan para encontrarse con su comunidad en vivo.',
        season: 1,
        episodeNumber: 3,
        youtubeVideoId: '1Ut-DP5-Kzc',
        thumbnailUrl: 'https://i.ytimg.com/vi/1Ut-DP5-Kzc/maxresdefault.jpg',
        duration: 6300, // 1 hora 45 minutos
        airDate: new Date('2025-07-04'),
        isPublished: true,
        viewCount: 19000,
        tags: JSON.stringify(['certonazo', 'evento', 'preparacion', 'en-vivo', 'comunidad']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'OÑITO BUSCA SU +1 PARA EL BENZADETONAZO💦 | CER: CUIDANDO EL RANCHO',
        description: 'El Doctor Oñito se embarca en la búsqueda de su acompañante perfecto para el Benzadetonazo. Un episodio lleno de sorpresas, risas y momentos únicos.',
        season: 1,
        episodeNumber: 4,
        youtubeVideoId: 'dmspIMcKCqk',
        thumbnailUrl: 'https://i.ytimg.com/vi/dmspIMcKCqk/maxresdefault.jpg',
        duration: 10140, // 2 horas 49 minutos
        airDate: new Date('2025-07-03'),
        isPublished: true,
        viewCount: 19000,
        tags: JSON.stringify(['onito', 'benzadetonazo', 'busqueda', 'pareja', 'divertido']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'JEFRAIN cuenta los CHISMES de KICK 😱 | CER: CUIDANDO EL RANCHO',
        description: 'Jefrain llega al rancho para contarnos todos los secretos, chismes y curiosidades de la plataforma Kick. El Doctor Oñito, El Grillo y Gerardo Manuel no pueden creer lo que escuchan.',
        season: 1,
        episodeNumber: 5,
        youtubeVideoId: 'lyTcaR9LumE',
        thumbnailUrl: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 7920, // 2 horas 12 minutos
        airDate: new Date('2025-07-08'),
        isPublished: true,
        viewCount: 14000,
        tags: JSON.stringify(['jefrain', 'kick', 'chismes', 'streaming', 'revelaciones']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'LA SHIQUI LLEGA A CER | CER: CUIDANDO EL RANCHO',
        description: 'La Shiqui visita el rancho en un episodio especial lleno de música, entretenimiento y momentos únicos con los hosts de CER.',
        season: 1,
        episodeNumber: 6,
        youtubeVideoId: 'cTC7TnyXE80',
        thumbnailUrl: 'https://i.ytimg.com/vi/cTC7TnyXE80/maxresdefault.jpg',
        duration: 9420, // 2 horas 37 minutos
        airDate: new Date('2025-07-02'),
        isPublished: true,
        viewCount: 28000,
        tags: JSON.stringify(['shiqui', 'musica', 'invitada', 'especial', 'entretenimiento']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'CHESPIRITO TIENE 6 ERRORES | CER: CUIDANDO EL RANCHO',
        description: 'Los CerRanos analizan la icónica serie de Chespirito y descubren detalles curiosos y errores que nunca habías notado. Un homenaje lleno de nostalgia y humor.',
        season: 1,
        episodeNumber: 7,
        youtubeVideoId: '7QhqxqHToD8',
        thumbnailUrl: 'https://i.ytimg.com/vi/7QhqxqHToD8/maxresdefault.jpg',
        duration: 8520, // 2 horas 22 minutos
        airDate: new Date('2025-06-30'),
        isPublished: true,
        viewCount: 23000,
        tags: JSON.stringify(['chespirito', 'analisis', 'errores', 'nostalgia', 'television']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'EL MEJOR AMIGO DEL HOMBRE | CER: CUIDANDO EL RANCHO',
        description: 'Un episodio especial dedicado a nuestros amigos peludos. Historias emotivas, anécdotas divertidas y momentos tiernos en el rancho.',
        season: 1,
        episodeNumber: 8,
        youtubeVideoId: 'pU_7nV5Ul1o',
        thumbnailUrl: 'https://i.ytimg.com/vi/pU_7nV5Ul1o/maxresdefault.jpg',
        duration: 8580, // 2 horas 23 minutos
        airDate: new Date('2025-07-01'),
        isPublished: true,
        viewCount: 17000,
        tags: JSON.stringify(['perros', 'mascotas', 'animales', 'emotivo', 'rancho']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PHILLIP CHU JOY llega a CER | CUIDANDO EL RANCHO',
        description: 'El reconocido gamer y streamer Phillip Chu Joy visita el rancho para una entrevista épica llena de gaming, anécdotas y momentos únicos.',
        season: 1,
        episodeNumber: 9,
        youtubeVideoId: 'DZtA1wG2-fQ',
        thumbnailUrl: 'https://i.ytimg.com/vi/DZtA1wG2-fQ/maxresdefault.jpg',
        duration: 8160, // 2 horas 16 minutos
        airDate: new Date('2025-06-18'),
        isPublished: true,
        viewCount: 37000,
        tags: JSON.stringify(['phillip-chu-joy', 'gaming', 'streamer', 'invitado', 'tecnologia']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'HABEMUS CER en VIVO | CER: CUIDANDO EL RANCHO',
        description: 'Anuncio oficial del evento en vivo de CER. Los hosts revelan todos los detalles del gran encuentro con la comunidad CerRanos.',
        season: 1,
        episodeNumber: 10,
        youtubeVideoId: 'qVv8dMMv9L0',
        thumbnailUrl: 'https://i.ytimg.com/vi/qVv8dMMv9L0/maxresdefault.jpg',
        duration: 8100, // 2 horas 15 minutos
        airDate: new Date('2025-06-25'),
        isPublished: true,
        viewCount: 27000,
        tags: JSON.stringify(['evento', 'en-vivo', 'anuncio', 'comunidad', 'ceranos']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('episodes', null, {});
  }
};
