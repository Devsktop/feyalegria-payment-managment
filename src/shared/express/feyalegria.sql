CREATE SCHEMA feyalegria DEFAULT CHARACTER SET utf8 ;
USE feyalegria ;


CREATE TABLE dniType (
  idDniType INT NOT NULL AUTO_INCREMENT,
  letter VARCHAR(1) NOT NULL,
  PRIMARY KEY (idDniType),
  UNIQUE INDEX idDniType_UNIQUE (idDniType),
  UNIQUE INDEX letter_UNIQUE (letter));


CREATE TABLE representatives (
  idRepresentative INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(45) NOT NULL,
  lastNames VARCHAR(45) NOT NULL,
  dni VARCHAR(45) NOT NULL,
  balance DECIMAL(8,2) NOT NULL,
  phone VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  paidMonths INT NOT NULL,
  inscription BOOLEAN NOT NULL,
  idDniType INT NOT NULL,
  PRIMARY KEY (idRepresentative),
  UNIQUE INDEX idRepresentative_UNIQUE (idRepresentative),
  UNIQUE INDEX dni_UNIQUE (dni),
  INDEX fk_representatives_dniType1_idx (idDniType),
  CONSTRAINT fk_representatives_dniType1
    FOREIGN KEY (idDniType)
    REFERENCES dniType (idDniType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE grades (
  idGrade INT NOT NULL AUTO_INCREMENT,
  scholarYear VARCHAR(45) NOT NULL,
  PRIMARY KEY (idGrade),
  UNIQUE INDEX idGrade_UNIQUE (idGrade),
  UNIQUE INDEX scholarYear_UNIQUE (scholarYear));


CREATE TABLE sections (
  idSection INT NOT NULL AUTO_INCREMENT,
  section VARCHAR(45) NOT NULL,
  capacity INT NOT NULL,
  idGrade INT NOT NULL,
  PRIMARY KEY (idSection),
  INDEX fk_sections_grades1_idx (idGrade),
  UNIQUE INDEX idSection_UNIQUE (idSection),
  CONSTRAINT fk_sections_grades1
    FOREIGN KEY (idGrade)
    REFERENCES grades (idGrade)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE students (
  idStudent INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(45) NOT NULL,
  lastNames VARCHAR(45) NOT NULL,
  dni VARCHAR(45) NOT NULL,
  birthDate DATE NOT NULL,
  relationship VARCHAR(45) NOT NULL,
  state VARCHAR(45) NOT NULL,
  blood VARCHAR(45) NULL,
  weight DOUBLE NULL,
  size DOUBLE NULL,
  email VARCHAR(45) NULL,
  phone VARCHAR(45) NULL,
  socialMedia VARCHAR(45) NULL,
  balance DECIMAL(8,2) NOT NULL,
  inscription BOOLEAN NOT NULL,
  paidMonths INT NOT NULL,
  idRepresentative INT NOT NULL,
  idDniType INT NOT NULL,
  idSection INT NOT NULL,
  idGrade INT NOT NULL,
  PRIMARY KEY (idStudent),
  UNIQUE INDEX idStudent_UNIQUE (idStudent),
  UNIQUE INDEX dni_UNIQUE (dni),
  INDEX fk_students_representatives_idx (idRepresentative),
  INDEX fk_students_dniType1_idx (idDniType),
  INDEX fk_students_sections1_idx (idSection),
  INDEX fk_students_grades1_idx (idGrade),
  CONSTRAINT fk_students_representatives
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_dniType1
    FOREIGN KEY (idDniType)
    REFERENCES dniType (idDniType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_sections1
    FOREIGN KEY (idSection)
    REFERENCES sections (idSection)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_grades1
    FOREIGN KEY (idGrade)
    REFERENCES grades (idGrade)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE products (
  idProduct INT NOT NULL AUTO_INCREMENT,
  productName VARCHAR(45) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  mandatory BOOLEAN NOT NULL,
  PRIMARY KEY (idProduct),
  UNIQUE INDEX idProduct_UNIQUE (idProduct));


CREATE TABLE rates (
  idRate INT NOT NULL AUTO_INCREMENT,
  price DECIMAL(8,2) NOT NULL,
  type VARCHAR(20) NOT NULL,
  PRIMARY KEY (idRate),
  UNIQUE INDEX idRate_UNIQUE (idRate));


CREATE TABLE paymentsConcepts (
  idPaymentsConcept INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  idRate INT NOT NULL,
  PRIMARY KEY (idPaymentsConcept),
  UNIQUE INDEX idPaymentsConcept_UNIQUE (idPaymentsConcept),
  INDEX fk_paymentsConcepts_rates1_idx (idRate),
  CONSTRAINT fk_paymentsConcepts_rates1
    FOREIGN KEY (idRate)
    REFERENCES rates (idRate)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE registers (
  idRegister INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  bank VARCHAR(45) NOT NULL,
  reference VARCHAR(45) NOT NULL,
  transfers DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  dolarPrice DECIMAL(8,2) NOT NULL,
  observation VARCHAR(150) NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idRegister),
  UNIQUE INDEX idRegister_UNIQUE (idRegister),
  UNIQUE INDEX reference_UNIQUE (reference),
  INDEX fk_registers_representatives1_idx (idRepresentative),
  CONSTRAINT fk_registers_representatives1
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE globals (
  idGlobal INT NOT NULL AUTO_INCREMENT,
  actualMonth INT NOT NULL,
  stundetsIn VARCHAR(45) NOT NULL,
  PRIMARY KEY (idGlobal),
  UNIQUE INDEX idGlobal_UNIQUE (idGlobal));


CREATE TABLE log (
  idLog INT NOT NULL AUTO_INCREMENT,
  date DATETIME(6) NOT NULL,
  operation VARCHAR(45) NOT NULL,
  PRIMARY KEY (idLog),
  UNIQUE INDEX idLog_UNIQUE (idLog));


CREATE TABLE users (
  idUser INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  question VARCHAR(100) NOT NULL,
  answer VARCHAR(45) NOT NULL,
  PRIMARY KEY (idUser),
  UNIQUE INDEX idUser_UNIQUE (idUser),
  UNIQUE INDEX username_UNIQUE (username));


CREATE TABLE inscriptionsBalance (
  idInscriptionsBalance INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idInscriptionsBalance),
  UNIQUE INDEX idinscriptions_UNIQUE (idInscriptionsBalance),
  INDEX fk_inscriptionsBalance_registers1_idx (idRegister),
  INDEX fk_inscriptionsBalance_represantive1_idx (idRepresentative),
  CONSTRAINT fk_inscriptionsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_inscriptionsBalance_represantive1
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE monthlyPaymentsBalance (
  idMonthlyPaymentsBalance INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idMonthlyPaymentsBalance),
  UNIQUE INDEX idMonthlyPaymentsBalance_UNIQUE (idMonthlyPaymentsBalance),
  INDEX fk_monthlyPaymentsBalance_registers1_idx (idRegister),
  INDEX fk_monthlyPaymentsBalance_represantives1_idx (idRepresentative),
  CONSTRAINT fk_monthlyPaymentsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_monthlyPaymentsBalance_represantives1
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE paymentsConceptsBalance (
  idPaymentsConceptBalance INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  idPaymentsConcept INT NOT NULL,
  idRate INT NOT NULL,
  PRIMARY KEY (idPaymentsConceptBalance),
  UNIQUE INDEX idPaymentsConceptBalance_UNIQUE (idPaymentsConceptBalance),
  INDEX fk_paymentsConceptsBalance_registers1_idx (idRegister),
  INDEX fk_paymentsConceptsBalance_representatives1_idx (idRepresentative),
  INDEX fk_paymentsConceptsBalance_paymentsConcepts1_idx (idPaymentsConcept),
  INDEX fk_paymentsConceptsBalance_rates1_idx (idRate),
  CONSTRAINT fk_paymentsConceptsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_representatives1
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_paymentsConcepts1
    FOREIGN KEY (idPaymentsConcept)
    REFERENCES paymentsConcepts (idPaymentsConcept)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_rates1
    FOREIGN KEY (idRate)
    REFERENCES rates (idRate)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE productsBalance (
  idProductBalance INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  dolarPrice DECIMAL(8,2) NOT NULL,
  date DATE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  idProduct INT NOT NULL,
  PRIMARY KEY (idProductBalance),
  UNIQUE INDEX idProductBalance_UNIQUE (idProductBalance),
  INDEX fk_paymentsConceptsBalance_registers1_idx (idRegister),
  INDEX fk_paymentsConceptsBalance_representatives1_idx (idRepresentative),
  INDEX fk_productsBalance_products1_idx (idProduct),
  CONSTRAINT fk_paymentsConceptsBalance_registers10
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_representatives10
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_productsBalance_products1
    FOREIGN KEY (idProduct)
    REFERENCES products (idProduct)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    
CREATE TABLE advancements (
  idAdvancement INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  payedMonth INT NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idAdvancement),
  UNIQUE INDEX idAdvancement_UNIQUE (idAdvancement),
  INDEX fk_advancements_registers1_idx (idRegister),
  INDEX fk_advancements_representatives1_idx (idRepresentative),
  CONSTRAINT fk_advancements_registers10
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_advancements_representatives10
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE arrears (
  idArrear INT NOT NULL AUTO_INCREMENT,
  transfer DECIMAL(20,2) NOT NULL,
  cash DECIMAL(20,2) NOT NULL,
  dolars DECIMAL(8,2) NOT NULL,
  payedMonth INT NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idArrear),
  UNIQUE INDEX idArrear_UNIQUE (idArrear),
  INDEX fk_arrears_registers1_idx (idRegister),
  INDEX fk_arrears_representatives1_idx (idRepresentative),
  CONSTRAINT fk_arrears_registers10
    FOREIGN KEY (idRegister)
    REFERENCES registers (idRegister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_arrears_representatives10
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);