-- Migration number: 0002 	 2025-05-24T08:05:59.242Z
CREATE TABLE news (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  title       TEXT    NOT NULL,
  subtitle    TEXT    NULL,
  content     TEXT    NULL,
  author      TEXT    NULL
);
