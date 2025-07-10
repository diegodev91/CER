const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de la base de datos para Azure
const sequelize = new Sequelize(
  'cerdb',
  'ceradmin',
  'CER2025Secure!',
  {
    host: 'cer-sql-server-2025.database.windows.net',
    dialect: 'mssql',
    port: 1433,
    logging: console.log,
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: false,
        enableArithAbort: true
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function updateCerranosReferences() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conectado a la base de datos exitosamente');

    // Actualizar episodios - descripciones
    console.log('🔄 Actualizando episodios...');
    const [episodesDesc] = await sequelize.query(`
      UPDATE episodes 
      SET description = REPLACE(description, 'CerRanos', 'CERranos')
      WHERE description LIKE '%CerRanos%'
    `);
    console.log(`✅ Actualizadas ${episodesDesc} descripciones de episodios`);

    // Actualizar episodios - tags ceranos a cerranos
    const [episodesTags] = await sequelize.query(`
      UPDATE episodes 
      SET tags = REPLACE(tags, '"ceranos"', '"cerranos"')
      WHERE tags LIKE '%ceranos%'
    `);
    console.log(`✅ Actualizados ${episodesTags} tags de episodios`);

    // Actualizar reels - descripciones
    console.log('🔄 Actualizando reels...');
    const [reelsDesc] = await sequelize.query(`
      UPDATE reels 
      SET description = REPLACE(description, 'CerRanos', 'CERranos')
      WHERE description LIKE '%CerRanos%'
    `);
    console.log(`✅ Actualizadas ${reelsDesc} descripciones de reels`);

    // Actualizar reels - títulos
    const [reelsTitle] = await sequelize.query(`
      UPDATE reels 
      SET title = REPLACE(title, 'CerRanos', 'CERranos')
      WHERE title LIKE '%CerRanos%'
    `);
    console.log(`✅ Actualizados ${reelsTitle} títulos de reels`);

    // Verificar los cambios
    console.log('🔍 Verificando cambios...');
    const [episodeCheck] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM episodes 
      WHERE description LIKE '%CERranos%' OR tags LIKE '%cerranos%'
    `);
    console.log(`📊 Episodios con CERranos: ${episodeCheck[0].count}`);

    const [reelCheck] = await sequelize.query(`
      SELECT COUNT(*) as count 
      FROM reels 
      WHERE description LIKE '%CERranos%' OR title LIKE '%CERranos%'
    `);
    console.log(`📊 Reels con CERranos: ${reelCheck[0].count}`);

    console.log('🎉 ¡Actualización completada exitosamente!');

  } catch (error) {
    console.error('❌ Error al actualizar referencias:', error);
  } finally {
    await sequelize.close();
  }
}

// Ejecutar la actualización
updateCerranosReferences();
