CREATE TABLE Todolist
(
    TodoID int NOT NULL,
    Todo varchar(255),
    Completed boolean,
    PRIMARY KEY(TodoID)
);

INSERT INTO Todolist
VALUES
    (1, 'add docker-compose aws deploy' , 'false')
;
