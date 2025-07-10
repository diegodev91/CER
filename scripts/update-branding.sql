-- Script SQL para actualizar la marca de "ceranos" a "cerranos" en la base de datos
-- Actualiza los datos existentes para mantener consistencia con la nueva marca CERranos

-- Actualizar títulos y descripciones en Episodes
UPDATE "Episodes" 
SET 
  title = REPLACE(REPLACE(title, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  description = REPLACE(REPLACE(description, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  tags = REPLACE(REPLACE(tags::text, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos')::jsonb
WHERE 
  title ILIKE '%ceranos%' OR 
  description ILIKE '%ceranos%' OR 
  tags::text ILIKE '%ceranos%';

-- Actualizar títulos y descripciones en Reels
UPDATE "Reels" 
SET 
  title = REPLACE(REPLACE(title, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  description = REPLACE(REPLACE(description, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  tags = REPLACE(REPLACE(tags::text, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos')::jsonb
WHERE 
  title ILIKE '%ceranos%' OR 
  description ILIKE '%ceranos%' OR 
  tags::text ILIKE '%ceranos%';

-- Actualizar títulos y contenido en News
UPDATE "News" 
SET 
  title = REPLACE(REPLACE(title, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  content = REPLACE(REPLACE(content, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos'),
  summary = REPLACE(REPLACE(summary, 'ceranos', 'cerranos'), 'Ceranos', 'CERranos')
WHERE 
  title ILIKE '%ceranos%' OR 
  content ILIKE '%ceranos%' OR 
  summary ILIKE '%ceranos%';

-- Verificar que no queden referencias antiguas
SELECT 
  'Episodes' as tabla, COUNT(*) as count_remaining
FROM "Episodes" 
WHERE title ILIKE '%ceranos%' OR description ILIKE '%ceranos%' OR tags::text ILIKE '%ceranos%'
UNION ALL
SELECT 
  'Reels' as tabla, COUNT(*) as count_remaining
FROM "Reels" 
WHERE title ILIKE '%ceranos%' OR description ILIKE '%ceranos%' OR tags::text ILIKE '%ceranos%'
UNION ALL
SELECT 
  'News' as tabla, COUNT(*) as count_remaining
FROM "News" 
WHERE title ILIKE '%ceranos%' OR content ILIKE '%ceranos%' OR summary ILIKE '%ceranos%';
