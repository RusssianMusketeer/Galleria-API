CREATE TABLE Paintings (
  paintingId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId int DEFAULT NULL  REFERENCES Users(id),
  paintings json DEFAULT NULL
);