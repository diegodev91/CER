'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reels', [
      {
        title: 'TÍO FACTOS Y SU HISTORIA CALETA DE CHICAGO CHICO EN SURQUILLO | TÍO FACTUS 👴',
        description: 'Tío Factos nos cuenta la increíble historia de Chicago Chico en Surquillo, una caleta llena de secretos y aventuras urbanas que no conocías.',
        youtube_video_id: '9-R9-ZxIuW4',
        youtube_shorts_url: 'https://youtube.com/shorts/9-R9-ZxIuW4',
        thumbnail_url: 'https://i.ytimg.com/vi/9-R9-ZxIuW4/maxresdefault.jpg',
        duration: 689, // 11:29 minutos
        view_count: 4200,
        like_count: 180,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-07-04'),
        tags: JSON.stringify(['tio-factos', 'chicago-chico', 'surquillo', 'historia', 'urbano']),
        category: 'other',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'DANIEL MARQUINA: EL MARRÓN MÁS BLANCO',
        description: 'Una reflexión profunda y divertida sobre la identidad racial y cultural en el Perú, con Daniel Marquina como protagonista de esta historia única.',
        youtube_video_id: '87_Yf_rCBoA',
        youtube_shorts_url: 'https://youtube.com/shorts/87_Yf_rCBoA',
        thumbnail_url: 'https://i.ytimg.com/vi/87_Yf_rCBoA/maxresdefault.jpg',
        duration: 763, // 12:43 minutos
        view_count: 48000,
        like_count: 2100,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-06-27'),
        tags: JSON.stringify(['daniel-marquina', 'identidad', 'racial', 'peru', 'reflexion']),
        category: 'community',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '💥 ¡PHILLIP BUTTERS derramando BRUT4LIDAD en LRR! 💥',
        description: 'Phillip Butters no se guarda nada y suelta toda su brutalidad verbal en La Roro Network. Un momento épico que no te puedes perder.',
        youtube_video_id: '6Zrn27IRpBk',
        youtube_shorts_url: 'https://youtube.com/shorts/6Zrn27IRpBk',
        thumbnail_url: 'https://i.ytimg.com/vi/6Zrn27IRpBk/maxresdefault.jpg',
        duration: 886, // 14:46 minutos
        view_count: 37000,
        like_count: 1800,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-06-25'),
        tags: JSON.stringify(['phillip-butters', 'brutalidad', 'lrr', 'explosivo', 'viral']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '¡Basta de callar! 💥 ¡Jhovan D3STRUYE a Claudia Toro tras insultos!',
        description: 'Jhovan no aguanta más y explota contra Claudia Toro después de una serie de insultos. Un momento tenso que dividió opiniones en redes sociales.',
        youtube_video_id: 'qCUALdz_Olg',
        youtube_shorts_url: 'https://youtube.com/shorts/qCUALdz_Olg',
        thumbnail_url: 'https://i.ytimg.com/vi/qCUALdz_Olg/maxresdefault.jpg',
        duration: 573, // 9:33 minutos
        view_count: 54000,
        like_count: 2400,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-06-20'),
        tags: JSON.stringify(['jhovan', 'claudia-toro', 'pelea', 'insultos', 'viral']),
        category: 'other',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '💥¡Gabo EXPLOTA! y defiende EL USO DE ARM4S en PERÚ 🔫 ¡NO NOS QUEDA DE OTRA!',
        description: 'Gabo explota y defiende firmemente el uso de armas en Perú como medida de seguridad. Una posición controversial que generó mucho debate.',
        youtube_video_id: 'GTirJlDH7mo',
        youtube_shorts_url: 'https://youtube.com/shorts/GTirJlDH7mo',
        thumbnail_url: 'https://i.ytimg.com/vi/GTirJlDH7mo/maxresdefault.jpg',
        duration: 1260, // 21 minutos
        view_count: 9500,
        like_count: 450,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-06-18'),
        tags: JSON.stringify(['gabo', 'armas', 'seguridad', 'peru', 'controversial']),
        category: 'other',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '💥 MACLA NO PUEDE MÁS Y EXPLOTA CONTRA EL TEMACH � | #OUKE',
        description: 'Macla llega a su límite y explota contra El Temach en una discusión épica que quedará para la historia de OUKE.',
        youtube_video_id: 'Tv8vLf6Mqsc',
        youtube_shorts_url: 'https://youtube.com/shorts/Tv8vLf6Mqsc',
        thumbnail_url: 'https://i.ytimg.com/vi/Tv8vLf6Mqsc/maxresdefault.jpg',
        duration: 743, // 12:23 minutos
        view_count: 16000,
        like_count: 750,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-06-15'),
        tags: JSON.stringify(['macla', 'temach', 'ouke', 'pelea', 'explosivo']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '¡LE QUITAN EL TRONO! 👑 BETO ORTIZ EN PICADA 😱 | DANY TSUKAMOTO SE IMPONE EN EL RATING',
        description: 'Análisis del momento en que Dany Tsukamoto supera a Beto Ortiz en rating televisivo, marcando un antes y después en la TV peruana.',
        youtube_video_id: 'e4F7W2qktbw',
        youtube_shorts_url: 'https://youtube.com/shorts/e4F7W2qktbw',
        thumbnail_url: 'https://i.ytimg.com/vi/e4F7W2qktbw/maxresdefault.jpg',
        duration: 1980, // 33 minutos
        view_count: 23000,
        like_count: 1100,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-06-10'),
        tags: JSON.stringify(['beto-ortiz', 'dany-tsukamoto', 'rating', 'television', 'trono']),
        category: 'other',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reels', null, {});
  }
};
