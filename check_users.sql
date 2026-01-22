
-- Voir tous les users
SELECT id, username, email, role FROM users;

-- Supprimer le compte "AmirPrinceDev" de test
DELETE FROM users WHERE username = 'AmirPrinceDev';