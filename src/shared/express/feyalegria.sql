CREATE SCHEMA feyalegria DEFAULT CHARACTER SET utf8 ;
USE feyalegria ;


CREATE TABLE dniType (
  iddniType INT NOT NULL AUTO_INCREMENT,
  letter VARCHAR(45) NOT NULL,
  PRIMARY KEY (iddniType),
  UNIQUE INDEX iddniType_UNIQUE (iddniType),
  UNIQUE INDEX letter_UNIQUE (letter));


CREATE TABLE representatives (
  idrepresentative INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(45) NOT NULL,
  lastnames VARCHAR(45) NOT NULL,
  id VARCHAR(45) NOT NULL,
  balance FLOAT NOT NULL,
  phone VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  monthsToPay INT NOT NULL,
  inscription TINYINT NOT NULL,
  dniType INT NOT NULL,
  PRIMARY KEY (idrepresentative),
  UNIQUE INDEX idrepresentative_UNIQUE (idrepresentative),
  UNIQUE INDEX id_UNIQUE (id),
  INDEX fk_representatives_dniType1_idx (dniType),
  CONSTRAINT fk_representatives_dniType1
    FOREIGN KEY (dniType)
    REFERENCES dniType (iddniType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE grades (
  idgrades INT NOT NULL AUTO_INCREMENT,
  scholarYear VARCHAR(45) NOT NULL,
  PRIMARY KEY (idgrades),
  UNIQUE INDEX idgrades_UNIQUE (idgrades),
  UNIQUE INDEX scholarYear_UNIQUE (scholarYear));


CREATE TABLE sections (
  idsections INT NOT NULL AUTO_INCREMENT,
  section VARCHAR(45) NOT NULL,
  capacity INT NOT NULL,
  idGrades INT NOT NULL,
  PRIMARY KEY (idsections),
  INDEX fk_sections_grades1_idx (idGrades),
  UNIQUE INDEX idsections_UNIQUE (idsections),
  CONSTRAINT fk_sections_grades1
    FOREIGN KEY (idGrades)
    REFERENCES grades (idgrades)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE students (
  idStudents INT NOT NULL AUTO_INCREMENT,
  names VARCHAR(45) NOT NULL,
  lastnames VARCHAR(45) NOT NULL,
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
  balance DOUBLE NOT NULL,
  inscription TINYINT NOT NULL,
  monthsToPay INT NOT NULL,
  idRepresentative INT NOT NULL,
  dniType INT NOT NULL,
  idSection INT NOT NULL,
  idGrades INT NOT NULL,
  PRIMARY KEY (idStudents),
  UNIQUE INDEX idStudents_UNIQUE (idStudents),
  UNIQUE INDEX dni_UNIQUE (dni),
  INDEX fk_students_representatives_idx (idRepresentative),
  INDEX fk_students_dniType1_idx (dniType),
  INDEX fk_students_sections1_idx (idSection),
  INDEX fk_students_grades1_idx (idGrades),
  CONSTRAINT fk_students_representatives
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idrepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_dniType1
    FOREIGN KEY (dniType)
    REFERENCES dniType (iddniType)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_sections1
    FOREIGN KEY (idSection)
    REFERENCES sections (idsections)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_students_grades1
    FOREIGN KEY (idGrades)
    REFERENCES sections (idGrades)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE products (
  idproducts INT NOT NULL AUTO_INCREMENT,
  product VARCHAR(45) NOT NULL,
  price DOUBLE NOT NULL,
  mandatory BOOLEAN NOT NULL,
  PRIMARY KEY (idproducts),
  UNIQUE INDEX idproducts_UNIQUE (idproducts));


CREATE TABLE rates (
  idrates INT NOT NULL AUTO_INCREMENT,
  price DOUBLE NOT NULL,
  type VARCHAR(45) NOT NULL,
  PRIMARY KEY (idrates),
  UNIQUE INDEX idrates_UNIQUE (idrates));


CREATE TABLE paymentsConcepts (
  idpaymentsConcepts INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  price DOUBLE NOT NULL,
  idRates INT NOT NULL,
  PRIMARY KEY (idpaymentsConcepts),
  UNIQUE INDEX idpaymentsConcepts_UNIQUE (idpaymentsConcepts),
  INDEX fk_paymentsConcepts_rates1_idx (idRates),
  CONSTRAINT fk_paymentsConcepts_rates1
    FOREIGN KEY (idRates)
    REFERENCES rates (idrates)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE registers (
  idregister INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  bank VARCHAR(45) NOT NULL,
  reference VARCHAR(45) NOT NULL,
  transfers DOUBLE NULL,
  cash DOUBLE NULL,
  dolars DOUBLE NULL,
  observation VARCHAR(150) NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idregister),
  UNIQUE INDEX idregister_UNIQUE (idregister),
  INDEX fk_registers_representatives1_idx (idRepresentative),
  CONSTRAINT fk_registers_representatives1
    FOREIGN KEY (idRepresentative)
    REFERENCES representatives (idrepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE dolarPrice (
  iddolarPrice INT NOT NULL AUTO_INCREMENT,
  date DATE NOT NULL,
  price DOUBLE NOT NULL,
  PRIMARY KEY (iddolarPrice),
  UNIQUE INDEX iddolarPrice_UNIQUE (iddolarPrice));


CREATE TABLE globals (
  idglobals INT NOT NULL AUTO_INCREMENT,
  actualMonth INT NOT NULL,
  stundetsIn VARCHAR(45) NOT NULL,
  PRIMARY KEY (idglobals),
  UNIQUE INDEX idglobals_UNIQUE (idglobals));


CREATE TABLE log (
  idlog INT NOT NULL AUTO_INCREMENT,
  date DATETIME(6) NOT NULL,
  operation VARCHAR(45) NOT NULL,
  PRIMARY KEY (idlog),
  UNIQUE INDEX idlog_UNIQUE (idlog));


CREATE TABLE users (
  idusers INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  question VARCHAR(45) NOT NULL,
  answer VARCHAR(45) NOT NULL,
  PRIMARY KEY (idusers),
  UNIQUE INDEX idusers_UNIQUE (idusers),
  UNIQUE INDEX username_UNIQUE (username));


CREATE TABLE inscriptionsBalance (
  idinscriptionsBalance INT NOT NULL AUTO_INCREMENT,
  transfer DOUBLE NULL,
  cash DOUBLE NULL,
  dolars DOUBLE NULL,
  date DATE NOT NULL,
  dolarPrice DOUBLE NOT NULL,
  total DOUBLE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idinscriptionsBalance),
  UNIQUE INDEX idinscriptions_UNIQUE (idinscriptionsBalance),
  INDEX fk_inscriptionsBalance_registers1_idx (idRegister),
  INDEX fk_inscriptionsBalance_represantive1_idx (idRepresentative),
  CONSTRAINT fk_inscriptionsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idregister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_inscriptionsBalance_represantive1
    FOREIGN KEY (idRepresentative)
    REFERENCES registers (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE monthlyPaymentsBalance (
  idmonthlyPaymentsBalance INT NOT NULL AUTO_INCREMENT,
  transfer DOUBLE NULL,
  cash DOUBLE NULL,
  dolars DOUBLE NULL,
  date DATE NOT NULL,
  dolarPrice DOUBLE NOT NULL,
  total DOUBLE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  PRIMARY KEY (idmonthlyPaymentsBalance),
  UNIQUE INDEX idinscriptions_UNIQUE (idmonthlyPaymentsBalance),
  INDEX fk_monthlyPaymentsBalance_registers1_idx (idRegister),
  INDEX fk_monthlyPaymentsBalance_represantives1_idx (idRepresentative),
  CONSTRAINT fk_monthlyPaymentsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idregister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_monthlyPaymentsBalance_represantives1
    FOREIGN KEY (idRepresentative)
    REFERENCES registers (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE paymentsConceptsBalance (
  idpaymentsConceptsBalance INT NOT NULL AUTO_INCREMENT,
  transfer DOUBLE NULL,
  cash DOUBLE NULL,
  dolars DOUBLE NULL,
  date DATE NOT NULL,
  dolarPrice DOUBLE NOT NULL,
  total DOUBLE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  idPaymentsConcepts INT NOT NULL,
  idRates INT NOT NULL,
  PRIMARY KEY (idpaymentsConceptsBalance),
  UNIQUE INDEX idinscriptions_UNIQUE (idpaymentsConceptsBalance),
  INDEX fk_paymentsConceptsBalance_registers1_idx (idRegister),
  INDEX fk_paymentsConceptsBalance_representatives1_idx (idRepresentative),
  INDEX fk_paymentsConceptsBalance_paymentsConcepts1_idx (idPaymentsConcepts),
  INDEX fk_paymentsConceptsBalance_rates1_idx (idRates),
  CONSTRAINT fk_paymentsConceptsBalance_registers1
    FOREIGN KEY (idRegister)
    REFERENCES registers (idregister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_representatives1
    FOREIGN KEY (idRepresentative)
    REFERENCES registers (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_paymentsConcepts1
    FOREIGN KEY (idPaymentsConcepts)
    REFERENCES paymentsConcepts (idpaymentsConcepts)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_rates1
    FOREIGN KEY (idRates)
    REFERENCES paymentsConcepts (idRates)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE productsBalance (
  idproductBalance INT NOT NULL AUTO_INCREMENT,
  transfer DOUBLE NULL,
  cash DOUBLE NULL,
  dolars DOUBLE NULL,
  date DATE NOT NULL,
  dolarPrice DOUBLE NOT NULL,
  total DOUBLE NOT NULL,
  idRegister INT NOT NULL,
  idRepresentative INT NOT NULL,
  idProducts INT NOT NULL,
  PRIMARY KEY (idproductBalance),
  UNIQUE INDEX idinscriptions_UNIQUE (idproductBalance),
  INDEX fk_paymentsConceptsBalance_registers1_idx (idRegister),
  INDEX fk_paymentsConceptsBalance_representatives1_idx (idRepresentative),
  INDEX fk_productsBalance_products1_idx (idProducts),
  CONSTRAINT fk_paymentsConceptsBalance_registers10
    FOREIGN KEY (idRegister)
    REFERENCES registers (idregister)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_paymentsConceptsBalance_representatives10
    FOREIGN KEY (idRepresentative)
    REFERENCES registers (idRepresentative)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_productsBalance_products1
    FOREIGN KEY (idProducts)
    REFERENCES products (idproducts)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
