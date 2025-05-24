-- Migration number: 0001 	 2025-05-24T07:49:32.508Z
CREATE TABLE news (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  title       TEXT    NOT NULL,
  subtitle    TEXT    NULL,
  content     TEXT    NULL,
  author      TEXT    NULL
);
