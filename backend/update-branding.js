#!/usr/bin/env node

/**
 * Script para actualizar la marca de "ceranos" a "cerranos" en la base de datos
 * Actualiza los datos existentes para mantener consistencia con la nueva marca CERranos
 */

const { Sequelize } = require('sequelize');

// Configuración de la base de datos usando la configuración de producción
const config = {
  username: "ceradmin",
  password: "CER2025SecurePass!",
  database: "cerdb",
  host: "cer-sql-server-2025.database.windows.net",
  port: 1433,
  dialect: "mssql",
  logging: console.log,
  dialectOptions: {
    options: {
      encrypt: true,
      enableArithAbort: true
    }
  }
};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: config.logging,
  dialectOptions: config.dialectOptions
});

async function updateBranding() {
  try {
    console.log('🔄 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conectado exitosamente a la base de datos');

    console.log('\n🔄 Actualizando datos en tabla Episodes...');
    
    // Actualizar títulos y descripciones en Episodes
    const episodeUpdates = await sequelize.query(`
      UPDATE Episodes 
      SET 
        title = REPLACE(REPLACE(title, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
        description = REPLACE(REPLACE(description, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
        tags = REPLACE(REPLACE(CAST(tags as NVARCHAR(MAX)), 'ceranos', 'cerranos'), 'Ceranos', 'CERranos')
      WHERE 
        title LIKE '%ceranos%' OR 
        description LIKE '%ceranos%' OR 
        CAST(tags as NVARCHAR(MAX)) LIKE '%ceranos%'
    `);
    
    console.log(`✅ Episodes actualizados: ${episodeUpdates[1].rowCount} registros`);

    console.log('\n🔄 Actualizando datos en tabla Reels...');
    
    // Actualizar títulos y descripciones en Reels
    const reelUpdates = await sequelize.query(`
      UPDATE Reels 
      SET 
        title = REPLACE(REPLACE(title, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
        description = REPLACE(REPLACE(description, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
        tags = REPLACE(REPLACE(CAST(tags as NVARCHAR(MAX)), 'ceranos', 'cerranos'), 'Ceranos', 'CERranos')
      WHERE 
        title LIKE '%ceranos%' OR 
        description LIKE '%ceranos%' OR 
        CAST(tags as NVARCHAR(MAX)) LIKE '%ceranos%'
    `);
    
    console.log(`✅ Reels actualizados: ${reelUpdates[1]} registros`);

    console.log('\n🔄 Verificando resultados...');
    
    // Verificar que no queden referencias antiguas
    const remainingOldRefs = await sequelize.query(`
      SELECT 
        'Episodes' as tabla, COUNT(*) as count
      FROM Episodes 
      WHERE title LIKE '%ceranos%' OR description LIKE '%ceranos%' OR CAST(tags as NVARCHAR(MAX)) LIKE '%ceranos%'
      UNION ALL
      SELECT 
        'Reels' as tabla, COUNT(*) as count
      FROM Reels 
      WHERE title LIKE '%ceranos%' OR description LIKE '%ceranos%' OR CAST(tags as NVARCHAR(MAX)) LIKE '%ceranos%'
    `);
    
    console.log('\n📊 Referencias restantes:');
    remainingOldRefs[0].forEach(row => {
      console.log(`   ${row.tabla}: ${row.count} registros`);
    });

    console.log('\n🎉 ¡Actualización de branding completada exitosamente!');
    console.log('✅ Toda la marca ahora está consistente como "CERranos"');

  } catch (error) {
    console.error('❌ Error durante la actualización:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('\n🔒 Conexión a la base de datos cerrada');
  }
}

// Ejecutar el script
if (require.main === module) {
  updateBranding();
}

module.exports = { updateBranding };
