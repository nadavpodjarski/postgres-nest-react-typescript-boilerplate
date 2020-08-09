CREATE TABLE Todolist
(
    TodoID int NOT NULL,
    Todo varchar(255),
    Completed boolean,
    PRIMARY KEY(TodoID)
);

INSERT INTO Todolist
VALUES
    (1, 'add pgadmin4 image' , 'false')
;
