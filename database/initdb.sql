CREATE TABLE Todolist
(
    id serial,
    todo varchar(255),
    completed boolean DEFAULT 'false',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id,created_at)
);

INSERT INTO Todolist
    (todo,completed)
VALUES
    ('To Initialize PERN-Stack DB', 'true'),
    ('To add deploy to AWS', 'false')
;


