const t1 = `
CREATE TABLE dolarprice (
  iddolarPrice int(11) NOT NULL,
  date date NOT NULL,
  price double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t2 = `
CREATE TABLE globals (
  idglobals int(11) NOT NULL,
  actualMonth int(11) NOT NULL,
  stundetsIn varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t3 = `
CREATE TABLE grades (
  idgrades int(11) NOT NULL,
  scholarYear varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t4 = `
CREATE TABLE idtype (
  ididType int(11) NOT NULL,
  character varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t5 = `
CREATE TABLE inscriptionsbalance (
  idinscriptionsBalance int(11) NOT NULL,
  transfer double DEFAULT NULL,
  cash double DEFAULT NULL,
  dolars double DEFAULT NULL,
  date date NOT NULL,
  dolarPrice double NOT NULL,
  total double NOT NULL,
  idRegister int(11) NOT NULL,
  idRepresentative int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t6 = `
CREATE TABLE log (
  idlog int(11) NOT NULL,
  date datetime(6) NOT NULL,
  operation varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t7 = `
CREATE TABLE monthlypaymentsbalance (
  idmonthlyPaymentsBalance int(11) NOT NULL,
  transfer double DEFAULT NULL,
  cash double DEFAULT NULL,
  dolars double DEFAULT NULL,
  date date NOT NULL,
  dolarPrice double NOT NULL,
  total double NOT NULL,
  idRegister int(11) NOT NULL,
  idRepresentative int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t8 = `
CREATE TABLE paymentsconcepts (
  idpaymentsConcepts int(11) NOT NULL,
  name varchar(45) NOT NULL,
  price double NOT NULL,
  idRates int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t9 = `
CREATE TABLE paymentsconceptsbalance (
  idpaymentsConceptsBalance int(11) NOT NULL,
  transfer double DEFAULT NULL,
  cash double DEFAULT NULL,
  dolars double DEFAULT NULL,
  date date NOT NULL,
  dolarPrice double NOT NULL,
  total double NOT NULL,
  idRegister int(11) NOT NULL,
  idRepresentative int(11) NOT NULL,
  idPaymentsConcepts int(11) NOT NULL,
  idRates int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t10 = `
CREATE TABLE products (
  idproducts int(11) NOT NULL,
  product varchar(45) NOT NULL,
  price double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t11 = `
CREATE TABLE productsbalance (
  idproductBalance int(11) NOT NULL,
  transfer double DEFAULT NULL,
  cash double DEFAULT NULL,
  dolars double DEFAULT NULL,
  date date NOT NULL,
  dolarPrice double NOT NULL,
  total double NOT NULL,
  idRegister int(11) NOT NULL,
  idRepresentative int(11) NOT NULL,
  idProducts int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t12 = `
CREATE TABLE rates (
  idrates int(11) NOT NULL,
  price double NOT NULL,
  type varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t13 = `
CREATE TABLE registers (
  idregister int(11) NOT NULL,
  date date NOT NULL,
  bank varchar(45) NOT NULL,
  reference varchar(45) NOT NULL,
  transfers double DEFAULT NULL,
  cash double DEFAULT NULL,
  dolars double DEFAULT NULL,
  observation varchar(150) DEFAULT NULL,
  idRepresentative int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t14 = `
CREATE TABLE representatives (
  idrepresentative int(11) NOT NULL,
  names varchar(45) NOT NULL,
  lastnames varchar(45) NOT NULL,
  dni varchar(45) NOT NULL,
  balance float NOT NULL,
  phone varchar(45) NOT NULL,
  email varchar(45) NOT NULL,
  monthsToPay int(11) NOT NULL,
  inscription tinyint(4) NOT NULL,
  idType int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t15 = `
CREATE TABLE sections (
  idsections int(11) NOT NULL,
  section varchar(45) NOT NULL,
  capacity int(11) NOT NULL,
  idGrades int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t16 = `
CREATE TABLE students (
  idStudents int(11) NOT NULL,
  names varchar(45) NOT NULL,
  lastnames varchar(45) NOT NULL,
  dni varchar(45) NOT NULL,
  birthDate date NOT NULL,
  relationship varchar(45) NOT NULL,
  state varchar(45) NOT NULL,
  blood varchar(45) DEFAULT NULL,
  weight double DEFAULT NULL,
  size double DEFAULT NULL,
  email varchar(45) DEFAULT NULL,
  phone varchar(45) DEFAULT NULL,
  socialMedia varchar(45) DEFAULT NULL,
  balance double NOT NULL,
  inscription tinyint(4) NOT NULL,
  monthsToPay int(11) NOT NULL,
  idRepresentative int(11) NOT NULL,
  idType int(11) NOT NULL,
  idSection int(11) NOT NULL,
  idGrades int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const t17 = `
CREATE TABLE users (
  idusers int(11) NOT NULL,
  username varchar(45) NOT NULL,
  password varchar(45) NOT NULL,
  question varchar(45) NOT NULL,
  answer varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
`;

const insert = `INSERT INTO usuario (Username,Password,Admin,Pregunta_Seg,Respuesta_Seg) VALUES ('admin','admin','SUPER_ADMIN','Universidad donde estudio','urbe')`;

module.exports = [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12, t13, t14, t15, t16, t17, insert];
