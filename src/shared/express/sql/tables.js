const t1 = `
CREATE TABLE IF NOT EXISTS producto (
  Id_Producto int(11) NOT NULL AUTO_INCREMENT,
  Descripcion_P varchar(45) NOT NULL,
  Precio_P decimal(10,2) NOT NULL,
  Stock int(11) NOT NULL,
  Categoria varchar(45) NOT NULL,
  Precio_Compra decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (Id_Producto),
  UNIQUE KEY Descripcion_P (Descripcion_P)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`;

const t2 = `
CREATE TABLE IF NOT EXISTS registro_dia (
  Id_Registro int(11) NOT NULL AUTO_INCREMENT,
  Precio_Dolar decimal(10,2) NOT NULL,
  Total_Ganancia decimal(10,2) NOT NULL,
  Total_Bs decimal(10,2) NOT NULL,
  Fecha date NOT NULL,
  PRIMARY KEY (Id_Registro),
  UNIQUE KEY Fecha (Fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`;

const t3 = `
CREATE TABLE IF NOT EXISTS resumen_venta (
  Id_ResumenVenta int(11) NOT NULL AUTO_INCREMENT,
  Total_Venta decimal(10,2) NOT NULL,
  Total_Bs decimal(10,2) NOT NULL,
  Metodo_Pago varchar(45) DEFAULT NULL,
  Observacion varchar(45) DEFAULT NULL,
  Fecha date NOT NULL,
  Total_Neto decimal(10,2) NOT NULL,
  PRIMARY KEY (Id_ResumenVenta)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`;

const t4 = `
CREATE TABLE IF NOT EXISTS usuario (
  Id_Usuario int(11) NOT NULL AUTO_INCREMENT,
  Username varchar(40) NOT NULL,
  Password varchar(15) NOT NULL,
  Admin varchar(45) NOT NULL,
  Pregunta_Seg varchar(45) NOT NULL,
  Respuesta_Seg varchar(45) NOT NULL,
  PRIMARY KEY (Id_Usuario),
  UNIQUE KEY Username (Username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`;

const t5 = `
    CREATE TABLE IF NOT EXISTS venta (
  Id_Venta int(11) NOT NULL AUTO_INCREMENT,
  Total decimal(10,2) NOT NULL,
  V_Producto int(11) DEFAULT NULL,
  Cantidad int(11) DEFAULT NULL,
  V_Detalle int(11) NOT NULL,
  PRIMARY KEY (Id_Venta),
  KEY fk_Venta_Producto1 (V_Producto)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
`;

const insert = `INSERT INTO usuario (Username,Password,Admin,Pregunta_Seg,Respuesta_Seg) VALUES ('admin','admin','SUPER_ADMIN','Universidad donde estudio','urbe')`;

module.exports = [t1, t2, t3, t4, t5, insert];
