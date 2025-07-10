'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('episodes', [
      {
        title: '¡MARINA GOLD ENCIENDE OUKE! 🔥 ¿CÓMO SE PREPARA PARA GRABAR?',
        description: 'Marina Gold llega a OUKE para contarnos todos los secretos de su carrera, cómo se prepara para sus grabaciones y los detalles más íntimos de su trabajo. Una entrevista sin filtros que no te puedes perder.',
        season: 1,
        episodeNumber: 1,
        youtubeVideoId: 'rlR_bMmc-ag',
        thumbnailUrl: 'https://i.ytimg.com/vi/rlR_bMmc-ag/maxresdefault.jpg',
        duration: 1980, // 33 minutos
        airDate: new Date('2025-07-09'),
        isPublished: true,
        viewCount: 5100,
        tags: JSON.stringify(['marina-gold', 'ouke', 'entrevista', 'exclusiva', 'streaming']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '¿PERIODISTAS SE CORREN DE JUGADORES? | FE',
        description: 'Un debate intenso sobre la relación entre periodistas deportivos y jugadores de fútbol. ¿Existe miedo o respeto? Los panelistas de FE analizan esta polémica situación en el fútbol peruano.',
        season: 1,
        episodeNumber: 2,
        youtubeVideoId: 'xzwsTeg1XM4',
        thumbnailUrl: 'https://i.ytimg.com/vi/xzwsTeg1XM4/maxresdefault.jpg',
        duration: 1080, // 18 minutos
        airDate: new Date('2025-07-06'),
        isPublished: true,
        viewCount: 24000,
        tags: JSON.stringify(['periodismo', 'futbol', 'debate', 'fe', 'deportes']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '¿EL MONUMENTAL LE PERTENECE A UNIVERSITARIO O A GREMCO? | FE',
        description: 'Una discusión acalorada sobre la propiedad del Estadio Monumental. Los expertos debaten si realmente pertenece a Universitario de Deportes o si GREMCO tiene derechos sobre él.',
        season: 1,
        episodeNumber: 3,
        youtubeVideoId: 'MwtOK__ehcc',
        thumbnailUrl: 'https://i.ytimg.com/vi/MwtOK__ehcc/maxresdefault.jpg',
        duration: 1200, // 20 minutos
        airDate: new Date('2025-07-05'),
        isPublished: true,
        viewCount: 45000,
        tags: JSON.stringify(['universitario', 'gremco', 'monumental', 'futbol', 'polemica']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'MARTÍN RIEPL Y PERIODISTA TRANS EN TENSO DEBATE | ¡NO ME IMPORTA LO QUE HAGAS ENTRE SÁBANAS!💥',
        description: 'Un debate explosivo entre Martín Riepl y una periodista trans que generó gran controversia. Posiciones encontradas sobre temas de género e ideología en una discusión sin filtros.',
        season: 1,
        episodeNumber: 4,
        youtubeVideoId: 'RrM5NO9nvnY',
        thumbnailUrl: 'https://i.ytimg.com/vi/RrM5NO9nvnY/maxresdefault.jpg',
        duration: 2700, // 45 minutos
        airDate: new Date('2025-07-03'),
        isPublished: true,
        viewCount: 66000,
        tags: JSON.stringify(['martin-riepl', 'debate', 'genero', 'polemica', 'ideologia']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '💥 EL TURRY ENFRENTA A PHILLIP BUTTERS Y A PEDRO CASTILLO 💥 QUIERE INSURGENCIA',
        description: 'El Turry se enfrenta cara a cara con Phillip Butters y Pedro Castillo en un programa explosivo donde habla de insurgencia y cambios radicales para el país.',
        season: 1,
        episodeNumber: 5,
        youtubeVideoId: 'I2GUvBIN7S0',
        thumbnailUrl: 'https://i.ytimg.com/vi/I2GUvBIN7S0/maxresdefault.jpg',
        duration: 3000, // 50 minutos
        airDate: new Date('2025-07-02'),
        isPublished: true,
        viewCount: 131000,
        tags: JSON.stringify(['el-turry', 'phillip-butters', 'pedro-castillo', 'politica', 'insurgencia']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PHILLIP BUTTERS: "EL BUKELE PERUANO" REMECE OUKE! 💥',
        description: 'Phillip Butters llega a OUKE para hablar sobre ser considerado "El Bukele Peruano" y sus propuestas políticas que han causado revuelo en el país.',
        season: 1,
        episodeNumber: 6,
        youtubeVideoId: 'iAAqQ--uoMI',
        thumbnailUrl: 'https://i.ytimg.com/vi/iAAqQ--uoMI/maxresdefault.jpg',
        duration: 4800, // 1 hora 20 minutos
        airDate: new Date('2025-07-01'),
        isPublished: true,
        viewCount: 511000,
        tags: JSON.stringify(['phillip-butters', 'bukele', 'politica', 'ouke', 'propuestas']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '¡LA FAMILIA SE REÚNE! 🤣 RORO SE REENCUENTRA CON SUS HERMANOS 💕',
        description: 'Un episodio especial y emotivo donde Roro se reencuentra con sus hermanos después de mucho tiempo. Risas, lágrimas y momentos familiares únicos.',
        season: 1,
        episodeNumber: 7,
        youtubeVideoId: 'WDTMCNOjtLk',
        thumbnailUrl: 'https://i.ytimg.com/vi/WDTMCNOjtLk/maxresdefault.jpg',
        duration: 2700, // 45 minutos
        airDate: new Date('2025-06-30'),
        isPublished: true,
        viewCount: 79000,
        tags: JSON.stringify(['roro', 'familia', 'hermanos', 'reunion', 'emotivo']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '¿MONTESINOS DEBE VOLVER AL PODER? 💥 PHILLIP BUTTERS SE IMPONE EN NSS 💥',
        description: 'Una pregunta controversial: ¿Debería Vladimiro Montesinos volver al poder? Phillip Butters domina el debate en NSS con argumentos que dividen opiniones.',
        season: 1,
        episodeNumber: 8,
        youtubeVideoId: '9ORiVSytBUE',
        thumbnailUrl: 'https://i.ytimg.com/vi/9ORiVSytBUE/maxresdefault.jpg',
        duration: 3600, // 1 hora
        airDate: new Date('2025-06-29'),
        isPublished: true,
        viewCount: 294000,
        tags: JSON.stringify(['montesinos', 'phillip-butters', 'politica', 'nss', 'controversial']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('episodes', null, {});
  }
};
