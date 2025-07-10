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
        duration: 130, // 2 horas 10 minutos
        airDate: new Date('2025-01-09'),
        isPublished: true,
        viewCount: 8500,
        tags: JSON.stringify(['coneros', 'colaboracion', 'episodio-especial', 'streaming', 'peru']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'JEFRAIN cuenta los CHISMES de KICK 😱 | CER: CUIDANDO EL RANCHO',
        description: 'Jefrain llega al rancho para contarnos todos los secretos, chismes y curiosidades de la plataforma Kick. El Doctor Oñito, El Grillo y Gerardo Manuel no pueden creer lo que escuchan en este episodio lleno de revelaciones.',
        season: 1,
        episodeNumber: 2,
        youtubeVideoId: 'lyTcaR9LumE',
        thumbnailUrl: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 132, // 2 horas 12 minutos
        airDate: new Date('2025-01-08'),
        isPublished: true,
        viewCount: 12400,
        tags: JSON.stringify(['jefrain', 'kick', 'chismes', 'streaming', 'revelaciones']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('episodes', null, {});
  }
};
