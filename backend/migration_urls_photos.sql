-- À exécuter UNE fois dans phpMyAdmin (base immosmart) :
-- les anciennes photos pointaient vers Apache (port 80), elles passent au service visiteur (8081).
UPDATE photo
SET url = REPLACE(REPLACE(url, 'http://localhost/immosmart/backend/uploads/', 'http://localhost:8081/uploads/'),
                   'http://localhost/immosmart/uploads/', 'http://localhost:8081/uploads/');
