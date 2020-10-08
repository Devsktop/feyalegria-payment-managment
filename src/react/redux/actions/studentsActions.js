export const FETCH_STUDENTS = 'FETCH_STUDENTS';

const mulaData = {
  students: {
    0: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 6,
      solvent: true,
      idStudent: 0
    },
    1: {
      name: 'Jhostten Guerrero',
      dni: '26565958',
      birthdate: new Date(2006, 9, 26),
      representative: 'Yanuri Puche',
      balance: -4,
      solvent: false,
      idStudent: 1
    },
    2: {
      name: 'Alejandro Gonzalez',
      dni: '25412563',
      birthdate: new Date(2000, 10, 5),
      representative: 'Lina Duarte',
      balance: 0,
      solvent: true,
      idStudent: 2
    },
    3: {
      name: 'Yulymar Rubio',
      dni: '26410252',
      birthdate: new Date(1998, 9, 16),
      representative: 'Ronald Rubio',
      balance: -150,
      solvent: false,
      idStudent: 3
    },
    4: {
      name: 'Andres Bohorquez',
      dni: '23145698',
      birthdate: new Date(1990, 9, 6),
      representative: 'Luis Bohorquez',
      balance: 0,
      solvent: true,
      idStudent: 4
    },
    5: {
      name: 'Shirel Urdaneta',
      dni: '36541235',
      birthdate: new Date(2009, 12, 18),
      representative: 'Yamila Andrade',
      balance: -100,
      solvent: false,
      idStudent: 5
    },
    6: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 500,
      solvent: true,
      idStudent: 6
    },
    7: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 500,
      solvent: true,
      idStudent: 7
    },
    8: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 500,
      solvent: true,
      idStudent: 8
    },
    9: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 500,
      solvent: true,
      idStudent: 9
    },
    10: {
      name: 'Jhoseph Guerrero',
      dni: '26773668',
      birthdate: new Date(1999, 8, 1),
      representative: 'Yanuri Puche',
      balance: 500,
      solvent: true,
      idStudent: 10
    }
  },
  joinedStudents: 500,
  insolventStudents: 300,
  solventStudents: 200
};

export const fetchStudents = async () => {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      console.log(
        'Dahsboard initial fetch, change this on producitons for original fetch to db'
      );

      resolve({
        type: FETCH_STUDENTS,
        payload: mulaData
      });
    }, 3000);
  });
  return data;
};
