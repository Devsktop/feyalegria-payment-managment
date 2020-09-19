// POST - api/login - (user: String, password: String)
interface res_login {
  idusers: string;
  username: string;
} //READY

// GET - api/students - call to initial props
interface students {
  // 10 solvent and 10 insolvent
  [student]: {
    idStudent: {
      name: string;
      dni: string;
      birthdate: Date;
      representative: string;
      balance: number;
      solvent: boolean;
      idStudent: number;
    };
  };
  // Total currently joined
  total: number;
  solventTotal: number;
  insolventTotoal: number;
}

// GET - api/students/[section]
interface students {
  [students: number]: {
    idStudent: {
      name: string;
      dni: string;
      birthdate: Date;
      representative: string;
      balance: number;
      solvent: boolean;
      idStudent: number;
    };
  };
}

// GET - api/payments - call to initial props
interface payments {
  today: {
    transference: number;
    cash: number;
    dolar: number;
    total: number;
  };
  month: {
    transference: number;
    cash: number;
    // Regular Arr
    [dolar: number]: {
      range: string;
      amount: number;
      exchange: number;
      convertion: number;
      total: number;
    };
    total: number;
    receivable: number;
  };

  advancement: {
    [monthsInAdvance: number]: {
      month: number;
      transference: number;
      cash: number;
      // Regular Arr
      [dolar: number]: {
        range: string;
        amount: number;
        exchange: number;
        convertion: number;
        total: number;
      };
      total: number;
    };
  };
  arrears: {
    [monthsInArrear: number]: {
      month: number;
      transference: number;
      cash: number;
      // Regular Arr
      [dolar: number]: {
        range: string;
        amount: number;
        exchange: number;
        convertion: number;
        total: number;
      };
      total: number;
    };
  };
}

// POST - api/advancement/[month] - (month: number)
interface advancement {
  [monthsInAdvance: number]: {
    month: number;
    transference: number;
    cash: number;
    // Regular Arr
    [dolar: number]: {
      range: string;
      amount: number;
      exchange: number;
      convertion: number;
      total: number;
    };
    total: number;
  };
}
// POST - api/arrear/[month] - (month: number)
interface arrears {
  [monthsInArrear: number]: {
    month: number;
    transference: number;
    cash: number;
    // Regular Arr
    [dolar: number]: {
      range: string;
      amount: number;
      exchange: number;
      convertion: number;
      total: number;
    };
    total: number;
  };
}

// GET - api/sections - call to initial props
interface sections {
  [idSection: number]: {
    Grade: string;
    Section: string;
    representativeCant: number;
    studentsCant: number;
    id: number;
    idSection: number;
  };
}

// GET - api/representatives/[section] - ?pag=number
interface representatives {
  [representatives: number]: {
    idRepresentative: {
      name: string;
      dni: string;
      phone: string;
      mail: string;
      balance: number;
      idRepresentative: number;
    };
  };
}

// GET - api/representative/[idRepresentative]
interface representative {
  idRepresentative: number;
  name: string;
  dni: string;
  phone: string;
  mail: string;
  balance: number;
  paidMonths: number;
  [students: number]: {
    name: string;
    dni: string;
    relationship: string;
    grade: string;
  };
}

// GET - api/grades
interface grades {
  [grades: number]: {
    idGrade: {
      grade: string;
      sections: number;
      students: number;
      representative: number;
    };
  };
}

// GET api/grade/[id]
interface grade {
  grade: string;
  [sections: number]: {
    idSection: {
      section: string;
      capacity: number;
      idSection: number;
    };
  };
}

// GET api/join
interface join {
  price: number;
  [paymentConcepts: number]: {
    idConcept: {
      concept: string;
      price: number;
      idConcept: number;
    };
  };
}

//GET api/monthlyPayment
interface monthlyPayment {
  price: number;
  [paymentConcepts: number]: {
    idConcept: {
      concept: string;
      price: number;
      idConcept: number;
    };
  };
}

// GET api/products
interface products {
  [products: number]: {
    productId: {
      product: string;
      price: number;
      mandatory: boolean;
    };
  };
}

// GET api/yearRegisters
interface yearRegisters {
  paymentMethods: {
    transference: number;
    cash: number;
    dolar: number;
  };
  [concepts: number]: {
    concept: string;
    amount: number;
    details: {
      transference: number;
      cash: number;
      dolar: number;
      total: number;
    };
  };
  estimatedFund: number;
  paidFund: number;
  finalFund: number;
}

// GET api/monthRegisters/[month]
interface monthRegisters {
  paymentMethods: {
    transference: number;
    cash: number;
    [dolar: number]: {
      range: string;
      amount: number;
      exchange: number;
      convertion: number;
      total: number;
    };
  };

  [concepts: number]: {
    concept: string;
    amount: number;
    details: {
      transference: number;
      cash: number;
      [dolar: number]: {
        range: string;
        amount: number;
        exchange: number;
        convertion: number;
        total: number;
      };
      total: number;
    };
  };

  advancement: {
    [months: number]: {
      month: number;
      transference: number;
      cash: number;
      [dolar: number]: {
        range: string;
        amount: number;
        exchange: number;
        convertion: number;
        total: number;
      };
    };
  };

  arrear: {
    [months: number]: {
      month: number;
      transference: number;
      cash: number;
      [dolar: number]: {
        range: string;
        amount: number;
        exchange: number;
        convertion: number;
        total: number;
      };
    };
  };

  estimatedFund: number;
  paidFund: number;
  finalFund: number;
}

// GET api/register/month ?pag=number
interface registers {
  [registers: number]: {
    idRegister: {
      date: Date;
      method: string;
      amount: number;
      referencce: string;
      representative: string;
      detail: string;
    };
  };
}
