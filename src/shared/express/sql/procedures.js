const p1 = `

CREATE PROCEDURE ActDolar (IN Dolar DECIMAL(10,2))
BEGIN

DECLARE day date ;

SELECT Fecha INTO day
FROM registro_dia 
WHERE Fecha= CURDATE(); 

IF (day is null) THEN

INSERT INTO registro_dia
(Precio_Dolar,Total_Ganancia,Total_Bs,Fecha)    
 VALUES ( Dolar, 0, 0, CURDATE() ); 

END if;

UPDATE registro_dia SET Precio_Dolar = (Dolar) WHERE Fecha = CURDATE();

END 

`;

//----------------------------------------------------------

const p2 = `

CREATE PROCEDURE ActPassword (IN id INT(11), IN pass VARCHAR(45))  
BEGIN
UPDATE usuario  SET Password = pass  where Id_Usuario = id;
END 
`;

// ------------------------------------------------------------

const p3 = `

CREATE PROCEDURE ActProducto (IN PProducto INT, IN des VARCHAR(45), IN pre DECIMAL(10,2), IN cant INT, IN cat VARCHAR(45), IN pre_com DECIMAL(10,2))  
BEGIN

UPDATE producto  SET Descripcion_P = des, Precio_P = pre , Stock = cant, Categoria = cat , Precio_Compra = pre_com  where Id_Producto= PProducto;

END
`;

// -------------------------------------------------------------

const p4 = `

CREATE PROCEDURE ActUsuario (IN PProducto INT(11), IN des VARCHAR(45), IN cant VARCHAR(45))  
BEGIN

UPDATE usuario  SET Username = des,  Admin = cant  where Id_Usuario= PProducto;

END
`;

// -----------------------------------------------------------

const p5 = `

CREATE PROCEDURE Agregar_Venta(IN PProducto INT, IN PCantidad INT, IN PDetalle INT) 
BEGIN

DECLARE Aux2 DECIMAL(10,2);
DECLARE Aux5 DECIMAL(10,2);
declare Aux6 DECIMAL (10,2);

SELECT Precio_P INTO Aux2 FROM producto WHERE   Id_Producto = PProducto;
SET Aux2 = (Aux2 * PCantidad);

SELECT Precio_Dolar INTO Aux5 FROM registro_dia WHERE Fecha = CURDATE(); 
set Aux5 = (Aux5 * Aux2);

SELECT Precio_Compra INTO Aux6 FROM producto WHERE  Id_Producto = PProducto;

SET Aux6 = (Aux2 - (Aux6 * PCantidad));


INSERT INTO venta(Total,V_Producto,Cantidad,V_Detalle)     VALUES (Aux2,PProducto,  PCantidad,PDetalle ); 

UPDATE producto SET Stock = (Stock - PCantidad) WHERE Id_Producto = PProducto;



UPDATE registro_dia  SET Total_Ganancia = (Total_Ganancia + Aux2) WHERE Fecha = CURDATE();

UPDATE registro_dia  SET Total_Bs = (Total_Bs + Aux5) WHERE Fecha = CURDATE();

UPDATE resumen_venta  SET Total_Venta = (Total_Venta + Aux2) WHERE Id_ResumenVenta = PDetalle;

UPDATE resumen_venta  SET Total_Bs = (Total_Bs + Aux5) WHERE Id_ResumenVenta = PDetalle;

UPDATE resumen_venta  SET Total_Neto = ( Total_Neto + Aux6) WHERE Id_ResumenVenta = PDetalle;


END
`;

// --------------------------------------------------------

const p6 = `

CREATE PROCEDURE Facturas_Fecha (IN Desde DATE, IN Hasta DATE)
BEGIN
select * from resumen_venta
where Fecha BETWEEN  Desde and Hasta;
END
`;

// -----------------------------------------------------

const p7 = `

CREATE PROCEDURE Filtrar_Fecha (IN Desde DATE, IN Hasta DATE)
BEGIN

select * from registro_dia
where Fecha BETWEEN  Desde and Hasta;

END
`;

const p8 = `

CREATE PROCEDURE Login(IN log VARCHAR(40), IN pass VARCHAR(15)) BEGIN
DECLARE aux varchar(40);
DECLARE aux2 varchar(15);
DECLARE resp varchar(20);

SELECT Username INTO aux from usuario WHERE log = Username;
SELECT Password INTO aux2 from usuario WHERE log = Username;

IF (aux = log and aux2 = pass) THEN
SET resp = "Datos validos"; 
SELECT  Admin, Id_Usuario from usuario where Username = aux;

ELSE
SET resp = "Datos Invalidos"; 
SELECT resp;

end if;

END
`;

const p9 = `

CREATE PROCEDURE Ver_Registro(IN id INT(11)) 
BEGIN
SELECT Id_ResumenVenta, Total_Neto FROM resumen_venta WHERE Id_ResumenVenta = id;

END
`;

const p10 = `

CREATE PROCEDURE Ver_Venta(IN id INT(11)) 
 BEGIN

SELECT  Id_Venta, Id_ResumenVenta,Descripcion_P,Precio_P,Cantidad,Total FROM venta

  INNER JOIN producto ON   V_Producto = Id_Producto 
  INNER JOIN resumen_venta on venta.V_Detalle = resumen_venta.Id_ResumenVenta
  WHERE  id = resumen_venta.Id_ResumenVenta;
END
`;

const p11 = `

CREATE PROCEDURE Verificar_Usuario(IN userN VARCHAR(45)) 
 BEGIN
DECLARE resp VARCHAR(45);
SELECT Username INTO resp FROM usuario WHERE   Username = userN;

IF (resp = userN ) THEN
SELECT Id_Usuario,Pregunta_Seg, Respuesta_Seg FROM usuario WHERE Username = userN;
ELSE
SELECT resp;

end IF;

END
`;

const p12 = `

CREATE PROCEDURE Verificar_Usuario2(IN id INT(11), IN resp VARCHAR(45)) 
BEGIN
DECLARE Aux VARCHAR(45);
SELECT Username INTO Aux FROM usuario WHERE   Respuesta_Seg = resp and Id_Usuario= id;

IF (Aux IS NOT NULL ) THEN
Set Aux = "Respuesta_Valida";
SELECT Aux;

ELSE 
Set  Aux = "Respuesta_Invalida";
SELECT Aux;

end IF;
END
`;

module.exports = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];
