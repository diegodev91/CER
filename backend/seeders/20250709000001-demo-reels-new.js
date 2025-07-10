'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('reels', [
      {
        title: 'CUIDANDO EL RANCHO: LLAMAMOS EN VIVO A CER #Shorts',
        description: 'Momento épico cuando llaman en vivo durante el programa Cuidando el Rancho. La reacción de los hosts es imperdible.',
        youtube_video_id: 'J0cDL45HywM',
        youtube_shorts_url: 'https://youtube.com/shorts/J0cDL45HywM',
        thumbnail_url: 'https://i.ytimg.com/vi/J0cDL45HywM/maxresdefault.jpg',
        duration: 60, // Short típico
        view_count: 8500,
        like_count: 420,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-07-08'),
        tags: JSON.stringify(['llamada', 'en-vivo', 'cer', 'rancho', 'reaccion']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '¡CON LA BEBE NO CAUTERUCCIO! 😶',
        description: 'Momento divertido con La Bebe en el programa. Una frase que se volvió viral entre los CerRanos.',
        youtube_video_id: 'TwEgtV8uGpE',
        youtube_shorts_url: 'https://youtube.com/shorts/TwEgtV8uGpE',
        thumbnail_url: 'https://i.ytimg.com/vi/TwEgtV8uGpE/maxresdefault.jpg',
        duration: 45,
        view_count: 12400,
        like_count: 580,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-07-07'),
        tags: JSON.stringify(['bebe', 'cauteruccio', 'viral', 'divertido', 'frase']),
        category: 'funny',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: '¡PERCY PLS EN CER! 💅🏻',
        description: 'Percy PLS hace su aparición en Cuidando el Rancho con su estilo único y personalidad inconfundible.',
        youtube_video_id: 'JeWQkhx2Ff8',
        youtube_shorts_url: 'https://youtube.com/shorts/JeWQkhx2Ff8',
        thumbnail_url: 'https://i.ytimg.com/vi/JeWQkhx2Ff8/maxresdefault.jpg',
        duration: 55,
        view_count: 6800,
        like_count: 320,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-07-06'),
        tags: JSON.stringify(['percy-pls', 'invitado', 'personalidad', 'estilo', 'cer']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Mejores Momentos del SOMOS CONEROS Y CER.ranos',
        description: 'Los mejores momentos del episodio especial con Los Coneros. Risas garantizadas en formato corto.',
        youtube_video_id: 'STs99b6L8_4',
        youtube_shorts_url: 'https://youtube.com/shorts/STs99b6L8_4',
        thumbnail_url: 'https://i.ytimg.com/vi/STs99b6L8_4/maxresdefault.jpg',
        duration: 38,
        view_count: 9200,
        like_count: 450,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-07-05'),
        tags: JSON.stringify(['coneros', 'mejores-momentos', 'colaboracion', 'rancho', 'highlights']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Reacciones Épicas: Si Reímos Perdemos',
        description: 'Las reacciones más divertidas del desafío "Si Reímos Perdemos" compiladas en un reel explosivo.',
        youtube_video_id: 'O-T2uch9mF0',
        youtube_shorts_url: 'https://youtube.com/shorts/O-T2uch9mF0',
        thumbnail_url: 'https://i.ytimg.com/vi/O-T2uch9mF0/maxresdefault.jpg',
        duration: 52,
        view_count: 4600,
        like_count: 280,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-07-04'),
        tags: JSON.stringify(['reacciones', 'challenge', 'reir', 'perdemos', 'divertido']),
        category: 'funny',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Behind the Scenes: Preparación del CERtonazo',
        description: 'Una mirada exclusiva detrás de cámaras de cómo se prepara el gran evento CERtonazo.',
        youtube_video_id: '1Ut-DP5-Kzc',
        youtube_shorts_url: 'https://youtube.com/shorts/1Ut-DP5-Kzc',
        thumbnail_url: 'https://i.ytimg.com/vi/1Ut-DP5-Kzc/maxresdefault.jpg',
        duration: 65,
        view_count: 7300,
        like_count: 380,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-07-03'),
        tags: JSON.stringify(['behind-scenes', 'certonazo', 'preparacion', 'evento', 'exclusivo']),
        category: 'behind-scenes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Doctor Oñito y su Búsqueda del +1',
        description: 'Los momentos más divertidos del Doctor Oñito buscando su acompañante perfecto para el Benzadetonazo.',
        youtube_video_id: 'dmspIMcKCqk',
        youtube_shorts_url: 'https://youtube.com/shorts/dmspIMcKCqk',
        thumbnail_url: 'https://i.ytimg.com/vi/dmspIMcKCqk/maxresdefault.jpg',
        duration: 48,
        view_count: 5400,
        like_count: 290,
        is_published: true,
        is_featured: false,
        published_at: new Date('2025-07-02'),
        tags: JSON.stringify(['onito', 'busqueda', 'pareja', 'benzadetonazo', 'divertido']),
        category: 'funny',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Jefrain Contando Chismes de Kick - Lo Mejor',
        description: 'Los mejores momentos de Jefrain revelando todos los chismes de la plataforma Kick.',
        youtube_video_id: 'lyTcaR9LumE',
        youtube_shorts_url: 'https://youtube.com/shorts/lyTcaR9LumE',
        thumbnail_url: 'https://i.ytimg.com/vi/lyTcaR9LumE/maxresdefault.jpg',
        duration: 42,
        view_count: 8900,
        like_count: 410,
        is_published: true,
        is_featured: true,
        published_at: new Date('2025-07-01'),
        tags: JSON.stringify(['jefrain', 'chismes', 'kick', 'revelaciones', 'streaming']),
        category: 'highlights',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reels', null, {});
  }
};
