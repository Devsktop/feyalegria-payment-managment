import React from 'react';

// Components
import ConfigBox from './ConfigBox';

// Import imgs
import GradesIlustration from './GradesIlustration.svg';
import JoinIlustration from './JoinIlustration.svg';
import MonthlyPaymentsIlustration from './MonthlyPaymentsIlustration.svg';
import ProductsIlustration from './ProductsIlustration.svg';
import BackupIlustration from './BackupIlustration.svg';

const Config = () => {
  return (
    <div className="config content-screen">
      <ConfigBox
        ilustration={GradesIlustration}
        title="Grados y Secciones"
        link="/grades"
      />
      <ConfigBox
        ilustration={JoinIlustration}
        title="Inscripciones"
        link="/join"
      />
      <ConfigBox
        ilustration={MonthlyPaymentsIlustration}
        title="Mensualidades"
        link="/monthly"
      />
      <ConfigBox
        ilustration={ProductsIlustration}
        title="Productos"
        link="/products"
      />
      <ConfigBox
        ilustration={BackupIlustration}
        title="Restauración y Respaldo"
        link="/backup"
      />
    </div>
  );
};

export default Config;
