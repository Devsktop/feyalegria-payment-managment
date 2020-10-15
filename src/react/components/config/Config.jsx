import React from 'react';

// Components
import ConfigBox from './ConfigBox';

const Config = () => {
  return (
    <div className="config content-screen">
      <ConfigBox ilustration={} title="Grados y Secciones" link="/grades" />
      <ConfigBox ilustration={} title="Inscripciones" link="/join" />
      <ConfigBox ilustration={} title="Mensualidades" link="/monthlyPayments" />
      <ConfigBox ilustration={} title="Productos" link="/products" />
      <ConfigBox
        ilustration={}
        title="Restauración y Respaldo"
        link="/backup"
      />
    </div>
  );
};

export default Config;
