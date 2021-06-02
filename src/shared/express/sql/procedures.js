const p1 = `

CREATE PROCEDURE updStudent (IN idStudent INT ,IN names VARCHAR(45), IN lastnames VARCHAR(45), IN dni VARCHAR(45), IN bornDate DATE, IN relationship VARCHAR(45), IN state VARCHAR(45), IN blood VARCHAR(45), IN weight DOUBLE, IN size DOUBLE, IN email VARCHAR(45), IN phone VARCHAR(45), IN socialMedia VARCHAR(45))

BEGIN

UPDATE students  SET names = names, lastnames = lastnames , dni = dni, bornDate = bornDate , relationship = relationship, state = state, blood = blood , weight = weight, size = size, email = email, phone = phone, socialMedia = socialMedia where idStudents = idStudent;

END
`;

// -------------------------------------------------------------

const p2 = `

CREATE PROCEDURE updRepresantives (IN idrepresentative INT ,IN names VARCHAR(45), IN lastnames VARCHAR(45), IN dni VARCHAR(45), IN balance DOUBLE, IN phone VARCHAR(45), IN email VARCHAR(45))
  
BEGIN

UPDATE represantives SET names = names, lastnames = lastnames , dni = dni, balance = balance , phone = phone, email = email where idrepresentative = idrepresentative;

END
`;

// -------------------------------------------------------------

// -------------------------------------------------------------

const p3 = `

CREATE PROCEDURE updProducts (IN idproducts INT ,IN product VARCHAR(45), IN price DOUBLE)
  
BEGIN

UPDATE products SET product = product, price = price where idproducts = idproducts;

END
`;

// -------------------------------------------------------------

const p4 = `

CREATE PROCEDURE updGrade (IN idGrade INT ,IN scholarYear VARCHAR(45))

BEGIN

UPDATE grades SET scholarYear = scholarYear where idGrade = idGrade;

END
`;

// -------------------------------------------------------------

const p5 = `

CREATE PROCEDURE updPaymentsConcepts (IN idpaymentsConcepts INT ,IN name VARCHAR(45),IN price DOUBLE)
  
BEGIN

UPDATE paymentsconcepts SET name = name, price = price where idpaymentsConcepts = idpaymentsConcepts;

END
`;

// -------------------------------------------------------------

module.exports = [p1, p2, p3, p4, p5];
