-- E2E test seed data
-- Run once against the database before executing E2E tests.
-- Requires bcrypt hashes generated with Spring's BCryptPasswordEncoder.
--
-- Regular test user  → test@test.com  / Test123!
-- Admin test user    → admin@test.com / Admin123!
--
-- To generate hashes with Spring Boot CLI:
--   spring encodepassword Test123!
-- Or from the Spring context (e.g. a one-off @Bean):
--   new BCryptPasswordEncoder().encode("Test123!")

INSERT INTO users (first_name, last_name, email, password, role, enabled)
VALUES (
  'Test', 'User', 'test@test.com',
  '$2a$10$7EqJtq98hPqEX7fNZaFWoOdL3bBEjBnYxkDIy1C4VqvEZ5cYA0iri',
  'CUSTOMER', true
)
ON DUPLICATE KEY UPDATE id = id;

INSERT INTO users (first_name, last_name, email, password, role, enabled)
VALUES (
  'Test', 'Admin', 'admin@test.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'ADMIN', true
)
ON DUPLICATE KEY UPDATE id = id;
