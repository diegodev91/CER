-- Script para actualizar todas las referencias de CerRanos/ceranos a CERranos
-- Ejecutar en la base de datos de producción

-- Actualizar episodios
UPDATE episodes 
SET description = REPLACE(description, 'CerRanos', 'CERranos')
WHERE description LIKE '%CerRanos%';

UPDATE episodes 
SET description = REPLACE(description, 'ceranos', 'cerranos')
WHERE description LIKE '%ceranos%';

UPDATE episodes 
SET tags = REPLACE(tags, '"ceranos"', '"cerranos"')
WHERE tags LIKE '%ceranos%';

-- Actualizar reels
UPDATE reels 
SET description = REPLACE(description, 'CerRanos', 'CERranos')
WHERE description LIKE '%CerRanos%';

UPDATE reels 
SET title = REPLACE(title, 'CerRanos', 'CERranos')
WHERE title LIKE '%CerRanos%';

UPDATE reels 
SET tags = REPLACE(tags, '"ceranos"', '"cerranos"')
WHERE tags LIKE '%ceranos%';

-- Actualizar noticias (si existen)
UPDATE news 
SET content = REPLACE(content, 'CerRanos', 'CERranos')
WHERE content LIKE '%CerRanos%';

UPDATE news 
SET title = REPLACE(title, 'CerRanos', 'CERranos')
WHERE title LIKE '%CerRanos%';

UPDATE news 
SET content = REPLACE(content, 'ceranos', 'cerranos')
WHERE content LIKE '%ceranos%';

-- Actualizar productos (si existen)
UPDATE products 
SET description = REPLACE(description, 'CerRanos', 'CERranos')
WHERE description LIKE '%CerRanos%';

UPDATE products 
SET name = REPLACE(name, 'CerRanos', 'CERranos')
WHERE name LIKE '%CerRanos%';

-- Actualizar comentarios (si existen)
UPDATE comments 
SET content = REPLACE(content, 'CerRanos', 'CERranos')
WHERE content LIKE '%CerRanos%';

UPDATE comments 
SET author = REPLACE(author, 'CerRanos', 'CERranos')
WHERE author LIKE '%CerRanos%';

-- Verificar los cambios
SELECT 'Episodes with CERranos:' as table_info, COUNT(*) as count 
FROM episodes 
WHERE description LIKE '%CERranos%' OR tags LIKE '%cerranos%';

SELECT 'Reels with CERranos:' as table_info, COUNT(*) as count 
FROM reels 
WHERE description LIKE '%CERranos%' OR title LIKE '%CERranos%';
