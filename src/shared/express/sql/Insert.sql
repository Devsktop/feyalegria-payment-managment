// users
INSERT INTO users (username, password, question, answer) VALUES ('admin', '1234', 'hola', 'chao');

// grades

INSERT INTO grades (scholarYear) VALUES ('1er Grado'), ('2do Grado'), ('3er Grado'), ('4to Grado'), ('5to Grado');

// sections

INSERT INTO sections (section, capacity, idGrade) VALUES ('A', '30', '1'), ('B', '30', '1'), ('A', '30', '2'), ('B', '30', '2'), ('A', '30', '3'), ('B', '30', '3'), ('A', '30', '4'), ('B', '30', '4'), ('A', '30', '5'), ('B', '30', '5');

// dniType

INSERT INTO dnitype (letter) VALUES ('V'), ('E'), ('R');

// representatives

INSERT INTO representatives(names, lastnames, dni, balance, phone, email, paidMonths, inscription, idDniType) 
VALUES 
    ('Meiro Sario','Gonzalez Gil','7785390',0,'04246438964','meirocr@hotmail.com',0,false,1),
    ('Lina Rosa','Duarte Caballero','9709555',0,'04141689544','linarosaduarte@hotmail.com',0,false,1)

// students

INSERT INTO students(names, lastnames, dni, bornDate, relationship, state, blood, weight, size, email, phone, socialMedia, balance, inscription, paidMonths, idRepresentative, idDniType, idSection, idGrade) VALUES 
('Alejandro José','González Duarte','27849217','2000-10-05','child','regular','A+','45','1.60','alejandrogonzalezduarte@hotmail.com','04246438964','@alejandrogonzalezdu',0,true,0,1,1,1,5), 
('Jhoseph Jefferson','Guerrero Puche','27456321','1998-08-01','child','regular','A+','45','1.60','jhosephgph@gmail.com','04146613245','@jhoseph',-1,true,0,2,1,2,5), 
('Jhostteen Jeremy','Guerrero Puche','27456322','2005-09-26','child','regular','A+','45','1.60','jhosephgph@gmail.com','04146613245','@jhostten',-2,true,0,2,1,2,5), 
('Jose Manuel','Jimenez Lopez','27556322','2005-10-05','child','regular','A+','45','1.60','josejimenez@gmail.com','04146613555','@jose',5,true,0,2,1,2,5),
('Enmanuel Jose','Baldonedo Lopez','27556122','2010-10-05','child','regular','A+','45','1.60','enmanuel@gmail.com','04146613555','@enmanuel',-4,true,0,2,1,2,5),
('Juan Jose','Baldonedo Lopez','27555522','2010-10-05','child','regular','A+','45','1.60','enmanuel@gmail.com','04146613555','@juan',-6,true,0,2,1,2,5),
('Andres Rafael','Perez Lopez','24455522','1999-10-05','child','regular','A+','45','1.60','andres@gmail.com','04146613555','@andres',10,true,0,2,1,2,5),
('Shirel Andrea','Perez Lopez','23355522','2012-10-05','child','regular','A+','45','1.60','andres@gmail.com','04146613555','@shi',-2,true,0,2,1,2,5),
('Rebeca Andrea','Perez Lopez','27522522','1999-11-11','child','regular','A+','45','1.60','rebeca@gmail.com','04146613555','@rebe',10,true,0,2,1,2,5),
('Ariyuri Ariari','Perez Lopez','27115522','1999-11-11','child','regular','A+','45','1.60','rebeca@gmail.com','04146613555','@rebe',4,true,0,2,1,2,5);

// Registers

INSERT INTO registers (date, bank, reference, transfers, cash, dolars, dolarPrice, observation, idRepresentative) VALUES 
    ('2020-09-29', 'Banesco', '123456789', '120000', '100000', '10', '440000', NULL, '2'),
    ('2020-09-29', 'Provincial', '123456788', '150000', '200000', '12', '440000', NULL, '1'),
    ('2020-09-29', 'Mercantil', '123452788', '150000', '200000', '12', '450000', NULL, '1'),
    ('2020-09-28', 'Venezuela', '333452788', '100000', '130000', '10', '410000', NULL, '1'),
    ('2020-09-30', 'Citybank', '333222788', '200000', '140000', '10', '440000', NULL, '1');

// Monthly Paymentsbalance
INSERT INTO monthlypaymentsbalance (transfer, cash, dolars, date, total, idRegister, idRepresentative) VALUES ('150000', '200000', '5', '2020-09-30', '6', '1', '2');

// Advancements
INSERT INTO advancements (transfer, cash, dolars, payedMonth, idRegister, idRepresentative) VALUES ('150000', '200000', '10', '1', '3', '2');

