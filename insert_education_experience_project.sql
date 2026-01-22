-- SUPPRIMER LES DONNÉES EXISTANTES
DELETE FROM education;
DELETE FROM experience;
DELETE FROM projects;

-- RÉINSÉRER LES DONNÉES DE TEST
-- EDUCATION
INSERT INTO education (id, school, degree, field, start_date, end_date, description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Jedha AI School', 'Certificate', 'Data Science & Engineering', '2021-09-01', '2021-12-15', 'Research focused on machine learning and data analysis.'),
('550e8400-e29b-41d4-a716-446655440002', 'IAE Paris Sorbonne Business School', 'Master', 'Management and Business Administration', '2017-09-01', '2019-06-30', 'Specialized in project management and business development.'),
('550e8400-e29b-41d4-a716-446655440003', 'Université Nice Sophia Antipolis', 'Bachelor', 'Communication and Media Studies', '2011-09-01', '2016-06-30', 'Focused on digital media and communication strategies.');

-- EXPERIENCE
INSERT INTO experience (id, company, position, start_date, end_date, description, tech_stack) VALUES
('550e8400-e29b-41d4-a716-446655440004', 'BPCE Solutions Informatiques', 'Fullstack Developer', '2024-09-24', NULL, 'Working on developing and maintaining web applications for banking solutions.', 'Angular,TypeScript,Java,RxJS,Spring Boot,Jenkins,Bitbucket'),
('550e8400-e29b-41d4-a716-446655440005', 'M2I Formation', 'Full Stack Java Angular Developer (Internship)', '2024-05-01', '2024-08-31', 'Developed a full-stack web application for managing training courses and student enrollments.', 'Angular,Node.js,MongoDB,Express'),
('550e8400-e29b-41d4-a716-446655440006', 'Quantmetry', 'Machine Learning Engineer', '2023-02-01', '2023-05-31', 'Developed machine learning models for predictive analytics in various business domains.', 'HTML5,CSS3,JavaScript,jQuery,python,scikit-learn,pandas,NumPy');

-- PROJECTS
INSERT INTO projects (id, title, description, tech_stack, featured, github_link, live_url, image_url) VALUES
('550e8400-e29b-41d4-a716-446655440007', 'E-Commerce Platform', 'A full-featured e-commerce application with product catalog, shopping cart, and payment integration.', 'Angular,Node.js,MongoDB,Stripe API', true, 'https://github.com/user/ecommerce-platform', 'https://ecommerce-demo.com', 'https://via.placeholder.com/400x300?text=E-Commerce'),
('550e8400-e29b-41d4-a716-446655440008', 'Portfolio Website', 'A modern personal portfolio website showcasing projects and skills with smooth animations.', 'Angular,Tailwind CSS,TypeScript', true, 'https://github.com/user/portfolio', 'https://myportfolio.com', 'https://via.placeholder.com/400x300?text=Portfolio'),
('550e8400-e29b-41d4-a716-446655440009', 'Task Management App', 'A collaborative task management tool with real-time updates and team features.', 'Angular,Firebase,Material Design', false, 'https://github.com/user/task-manager', 'https://taskmanager-app.com', 'https://via.placeholder.com/400x300?text=Task+Manager');

-- VÉRIFICATION
SELECT 'Education' as table_name, COUNT(*) as row_count FROM education
UNION ALL
SELECT 'Experience', COUNT(*) FROM experience
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects;