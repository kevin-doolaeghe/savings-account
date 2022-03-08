## Frontend

### Angular Web Application

## MariaDB init for 

* Connect to the `mariadb` container :
```
docker exec -it mariadb /bin/sh
```
* Connect to the database instance :
```
mysql -u root -p db
```
* Populate the database with testing data :
```
INSERT INTO transfers (description, date, amount, type, status) VALUES ("savings 1", "2022-01-04", 150, 0, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("savings 2", "2022-02-12", 125, 0, false);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("pleasure 1", "2022-01-08", 100, 1, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("pleasure 2", "2022-02-02", 75, 1, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("clothes 1", "2022-02-02", 60, 2, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("clothes 2", "2022-02-10", -30, 2, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("vehicle 1", "2022-01-22", 25, 3, true);
INSERT INTO transfers (description, date, amount, type, status) VALUES ("vehicle 2", "2022-02-25", 100, 3, false);
SELECT * FROM transfers;
```